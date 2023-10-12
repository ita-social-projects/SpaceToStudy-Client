import { FC, useCallback, useState } from 'react'

import { ResourceService } from '~/services/resource-service'
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
} from '~/containers/my-resources/add-questions/AddQuestions.constants'
import { ajustColumns } from '~/utils/helper-functions'
import { defaultResponses, snackbarVariants } from '~/constants'
import { Question, ErrorResponse, ItemsWithCount } from '~/types'
interface AddQuestionsProps {
  questions: Question[]
  onAddQuestions: (questions: Question[]) => void
}

const AddQuestions: FC<AddQuestionsProps> = ({
  questions = [],
  onAddQuestions
}) => {
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const breakpoints = useBreakpoints()
  const initialSelect = questions.map((question) => question._id)
  const select = useSelect({ initialSelect })
  const sortOptions = useSort({ initialSort })
  const [selectedRows, setSelectedRows] = useState<Question[]>(questions)

  const { sort } = sortOptions
  const { handleSelectClick } = select

  const columnsToShow = ajustColumns<Question>(
    breakpoints,
    columns,
    removeColumnRules
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

  const getMyQuestions = useCallback(
    () => ResourceService.getQuestions({ sort }),
    [sort]
  )

  const { loading, response } = useAxios<ItemsWithCount<Question>>({
    service: getMyQuestions,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onRowClick = (item: Question) => {
    if (selectedRows.find((question) => question._id === item._id)) {
      setSelectedRows((selectedRows) =>
        selectedRows.filter((question) => question._id !== item._id)
      )
    } else {
      setSelectedRows((selectedRows) => [...selectedRows, item])
    }
    handleSelectClick(undefined, item._id)
  }

  const onAddItems = () => {
    onAddQuestions(selectedRows)
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
    resource: 'questions'
  }

  return <AddResourceModal<Question> {...props} />
}

export default AddQuestions
