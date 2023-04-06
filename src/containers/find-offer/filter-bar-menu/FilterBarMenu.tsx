import { FC, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'

import { styles } from '~/containers/find-offer/filter-bar-menu/FilterBarMenu.styles'
import { sortByFields } from '~/containers/find-offer/filter-bar-menu/FilterBarMenu.constants'

import { BarMenuFilters, CardsViewTypes } from '~/types'

interface FilterBarMenuProps {
  chosenFiltersQty: number
  toggleFilters: () => void
  getFilters: (filters: BarMenuFilters) => void
  handleOffersView: (view: CardsViewTypes) => void
  offersView: CardsViewTypes
  setFilters: (filters: BarMenuFilters) => void
  filters: BarMenuFilters
}

const FilterBarMenu: FC<FilterBarMenuProps> = ({
  chosenFiltersQty,
  toggleFilters,
  setFilters,
  filters,
  handleOffersView,
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

  const handleOffersType = (
    event: ChangeEvent<HTMLInputElement>,
    isActiveOffersType: boolean
  ) => {
    setFilters({ ...filters, isActiveOffersType })
  }

  const handleSortBy = (sortBy: string) => {
    setFilters({ ...filters, sortBy })
  }

  return (
    <Box sx={isMobile ? styles.mobileContainer : styles.container}>
      <FiltersToggle
        chosenFiltersQty={chosenFiltersQty}
        handleToggle={toggleFilters}
      />
      {isDesktop ? (
        <AppContentSwitcher
          active={filters.isActiveOffersType}
          handleChange={handleOffersType}
          switchOptions={translatedSwitcherOptions}
          typographyVariant='button'
        />
      ) : null}
      {!isMobile ? (
        <Box sx={styles.container}>
          <AppSelect
            fields={sortByFields}
            selectTitle={t('filters.sortBy.sortByTitle')}
            setValue={handleSortBy}
            sx={isDesktop ? styles.selectContainer : {}}
            value={filters.sortBy}
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
