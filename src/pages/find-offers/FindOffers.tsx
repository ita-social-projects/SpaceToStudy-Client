import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import AppPagination from '~/components/app-pagination/AppPagination'
import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import FilterBarMenu from '~/containers/find-offer/filter-bar-menu/FilterBarMenu'
import OfferSearchToolbar from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import { useDrawer } from '~/hooks/use-drawer'
import { useFilterQuery } from '~/hooks/use-filter-query'

import { CardsViewEnums, FilterQueryHook } from '~/types'

import { styles } from '~/pages/find-offers/FindOffers.styles'

import {
  mockOffer,
  defaultFilters
} from '~/pages/find-offers/FindOffers.constants'

const FindOffers = () => {
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { filters, countActiveFilters, filterQueryActions }: FilterQueryHook =
    useFilterQuery({
      defaultFilters
    })
  const [showingTutorOffers, setShowingTutorOffers] = useState<boolean>(false)
  const { isMobile } = useBreakpoints()
  const size = isMobile ? 'small' : 'medium'
  const { t } = useTranslation()

  const toggleFiltersOpen = () => (isOpen ? closeDrawer() : openDrawer())

  const handleShowingTutorOffers = () => setShowingTutorOffers((prev) => !prev)

  const mockOffers = new Array(6).fill(mockOffer)

  const filtersComponent = (
    <OfferFilterBlock
      closeFilters={closeDrawer}
      countActiveFilters={countActiveFilters}
      filterActions={filterQueryActions}
      filters={filters}
      onToggleTutorOffers={handleShowingTutorOffers}
      open={isOpen}
      showingTutorOffers={showingTutorOffers}
    />
  )

  return (
    <Container sx={styles.container}>
      <OfferSearchToolbar updateFilter={filterQueryActions.updateFilter} />
      <FilterBarMenu
        chosenFiltersQty={countActiveFilters}
        filters={filters}
        setFilters={filterQueryActions.updateFilter}
        toggleFilters={toggleFiltersOpen}
      />
      <Box sx={styles.filterSection}>
        {!isMobile ? (
          filtersComponent
        ) : (
          <AppDrawer onClose={closeDrawer} open={isOpen}>
            {filtersComponent}
          </AppDrawer>
        )}
        <OfferContainer
          offerCards={mockOffers}
          viewMode={CardsViewEnums.Inline}
        />
      </Box>
      <AppPagination
        itemsCount={mockOffers.itemsCount}
        itemsPerPage={mockOffers.itemsPerPage}
        page={mockOffers.page}
        size={size}
      />
      <PopularCategories title={t('common.popularCategories')} />
    </Container>
  )
}

export default FindOffers
