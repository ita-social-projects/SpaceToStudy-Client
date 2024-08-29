import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import AddCategoriesModal from '~/containers/my-resources/add-categories-modal/AddCategoriesModal'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import {
  ResourceService,
  useUpdateResourceCategoryMutation
} from '~/services/resource-service'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import useAxios from '~/hooks/use-axios'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import usePagination from '~/hooks/table/use-pagination'
import { useModalContext } from '~/context/modal-context'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  initialSort,
  itemsLoadLimit,
  columns,
  removeColumnRules,
  validation
} from '~/containers/my-resources/categories-container/CategoriesContainer.constansts'
import {
  Categories,
  ItemsWithCount,
  GetResourcesCategoriesParams,
  ErrorResponse,
  ResourcesTabsEnum,
  CreateCategoriesParams,
  CategoryNameInterface
} from '~/types'
import { adjustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

import { styles } from '~/containers/my-resources/categories-container/CategoriesContainer.style'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const CategoriesContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const { openModal, closeModal } = useModalContext()
  const dispatch = useAppDispatch()
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const [updateResourceCategory] = useUpdateResourceCategoryMutation()

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

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

  const onResponse = useCallback(
    (response: Categories | null) => {
      const categoryName = response ? response.name : ''

      dispatch(
        openAlert({
          severity: snackbarVariants.success,
          message: {
            text: 'myResourcesPage.categories.successCreation',
            options: {
              category: categoryName
            }
          }
        })
      )
    },
    [dispatch]
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

  const createCategory = useCallback(
    (params?: CreateCategoriesParams) =>
      ResourceService.createResourceCategory(params),
    []
  )

  const deleteCategory = useCallback(
    (id?: string) => ResourceService.deleteResourceCategory(id ?? ''),
    []
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Categories>,
    GetResourcesCategoriesParams
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const { response: allCategoriesNames, fetchData: fetchAllCategoriesNames } =
    useAxios<CategoryNameInterface[]>({
      service: ResourceService.getResourcesCategoriesNames,
      defaultResponse: [],
      onResponseError,
      fetchOnMount: true
    })

  const onCategoryUpdate = useCallback(async () => {
    await Promise.all([fetchData(), fetchAllCategoriesNames()])
  }, [fetchData, fetchAllCategoriesNames])

  const onCategoryCreate = useCallback(
    async (response: Categories | null) => {
      onResponse(response)
      await Promise.all([fetchData(), fetchAllCategoriesNames()])
    },
    [fetchData, fetchAllCategoriesNames, onResponse]
  )

  const { fetchData: handleCreateCategory } = useAxios({
    service: createCategory,
    defaultResponse: null,
    fetchOnMount: false,
    onResponseError,
    onResponse: onCategoryCreate
  })

  const existingCategoriesNames = allCategoriesNames?.map((item) => item.name)

  const onAdd = () => {
    openModal({
      component: (
        <AddCategoriesModal
          closeModal={closeModal}
          createCategories={handleCreateCategory}
          existingCategoriesNames={existingCategoriesNames}
        />
      )
    })
  }
  const onSave = async (name: string) => {
    if (name) {
      await updateResourceCategory({ id: selectedItemId, name })
      await onCategoryUpdate()
    }
    setSelectedItemId('')
  }
  const onEdit = (id: string) => setSelectedItemId(id)
  const onCancel = () => setSelectedItemId('')

  const columnsToShow = adjustColumns<Categories>(
    breakpoints,
    columns(
      selectedItemId,
      onSave,
      onCancel,
      validation(existingCategoriesNames)
    ),
    removeColumnRules
  )

  const props = {
    actions: { onEdit },
    columns: columnsToShow,
    data: { response, getData: onCategoryUpdate },
    services: { deleteService: deleteCategory },
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
        button={
          <AppButton onClick={onAdd}>
            {t('myResourcesPage.categories.addBtn')}
            <AddIcon sx={styles.addIcon} />
          </AppButton>
        }
        fetchData={fetchData}
        placeholder={'myResourcesPage.categories.searchInput'}
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
