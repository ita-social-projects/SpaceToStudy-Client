import { useCallback, useState } from 'react'

import { useAppDispatch } from '~/hooks/use-redux'
import useSelect from '~/hooks/table/use-select'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'

import { useModalContext } from '~/context/modal-context'
import { openAlert } from '~/redux/features/snackbarSlice'
import { defaultResponses, snackbarVariants } from '~/constants'
import { initialSort } from '~/containers/add-resources/AddResources.constants'
import AddResourceModal from '~/containers/my-resources/add-resource-modal/AddResourceModal'
import { adjustColumns } from '~/utils/helper-functions'
import { getErrorKey } from '~/utils/get-error-key'
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

interface AddResourcesProps<T extends CourseResource | Question> {
  resources?: T[]
  onAddResources: (resource: T[], isDuplicate: boolean) => void
  resourceTab: ResourcesTabsEnum
  columns: TableColumn<T>[]
  removeColumnRules: RemoveColumnRules<T>
  requestService: ServiceFunction<ItemsWithCount<T>, GetResourcesParams>
  showCheckboxWithTooltip?: boolean
}

const AddResources = <T extends CourseResource | Question>({
  resources = [],
  onAddResources,
  resourceTab,
  columns,
  removeColumnRules,
  requestService,
  showCheckboxWithTooltip = false
}: AddResourcesProps<T>) => {
  const dispatch = useAppDispatch()
  const breakpoints = useBreakpoints()
  const { closeModal } = useModalContext()

  const [selectedRows, setSelectedRows] = useState<T[]>(resources)
  const [initialSelectedRows, setInitialSelectedRows] = useState<T[]>(resources)
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)

  const initialSelect = resources.map((resource) => resource._id)
  const { clearSelected, ...select } = useSelect({ initialSelect })
  const sortOptions = useSort({ initialSort })

  const { sort } = sortOptions
  const { handleSelectClick } = select

  const columnsToShow = adjustColumns<T>(
    breakpoints,
    columns,
    removeColumnRules
  )

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

  const onRowClick = useCallback(
    (item: T) => {
      setSelectedRows((selectedRows) =>
        selectedRows.find((resource) => resource._id === item._id)
          ? selectedRows.filter((resource) => resource._id !== item._id)
          : [...selectedRows, item]
      )
      handleSelectClick(item._id)
    },
    [handleSelectClick]
  )

  const onAddItems = useCallback(() => {
    onAddResources(selectedRows, isDuplicate)
    closeModal()
  }, [selectedRows, isDuplicate, onAddResources, closeModal])

  const onCreateResourceCopy = useCallback(
    (value: boolean) => {
      setIsDuplicate(value)
      if (value) {
        setSelectedRows([])
        setInitialSelectedRows([])
        clearSelected()
      } else {
        setSelectedRows(resources)
        setInitialSelectedRows(resources)
        select.setSelected(resources.map((item) => item._id))
      }
    },
    [resources, clearSelected, select]
  )

  const getItems = useCallback(
    (inputValue: string, selectedCategories: string[]) => {
      return response.items.filter((item) => {
        const titleMatch =
          'title' in item
            ? item.title
                .toLocaleLowerCase()
                .includes(inputValue.toLocaleLowerCase())
            : item.fileName
                .toLocaleLowerCase()
                .split('.')
                .slice(0, -1)
                .join('.')
                .includes(inputValue.toLocaleLowerCase())

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
    initialSelectedRows,
    isSelection: true,
    onAddItems,
    onCreateResourceCopy,
    data: { loading, getItems },
    onRowClick,
    resourceTab,
    showCheckboxWithTooltip
  }

  return <AddResourceModal<T> {...props} />
}

export default AddResources
