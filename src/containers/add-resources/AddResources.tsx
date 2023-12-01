import { useCallback, useState } from 'react'

import { useSnackBarContext } from '~/context/snackbar-context'
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
  CourseResources,
  TableColumn,
  RemoveColumnRules,
  Question,
  ServiceFunction
} from '~/types'

interface AddResourcesProps<T extends CourseResources | Question> {
  resources: T[]
  onAddResources: (resource: T[]) => void
  resourceType: string
  requestService: ServiceFunction<ItemsWithCount<T>, GetResourcesParams>
  columns: TableColumn<T>[]
  removeColumnRules: RemoveColumnRules<T>
}

const AddResources = <T extends CourseResources | Question>({
  resources = [],
  onAddResources,
  resourceType,
  requestService,
  columns,
  removeColumnRules
}: AddResourcesProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>(resources)
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
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
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
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
    handleSelectClick(undefined, item._id)
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

        const categoryMatch =
          selectedCategories.length === 0 ||
          selectedCategories.includes(String(item.category?._id || null))

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
    resource: resourceType
  }

  return <AddResourceModal<T> {...props} />
}

export default AddResources
