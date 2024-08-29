import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import AppSelect from '~/components/app-select/AppSelect'
import FilterInput from '~/components/filter-input/FilterInput'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'

import { styles } from '~/containers/bookmarked-offers/BookmarksToolbar.styles'
import { sortTranslationKeys } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.constants'
import useBreakpoints from '~/hooks/use-breakpoints'
import {
  CardsView,
  FindBookmarksFilters,
  SizeEnum,
  UpdateFiltersInQuery
} from '~/types'

interface BookmarksToolbarProps {
  filters: FindBookmarksFilters
  updateFilters: UpdateFiltersInQuery<FindBookmarksFilters>
  additionalParams: Record<string, unknown>
  handleOffersView: (view: CardsView) => void
  offersView: CardsView
}

const BookmarksToolbar = ({
  filters,
  updateFilters,
  additionalParams,
  offersView,
  handleOffersView
}: BookmarksToolbarProps) => {
  const [title, setTitle] = useState(filters.title)
  const { t } = useTranslation()
  const { isLaptopAndAbove } = useBreakpoints()

  const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateFilters({ ...additionalParams, title })
  }

  const handleSortBy = (value: string) => {
    updateFilters({ ...additionalParams, sort: value })
  }

  const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  const inputProps = {
    endAdornment: filters.title ? (
      <IconButton
        data-testid='clear-button'
        onClick={() => {
          setTitle('')
          updateFilters({ ...additionalParams, title: '' })
        }}
        sx={{ p: 0 }}
      >
        <ClearIcon color='secondary' />
      </IconButton>
    ) : (
      <SearchIcon color='primary' />
    )
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.searchBox}>
        <form onSubmit={handleInputSubmit}>
          <FilterInput
            InputProps={inputProps}
            label={t('bookmarkedOffers.search')}
            onChange={setTitle}
            size={SizeEnum.Medium}
            sx={styles.filterInput}
            value={title}
          />
        </form>
      </Box>
      <Box sx={styles.selectContainer}>
        <AppSelect
          fields={sortOptions}
          selectTitle={t('filters.sortBy.sortByTitle')}
          setValue={handleSortBy}
          value={filters.sort}
        />
        {isLaptopAndAbove && (
          <ViewSwitcher onChange={handleOffersView} value={offersView} />
        )}
      </Box>
    </Box>
  )
}

export default BookmarksToolbar
