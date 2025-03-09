import React, { forwardRef } from 'react'
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
  UpdateFiltersInQuery,
  UserRoleEnum
} from '~/types'
import { sortTranslationKeys } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.constants'

interface FilterBarMenuProps {
  chosenFiltersQty?: number
  toggleFilters: () => void
  handleOffersView: (view: CardsView) => void
  offersView: CardsView
  onToggleTutorOffers: () => void
  additionalParams: Record<string, unknown>
  updateFilters: UpdateFiltersInQuery<FindOffersFilters>
  filters: FindOffersFilters
}

const FilterBarMenu = forwardRef<HTMLDivElement, FilterBarMenuProps>(
  (
    {
      chosenFiltersQty,
      toggleFilters,
      updateFilters,
      filters,
      handleOffersView,
      onToggleTutorOffers,
      additionalParams,
      offersView
    },
    ref
  ) => {
    const { isLaptopAndAbove, isMobile } = useBreakpoints()

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
      updateFilters({ ...additionalParams, sort: value })
    }

    const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
      title: t(title),
      value
    }))

    return (
      <Box ref={ref} sx={isMobile ? styles.mobileContainer : styles.container}>
        <FiltersToggle
          chosenFiltersQty={chosenFiltersQty}
          handleToggle={toggleFilters}
        />
        {isLaptopAndAbove ? (
          <AppContentSwitcher
            active={filters.authorRole === UserRoleEnum.Student}
            data-testid='switch'
            onChange={onToggleTutorOffers}
            switchOptions={translatedSwitcherOptions}
            typographyVariant='button'
          />
        ) : null}
        {!isMobile ? (
          <Box data-testid='app-select-block' sx={styles.container}>
            <AppSelect
              fields={sortOptions}
              selectTitle={t('filters.sortBy.sortByTitle')}
              setValue={handleSortBy}
              sx={isLaptopAndAbove ? styles.selectContainer : {}}
              value={filters.sort}
            />
            {isLaptopAndAbove ? (
              <ViewSwitcher onChange={handleOffersView} value={offersView} />
            ) : null}
          </Box>
        ) : null}
      </Box>
    )
  }
)

FilterBarMenu.displayName = 'FilterBarMenu'

export default FilterBarMenu
