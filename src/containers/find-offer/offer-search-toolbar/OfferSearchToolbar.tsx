import { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import Box from '@mui/material/Box'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import AppToolbar from '~/components/app-toolbar/AppToolbar'

import {
  CategoryNameInterface,
  FindOffersFilters,
  FindOffersFiltersActions,
  SubjectNameInterface
} from '~/types'

import { styles } from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar.styles'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

interface OfferSearchToolbarProps {
  filters: FindOffersFilters
  filterActions: FindOffersFiltersActions<FindOffersFilters>
  resetPage: () => void
}

const OfferSearchToolbar = ({
  filters,
  resetPage,
  filterActions
}: OfferSearchToolbarProps) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { updateFilterInQuery } = filterActions

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(filters.categoryId),
    [filters.categoryId]
  )

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    updateFilterInQuery(value?._id ?? '', 'categoryId')
    updateFilterInQuery('', 'subjectId')
    resetPage()
  }

  const onSubjectChange = (
    _: React.SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    updateFilterInQuery(value?._id ?? '', 'subjectId')
    resetPage()
  }

  const updateName = (value: string) => {
    updateFilterInQuery(value, 'search')
    resetPage()
  }

  const AppAutoCompleteList = (
    <>
      <AsyncAutocomplete
        labelField='name'
        onChange={onCategoryChange}
        service={categoryService.getCategoriesNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.categories')
        }}
        value={filters.categoryId}
        valueField='_id'
      />
      <AsyncAutocomplete
        labelField='name'
        onChange={onSubjectChange}
        service={getSubjectsNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.subjects')
        }}
        value={filters.subjectId}
        valueField='_id'
      />
    </>
  )

  return (
    <Box sx={styles.container}>
      {!isMobile && (
        <AppToolbar sx={styles.searchToolbar}>
          {AppAutoCompleteList}
          {isLaptopAndAbove && (
            <SearchFilterInput
              textFieldProps={{
                placeholder: t('findOffers.searchToolbar.label')
              }}
              updateFilter={updateName}
            />
          )}
        </AppToolbar>
      )}
      {isMobile && AppAutoCompleteList}
    </Box>
  )
}

export default OfferSearchToolbar
