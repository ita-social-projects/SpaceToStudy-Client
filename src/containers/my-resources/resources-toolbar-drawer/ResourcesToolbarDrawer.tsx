import { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

import { ResourceService } from '~/services/resource-service'
import { useDrawer } from '~/hooks/use-drawer'
import { SortHook } from '~/hooks/table/use-sort'
import useForm from '~/hooks/use-form'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppSelect from '~/components/app-select/AppSelect'
import AppButton from '~/components/app-button/AppButton'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import AppButtonMenu from '~/components/app-button-menu/AppButtonMenu'

import { sortTranslationKeys } from '~/containers/find-course/courses-filter-bar/CorseFilterBar.constants'
import { styles } from '~/containers/my-resources/resources-toolbar-drawer/ResourceToolbarDrawer.styles'
import {
  ButtonVariantEnum,
  CategoryNameInterface,
  ResourceToolbarForm,
  SortEnum
} from '~/types'

interface ResourcesToolBarDrawerProps {
  setCategories: Dispatch<SetStateAction<string[]>>
  setSearch: (text: string) => void
  sortOptions: SortHook
  isMobile: boolean
}

const ResourcesToolBarDrawer: FC<ResourcesToolBarDrawerProps> = ({
  setCategories,
  setSearch,
  sortOptions,
  isMobile
}) => {
  const { t } = useTranslation()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { sort, onRequestSort, resetSort } = sortOptions

  const { data, handleInputChange, handleNonInputValueChange, resetData } =
    useForm<ResourceToolbarForm>({
      initialValues: {
        categories: [],
        name: '',
        sortBy: `${sort.orderBy} ${SortEnum.Desc}`
      }
    })

  const onToggle = () => (isOpen ? closeDrawer() : openDrawer())

  const onCategoryChange = (value: string[]) =>
    handleNonInputValueChange('categories', value)

  const onSortChange = (value: string) =>
    handleNonInputValueChange('sortBy', value)

  const onApplyFilters = () => {
    setCategories(data.categories)
    setSearch(data.name)
    onRequestSort(data.sortBy)
    closeDrawer()
  }

  const onClearFilters = () => {
    resetSort()
    setSearch('')
    setCategories([])
    resetData()
    closeDrawer()
  }

  return (
    <>
      <FiltersToggle handleToggle={onToggle} sx={styles.filterToggle} />
      <AppDrawer
        PaperProps={{ sx: styles.drawer }}
        onClose={closeDrawer}
        open={isOpen}
      >
        <Box sx={styles.drawerContent}>
          <FiltersToggle handleToggle={onToggle} />
          <AppButtonMenu<CategoryNameInterface>
            customSx={styles.filter}
            selectedItems={data.categories}
            service={ResourceService.getResourcesCategoriesNames}
            setSelectedItems={onCategoryChange}
            showNoneProperty
            slotProps={{ paper: styles.filterPaper(isMobile) }}
            title={t('myResourcesPage.categories.category')}
            valueField={'name'}
          />
          <InputWithIcon
            endAdornment={<SearchIcon />}
            onChange={handleInputChange('name')}
            onClear={() => resetData(['name'])}
            placeholder={t('common.search')}
            sx={styles.input}
            value={data.name}
          />
          <AppSelect
            fields={sortTranslationKeys}
            selectTitle={t('filters.sortBy.sortByTitle')}
            setValue={onSortChange}
            sx={styles.select}
            value={data.sortBy}
          />
          <Box sx={styles.buttons}>
            <AppButton
              onClick={onClearFilters}
              variant={ButtonVariantEnum.Tonal}
            >
              {t('button.clearFilters')}
            </AppButton>
            <AppButton
              onClick={onApplyFilters}
              variant={ButtonVariantEnum.Contained}
            >
              {t('button.applyFilters')}
            </AppButton>
          </Box>
        </Box>
      </AppDrawer>
    </>
  )
}

export default ResourcesToolBarDrawer
