import { useCallback, useState } from 'react'

import { useAppDispatch } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import useSelect from '~/hooks/table/use-select'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'

import AddResourceModal from '~/containers/my-resources/add-resource-modal/AddResourceModal'

import { initialSort } from '~/containers/add-resources/AddResources.constants'
import { defaultResponses, snackbarVariants } from '~/constants'
import { ajustColumns } from '~/utils/helper-functions'
import {
  ErrorResponse,
  GetResourcesParams,
  ItemsWithCount,
  CourseResource,
  TableColumn,
  RemoveColumnRules,
  Question,
  ServiceFunction,
  ResourcesTabsEnum
} from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface AddResourcesProps<T extends CourseResource | Question> {
  resources: T[]
  onAddResources: (resource: T[]) => void
  resourceTab: ResourcesTabsEnum
  requestService: ServiceFunction<ItemsWithCount<T>, GetResourcesParams>
  columns: TableColumn<T>[]
  removeColumnRules: RemoveColumnRules<T>
}

const AddResources = <T extends CourseResource | Question>({
  resources = [],
  onAddResources,
  resourceTab,
  requestService,
  columns,
  removeColumnRules
}: AddResourcesProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>(resources)
  const { closeModal } = useModalContext()
  const dispatch = useAppDispatch()
  const breakpoints = useBreakpoints()
  const initialSelect = resources.map((resource) => resource._id)
  const select = useSelect({ initialSelect })
  const sortOptions = useSort({ initialSort })

  const { sort } = sortOptions
  const { handleSelectClick } = select

  const columnsToShow = ajustColumns<T>(breakpoints, columns, removeColumnRules)

  const getMyResources = useCallback(
    () => requestService({ sort }),
    [sort, requestService]
  )

  const onResponseError = useCallback(
    (error?: ErrorResponse) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    },
    [dispatch]
  )

  const { loading, response } = useAxios<ItemsWithCount<T>>({
    service: getMyResources,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onRowClick = (item: T) => {
    if (selectedRows.find((resource) => resource._id === item._id)) {
      setSelectedRows((selectedRows) =>
        selectedRows.filter((resource) => resource._id !== item._id)
      )
    } else {
      setSelectedRows((selectedRows) => [...selectedRows, item])
    }
    handleSelectClick(item._id)
  }

  const onAddItems = () => {
    onAddResources(selectedRows)
    closeModal()
  }

  const getItems = useCallback(
    (inputValue: string, selectedCategories: string[]) => {
      return response.items.filter((item) => {
        let titleMatch
        if ('title' in item) {
          titleMatch = item.title
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase())
        } else {
          titleMatch = item.fileName
            .toLocaleLowerCase()
            .split('.')
            .slice(0, -1)
            .join('.')
            .includes(inputValue.toLocaleLowerCase())
        }

        const categoryId =
          typeof item.category !== 'string' ? item.category?._id : null

        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(String(categoryId))

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
    resourceTab
  }

  return <AddResourceModal<T> {...props} />
}

export default AddResources
