import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import { ResourceService } from '~/services/resource-service'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import useAxios from '~/hooks/use-axios'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import usePagination from '~/hooks/table/use-pagination'
import { useSnackBarContext } from '~/context/snackbar-context'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  initialSort,
  itemsLoadLimit,
  columns,
  removeColumnRules
} from '~/containers/my-resources/categories-container/CategoriesContainer.constansts'
import {
  Categories,
  ItemsWithCount,
  GetResourcesParams,
  ErrorResponse,
  ResourcesTabsEnum,
  UpdateResourceCategory
} from '~/types'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

import { styles } from '~/containers/my-resources/categories-container/CategoriesContainer.style'

const CategoriesContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const { setAlert } = useSnackBarContext()
  const [selectedItemId, setSelectedItemId] = useState<string>('')

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getCategories = useCallback(
    () =>
      ResourceService.getResourcesCategories({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        name: searchTitle.current
      }),
    [page, itemsPerPage, sort, searchTitle]
  )

  const updateCategory = useCallback(
    (params?: UpdateResourceCategory) =>
      ResourceService.updateResourceCategory(params),
    []
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Categories>,
    GetResourcesParams
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const onCategoryUpdate = useCallback(() => void fetchData(), [fetchData])

  const { fetchData: updateData } = useAxios({
    service: updateCategory,
    defaultResponse: null,
    onResponseError,
    onResponse: onCategoryUpdate,
    fetchOnMount: false
  })

  const onSave = async (name: string) => {
    if (name) await updateData({ id: selectedItemId, name })
    setSelectedItemId('')
  }
  const onEdit = (id: string) => setSelectedItemId(id)
  const onCancel = () => setSelectedItemId('')

  const columnsToShow = ajustColumns<Categories>(
    breakpoints,
    columns(selectedItemId, onSave, onCancel),
    removeColumnRules
  )

  const props = {
    actions: { onEdit },
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: { deleteService: () => null },
    pagination: { page, onChange: handleChangePage },
    sort: sortOptions,
    itemsPerPage,
    resource: ResourcesTabsEnum.Categories,
    sx: styles.table
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={t('myResourcesPage.categories.addBtn')}
        fetchData={fetchData}
        hideCategoriesFilter
        searchRef={searchTitle}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Categories> {...props} />
      )}
    </Box>
  )
}

export default CategoriesContainer
