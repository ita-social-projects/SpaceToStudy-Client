import { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import Box from '@mui/material/Box'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import AppToolbar from '~/components/app-toolbar/AppToolbar'

import {
  CategoryNameInterface,
  FindOffersFilters,
  FiltersActions,
  SubjectNameInterface
} from '~/types'

import { styles } from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar.styles'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

interface OfferSearchToolbarProps {
  filters: FindOffersFilters
  filterActions: FiltersActions<FindOffersFilters>
  additionalParams: Record<string, unknown>
}

const OfferSearchToolbar = ({
  filters,
  additionalParams,
  filterActions
}: OfferSearchToolbarProps) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { updateFiltersInQuery } = filterActions

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(filters.categoryId),
    [filters.categoryId]
  )

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    updateFiltersInQuery({
      ...additionalParams,
      subjectId: '',
      categoryId: value?._id ?? ''
    })
  }

  const onSubjectChange = (
    _: React.SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    updateFiltersInQuery({ ...additionalParams, subjectId: value?._id ?? '' })
  }

  const updateName = (value: string) => {
    updateFiltersInQuery({ ...additionalParams, search: value })
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

  const searchInputPlaceholder = t(
    `findOffers.searchToolbar.${filters.authorRole}Label`
  )

  return (
    <Box sx={styles.container}>
      {!isMobile && (
        <AppToolbar sx={styles.searchToolbar}>
          {AppAutoCompleteList}
          {isLaptopAndAbove && (
            <SearchFilterInput
              textFieldProps={{
                placeholder: searchInputPlaceholder
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
