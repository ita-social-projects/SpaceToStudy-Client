import { HTMLAttributes, SyntheticEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'

import useAxios from '~/hooks/use-axios'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
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
  const { setAlert } = useSnackBarContext()
  const { openModal, closeModal } = useModalContext()
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isFetchedOnFocus, setIsFetchedOnFocus] = useState<boolean>(false)

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const getCategories = useCallback(() => {
    setIsFetched(true)
    setIsFetchedOnFocus(true)
    return ResourceService.getResourcesCategoriesNames()
  }, [setIsFetched])

  const onCreateCategory = () => {
    openModal({
      component: (
        <AddCategoriesModal
          closeModal={closeModal}
          createCategories={handleCreateCategory}
        />
      )
    })
  }

  const createCategory = useCallback(
    (params?: CreateCategoriesParams) =>
      ResourceService.createResourceCategory(params),
    []
  )

  const onResponseCategory = useCallback(
    (response: Categories | null) => {
      const categoryName = response ? response.name : ''

      setAlert({
        severity: snackbarVariants.success,
        message: t('myResourcesPage.categories.successCreation', {
          category: categoryName
        })
      })

      setIsFetched(false)
    },
    [setAlert, t]
  )

  const { fetchData: handleCreateCategory } = useAxios({
    service: createCategory,
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onResponseCategory,
    onResponseError: handleResponseError
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
  return (
    <Box sx={styles.labelCategory}>
      <AsyncAutocomplete<CategoryNameInterface>
        fetchCondition={!isFetched}
        fetchOnFocus={isFetchedOnFocus}
        labelField='name'
        noOptionsText={
          <DropdownButton
            handleOnClick={onCreateCategory}
            icon={<AddIcon />}
            sx={styles.addButtonNoOptions}
            value={t('myResourcesPage.categories.addBtn')}
          />
        }
        onChange={onCategoryChange}
        renderOption={(props, option, state) =>
          optionsList(props, option.name, state.index)
        }
        service={getCategories}
        textFieldProps={{
          label: t('myResourcesPage.categories.categoryDropdown')
        }}
        value={category}
        valueField='_id'
      />
    </Box>
  )
}

export default CategoryDropdown
