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
import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'
import { countActiveOfferFilters } from '~/utils/count-active-filters'
import { useDrawer } from '~/hooks/use-drawer'
import { useFilterQuery } from '~/hooks/use-filter-query'
import usePagination from '~/hooks/table/use-pagination'

import { CardsViewEnum, CardsView, SizeEnum, UserRoleEnum } from '~/types'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import {
  mockOffer,
  defaultFilters
} from '~/pages/find-offers/FindOffers.constants'

const FindOffers = () => {
  const [cardsView, setCardsView] = useState<CardsView>(CardsViewEnum.Inline)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { isMobile, isDesktop } = useBreakpoints()

  const { t } = useTranslation()

  const { filters, activeFilterCount, filterQueryActions } = useFilterQuery({
    defaultFilters,
    countActiveFilters: countActiveOfferFilters
  })
  const { page, pageCount, handleChangePaginationController } = usePagination({
    defaultPage: Number(filters.page),
    itemsCount: 100
  })

  const toggleFiltersOpen = () => (isOpen ? closeDrawer() : openDrawer())

  const handleShowingTutorOffers = () => {
    const updatedRole =
      filters.authorRole === UserRoleEnum.Student
        ? UserRoleEnum.Tutor
        : UserRoleEnum.Student

    filterQueryActions.updateFilterInQuery(updatedRole, 'authorRole')
  }
  const mockOffers = new Array(6).fill(mockOffer)

  const filtersComponent = (
    <OfferFilterBlock
      activeFilterCount={activeFilterCount}
      closeFilters={closeDrawer}
      filterActions={filterQueryActions}
      filters={filters}
      onToggleTutorOffers={handleShowingTutorOffers}
      open={isOpen}
    />
  )

  return (
    <Container sx={styles.container}>
      <OfferRequestBlock />
      <OfferSearchToolbar
        filterActions={filterQueryActions}
        filters={filters}
      />
      <FilterBarMenu
        chosenFiltersQty={activeFilterCount}
        filters={filters}
        handleOffersView={setCardsView}
        offersView={cardsView}
        onToggleTutorOffers={handleShowingTutorOffers}
        toggleFilters={toggleFiltersOpen}
        updateFilter={filterQueryActions.updateFilterInQuery}
      />
      <Box sx={styles.filterSection}>
        {isDesktop ? (
          filtersComponent
        ) : (
          <AppDrawer onClose={closeDrawer} open={isOpen}>
            {filtersComponent}
          </AppDrawer>
        )}
        <OfferContainer
          isFiltersOpen={isOpen}
          offerCards={mockOffers}
          viewMode={cardsView}
        />
      </Box>
      <AppPagination
        onChange={handleChangePaginationController}
        page={page}
        pageCount={pageCount}
        size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
      />
      <PopularCategories title={t('common.popularCategories')} />
    </Container>
  )
}

export default FindOffers
