import { FC, useCallback, useState } from 'react'

import { quizService } from '~/services/quiz-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useModalContext } from '~/context/modal-context'
import useSelect from '~/hooks/table/use-select'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import AddResourceModal from '~/containers/my-resources/add-resource-modal/AddResourceModal'

import {
  columns,
  initialSort,
  removeColumnRules
} from '~/containers/add-quizzes/AddQuizzes.constants'
import { ajustColumns } from '~/utils/helper-functions'
import { defaultResponses, snackbarVariants } from '~/constants'
import { Quiz, ErrorResponse, ItemsWithCount } from '~/types'

interface AddQuizzesProps {
  quizzes: Quiz[]
  onAddQuizzes: (quiz: Quiz[]) => void
}

const AddQuizzes: FC<AddQuizzesProps> = ({ quizzes = [], onAddQuizzes }) => {
  const [selectedRows, setSelectedRows] = useState<Quiz[]>(quizzes)

  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const breakpoints = useBreakpoints()
  const initialSelect = quizzes.map((quiz) => quiz._id)
  const select = useSelect({ initialSelect })
  const sortOptions = useSort({ initialSort })

  const { sort } = sortOptions
  const { handleSelectClick } = select

  const columnsToShow = ajustColumns<Quiz>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getMyQuizes = useCallback(
    () =>
      quizService.getQuizzes({
        sort
      }),
    [sort]
  )

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const { loading, response } = useAxios<ItemsWithCount<Quiz>>({
    service: getMyQuizes,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onRowClick = (item: Quiz) => {
    if (selectedRows.find((quiz) => quiz._id === item._id)) {
      setSelectedRows((selectedRows) =>
        selectedRows.filter((quiz) => quiz._id !== item._id)
      )
    } else {
      setSelectedRows((selectedRows) => [...selectedRows, item])
    }
    handleSelectClick(undefined, item._id)
  }

  const onAddItems = () => {
    onAddQuizzes(selectedRows)
    closeModal()
  }

  const getItems = useCallback(
    (title: string, selectedCategories: string[]) => {
      return response.items.filter((item) => {
        const titleMatch = item.title
          .toLocaleLowerCase()
          .includes(title.toLocaleLowerCase())
        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(String(item.category?.name))

        return titleMatch && categoryMatch
      })
    },
    [response.items]
  )

  const props = {
    columns: columnsToShow,
    sort: sortOptions,
    select,
    selectedRows,
    isSelection: true,
    onAddItems,
    data: { loading, getItems },
    onRowClick,
    resource: 'quizzes'
  }

  return <AddResourceModal<Quiz> {...props} />
}

export default AddQuizzes
