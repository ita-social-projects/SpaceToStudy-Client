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
} from '~/containers/add-lessons/AddLessons.constants'
import { defaultResponses, snackbarVariants } from '~/constants'

import { ajustColumns } from '~/utils/helper-functions'
import { Lesson, ErrorResponse, ItemsWithCount } from '~/types'

interface AddLessonsProps {
  lessons: Lesson[]
  onAddLessons: (lessons: Lesson[]) => void
}

const AddLessons: FC<AddLessonsProps> = ({ lessons = [], onAddLessons }) => {
  const [selectedRows, setSelectedRows] = useState<Lesson[]>(lessons)

  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const breakpoints = useBreakpoints()
  const initialSelect = lessons.map((lesson) => lesson._id)
  const select = useSelect({ initialSelect })
  const sortOptions = useSort({ initialSort })

  const { sort } = sortOptions
  const { handleSelectClick } = select

  const columnsToShow = ajustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getMyLessons = useCallback(
    () =>
      ResourceService.getUsersLessons({
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

  const { loading, response } = useAxios<ItemsWithCount<Lesson>>({
    service: getMyLessons,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onRowClick = (item: Lesson) => {
    if (selectedRows.find((attachment) => attachment._id === item._id)) {
      setSelectedRows((selectedRows) =>
        selectedRows.filter((attachment) => attachment._id !== item._id)
      )
    } else {
      setSelectedRows((selectedRows) => [...selectedRows, item])
    }
    handleSelectClick(undefined, item._id)
  }

  const onAddItems = () => {
    onAddLessons(selectedRows)
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
    resource: 'lessons'
  }

  return <AddResourceModal<Lesson> {...props} />
}

export default AddLessons
