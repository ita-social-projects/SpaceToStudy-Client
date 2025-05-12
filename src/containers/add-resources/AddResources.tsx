import { useCallback, useState, useEffect } from 'react'

import { useAppDispatch } from '~/hooks/use-redux'
import useSelect from '~/hooks/table/use-select'
import useSort from '~/hooks/table/use-sort'
import useQuery from '~/hooks/use-query'
import useBreakpoints from '~/hooks/use-breakpoints'

import { useModalContext } from '~/context/modal-context'
import { openAlert } from '~/redux/features/snackbarSlice'
import { defaultResponses, snackbarVariants } from '~/constants'
import { initialSort } from '~/containers/add-resources/AddResources.constants'
import AddResourceModal from '~/containers/my-resources/add-resource-modal/AddResourceModal'
import { adjustColumns } from '~/utils/helper-functions'
import { getErrorKey } from '~/utils/get-error-key'
import {
  GetResourcesParams,
  ItemsWithCount,
  CourseResource,
  TableColumn,
  RemoveColumnRules,
  Question,
  ResourcesTabsEnum,
  ServiceFunctionNew
} from '~/types'

interface AddResourcesProps<T extends CourseResource | Question> {
  resources?: T[]
  onAddResources: (resource: T[], isDuplicate: boolean) => void
  resourceTab: ResourcesTabsEnum
  columns: TableColumn<T>[]
  removeColumnRules: RemoveColumnRules<T>
  requestService: ServiceFunctionNew<ItemsWithCount<T>, GetResourcesParams>
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
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)
  const initialSelect = resources.map((resource) => resource._id)
  const { ...select } = useSelect({ initialSelect })
  const sortOptions = useSort({ initialSort })
  const { sort } = sortOptions
  const { handleSelectClick, clearSelected, setSelected, selected } = select

  const columnsToShow = adjustColumns<T>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getMyResources = useCallback(
    () => requestService({ sort }),
    [sort, requestService]
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ['resources', sort, resourceTab],
    queryFn: getMyResources,
    options: {
      initialData: defaultResponses.itemsWithCount
    }
  })

  useEffect(() => {
    if (error) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    }
  }, [error, dispatch])

  const selectedRows = data.items.filter((item) => selected.includes(item._id))

  const onRowClick = useCallback(
    (item: T) => {
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
        clearSelected()
      } else {
        setSelected(resources.map((item) => item._id))
      }
    },
    [resources, clearSelected, setSelected]
  )

  const getItems = useCallback(
    (inputValue: string, selectedCategories: string[]) => {
      return data.items.filter((item) => {
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
    [data.items]
  )

  const props = {
    columns: columnsToShow,
    sort: sortOptions,
    select,
    selectedRows,
    initialSelectedRows: resources,
    isSelection: true,
    onAddItems,
    onCreateResourceCopy,
    data: { loading: isLoading, getItems },
    onRowClick,
    resourceTab,
    showCheckboxWithTooltip
  }

  return <AddResourceModal<T> {...props} />
}

export default AddResources
