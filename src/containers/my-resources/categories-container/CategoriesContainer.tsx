import { useCallback, useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import Loader from '~/components/loader/Loader'
import Button from '~scss-components/button/Button'
import AddCategoriesModal from '~/containers/my-resources/add-categories-modal/AddCategoriesModal'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import {
  ResourceService,
  useUpdateResourceCategoryMutation
} from '~/services/resource-service'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import useMutation from '~/hooks/use-mutation'
import useQuery from '~/hooks/use-query'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import { openAlert } from '~/redux/features/snackbarSlice'
import { useAppDispatch } from '~/hooks/use-redux'
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
import { type Categories, ResourcesTabsEnum } from '~/types'
import { adjustColumns, getScreenBasedLimit } from '~/utils/helper-functions'

import { styles } from '~/containers/my-resources/categories-container/CategoriesContainer.style'

const CategoriesContainer: React.FC = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const { openModal, closeModal } = useModalContext()
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const [updateResourceCategory] = useUpdateResourceCategoryMutation()
  const { handleSuccessAlert, handleErrorAlert } = useSnackbarAlert()
  const dispatch = useAppDispatch()

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getCategories = useCallback(() => {
    return ResourceService.getResourcesCategories({
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      sort,
      name: searchTitle.current
    })
  }, [page, itemsPerPage, sort, searchTitle])

  const { mutate: handleDeleteCategory } = useMutation({
    mutationFn: ResourceService.deleteResourceCategory,
    onError: handleErrorAlert,
    onSuccess: () => {
      handleSuccessAlert(`myResourcesPage.categories.successDeletion`)
    },
    queryKey: ['categories']
  })

  const {
    error,
    data: categories,
    isLoading,
    refetch: refetchCategories
  } = useQuery({
    queryFn: getCategories,
    queryKey: ['categories', page, itemsPerPage, sort, searchTitle]
  })

  useEffect(() => {
    if (error) {
      handleErrorAlert(error)
    }
  }, [handleErrorAlert, error])

  const onResponse = useCallback(
    (response: Categories) => {
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

  const { data: allCategoriesNames = [] } = useQuery({
    queryKey: ['categoriesNames'],
    queryFn: ResourceService.getResourcesCategoriesNames
  })

  const { mutate: handleCreateCategory } = useMutation({
    mutationFn: ResourceService.createResourceCategory,
    onError: handleErrorAlert,
    onSuccess: onResponse,
    queryKey: ['categories']
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
      await refetchCategories()
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
    actions: { onEdit, onDelete: handleDeleteCategory },
    columns: columnsToShow,
    resourceItems: categories ?? defaultResponses.itemsWithCount,
    pagination: { page, onChange: handleChangePage },
    sort: sortOptions,
    itemsPerPage,
    resourceType: ResourcesTabsEnum.Categories,
    sx: styles.table
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={t('myResourcesPage.categories.addBtn')}
        button={
          <Button endIcon={<AddIcon sx={styles.addIcon} />} onClick={onAdd}>
            {t('myResourcesPage.categories.addBtn')}
          </Button>
        }
        fetchData={refetchCategories}
        placeholder={'myResourcesPage.categories.searchInput'}
        searchRef={searchTitle}
      />
      {isLoading || !categories ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Categories> {...props} />
      )}
    </Box>
  )
}

export default CategoriesContainer
