import { HTMLAttributes, SyntheticEvent, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'

import { useModalContext } from '~/context/modal-context'
import { useAppDispatch } from '~/hooks/use-redux'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import { ResourceService } from '~/services/resource-service'
import AddCategoriesModal from '~/containers/my-resources/add-categories-modal/AddCategoriesModal'
import DropdownButton from '~/components/dropdown-add-btn/DropdownButton'

import { snackbarVariants } from '~/constants'
import {
  type Categories,
  type CategoryNameInterface,
  ComponentEnum
} from '~/types'
import { getErrorKey } from '~/utils/get-error-key'
import { type ResponseError } from '~/exceptions'
import { styles } from '~/containers/category-dropdown/CategoryDropdown.styles'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import {
  getOptionLabel,
  isOptionEqualToValue
} from '~/containers/category-dropdown/CategoryDropdown.constants'
import { openAlert } from '~/redux/features/snackbarSlice'

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
    (error: ResponseError) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    },
    [dispatch]
  )

  const { data: allCategoriesNames = [] } = useQuery({
    queryKey: ['categoriesNames'],
    queryFn: ResourceService.getResourcesCategoriesNames
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

  const onResponseCategory = useCallback(
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

  const { mutate: handleCreateCategory } = useMutation({
    queryKey: ['categoriesNames'],
    mutationFn: ResourceService.createResourceCategory,
    onSuccess: onResponseCategory,
    onError: handleResponseError
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
