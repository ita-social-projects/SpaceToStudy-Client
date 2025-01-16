import { HTMLAttributes, SyntheticEvent, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'

import { useModalContext } from '~/context/modal-context'
import { useAppDispatch } from '~/hooks/use-redux'
import { ResourceService } from '~/services/resource-service'
import AddCategoriesModal from '~/containers/my-resources/add-categories-modal/AddCategoriesModal'
import DropdownButton from '~/components/dropdown-add-btn/DropdownButton'

import { snackbarVariants } from '~/constants'
import {
  Categories,
  CategoryNameInterface,
  ComponentEnum,
  CreateCategoriesParams,
  ErrorResponse
} from '~/types'
import { styles } from '~/containers/category-dropdown/CategoryDropdown.styles'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import {
  getOptionLabel,
  isOptionEqualToValue
} from '~/containers/category-dropdown/CategoryDropdown.constants'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'

interface CategoryDropdownInterface {
  category: string | null
  onCategoryChange: (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => void
}

const CategoryDropdown = ({
  category,
  onCategoryChange
}: CategoryDropdownInterface) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { openModal, closeModal } = useModalContext()

  const handleResponseError = useCallback(
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

  const { data: allCategoriesNames, refetch: fetchAllCategoriesNames } =
    useQuery({
      queryKey: ['categoriesNames'],
      queryFn: ResourceService.getResourcesCategoriesName,
      options: {
        initialData: []
      }
    })

  const onCreateCategory = () => {
    openModal({
      component: (
        <AddCategoriesModal
          closeModal={closeModal}
          createCategories={handleCreateCategory}
          existingCategoriesNames={allCategoriesNames.map((item) => item.name)}
        />
      )
    })
  }

  const handleCreateCategoryPromise = async (params?: CreateCategoriesParams) =>
    new Promise<void>((resolve, reject) => {
      handleCreateCategory(params, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error)
      })
    })
  const createCategory = useCallback(
    (params?: CreateCategoriesParams) =>
      ResourceService.createResourceCategory(params),
    []
  )

  const onResponseCategory = useCallback(
    async (response: Categories | null) => {
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

      await fetchAllCategoriesNames()
    },
    [dispatch, fetchAllCategoriesNames]
  )

  const { mutate: handleCreateCategory } = useMutation({
    mutationFn: ResourceService.createResourceCategory,
    onSuccess: async (response) => {
      await onResponseCategory(response)
    },
    onError: (error: ErrorResponse) => {
      handleResponseError(error)
    }
  })
  const optionsList = (
    props: HTMLAttributes<HTMLLIElement>,
    option: string,
    index: number
  ) => (
    <Box key={index}>
      {index === 0 && (
        <Box>
          <DropdownButton
            handleOnClick={onCreateCategory}
            icon={<AddIcon />}
            value={t('myResourcesPage.categories.addBtn')}
          />
          <Divider sx={styles.divider} />
        </Box>
      )}
      <Box component={ComponentEnum.Li} {...(props as [])}>
        {option}
      </Box>
    </Box>
  )

  const valueOption = useMemo(
    () => allCategoriesNames.find((option) => option._id === category) || null,
    [allCategoriesNames, category]
  )

  return (
    <Box sx={styles.labelCategory}>
      <AppAutoComplete<CategoryNameInterface>
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        noOptionsText={
          <DropdownButton
            handleOnClick={onCreateCategory}
            icon={<AddIcon />}
            sx={styles.addButtonNoOptions}
            value={t('myResourcesPage.categories.addBtn')}
          />
        }
        onChange={onCategoryChange}
        options={allCategoriesNames}
        renderOption={(props, option, state) =>
          optionsList(props, option.name, state.index)
        }
        textFieldProps={{
          label: t('myResourcesPage.categories.categoryDropdown')
        }}
        value={valueOption}
      />
    </Box>
  )
}

export default CategoryDropdown
