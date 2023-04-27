import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'

import { styles } from '~/containers/find-offer/filter-bar-menu/FilterBarMenu.styles'

import {
  CardsView,
  FindOffersFilters,
  FindOffersUpdateFilter,
  UserRoleEnum
} from '~/types'
import { sortTranslationKeys } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.constants'

interface FilterBarMenuProps {
  chosenFiltersQty?: number
  toggleFilters: () => void
  handleOffersView: (view: CardsView) => void
  offersView: CardsView
  onToggleTutorOffers: () => void
  updateFilter: FindOffersUpdateFilter<FindOffersFilters>
  filters: FindOffersFilters
}

const FilterBarMenu: FC<FilterBarMenuProps> = ({
  chosenFiltersQty,
  toggleFilters,
  updateFilter,
  filters,
  handleOffersView,
  onToggleTutorOffers,
  offersView
}) => {
  const { isDesktop, isMobile } = useBreakpoints()

  const { t } = useTranslation()

  const translatedSwitcherOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers'),
      tooltip: t('findOffers.contentSwitcher.switcher-tutor')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests'),
      tooltip: t('findOffers.contentSwitcher.switcher-student')
    }
  }

  const handleSortBy = (value: string) => {
    updateFilter(value, 'sort')
  }
  const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  return (
    <Box sx={isMobile ? styles.mobileContainer : styles.container}>
      <FiltersToggle
        chosenFiltersQty={chosenFiltersQty}
        handleToggle={toggleFilters}
      />
      {isDesktop ? (
        <AppContentSwitcher
          active={filters.authorRole === UserRoleEnum.Student}
          onChange={onToggleTutorOffers}
          switchOptions={translatedSwitcherOptions}
          typographyVariant='button'
        />
      ) : null}
      {!isMobile ? (
        <Box sx={styles.container}>
          <AppSelect
            fields={sortOptions}
            selectTitle={t('filters.sortBy.sortByTitle')}
            setValue={handleSortBy}
            sx={isDesktop ? styles.selectContainer : {}}
            value={filters.sort}
          />
          {isDesktop ? (
            <ViewSwitcher onChange={handleOffersView} value={offersView} />
          ) : null}
        </Box>
      ) : null}
    </Box>
  )
}

export default FilterBarMenu
