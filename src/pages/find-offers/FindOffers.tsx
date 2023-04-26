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
import { useDrawer } from '~/hooks/use-drawer'

import { useFilterQuery } from '~/hooks/use-filter-query'

import { CardsViewEnums, FilterQueryHook } from '~/types'

import { styles } from '~/pages/find-offers/FindOffers.styles'

import {
  mockOfferSquareCard,
  defaultFilters
} from '~/pages/find-offers/FindOffers.constants'
import { countActiveFilters } from '~/utils/count-active-filters'
import { CardsViewEnum, CardsView, SizeEnum, UserRoleEnum } from '~/types'
import OfferContainer from '~/containers/offerContainer/offerContainer'

const FindOffers = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsView, setCardsView] = useState<CardsView>(CardsViewEnum.Inline)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const [showingTutorOffers, setShowingTutorOffers] = useState<boolean>(false)
  const { isMobile } = useBreakpoints()
  const size = isMobile ? 'small' : 'medium'

  const { t } = useTranslation()

  const { filters, activeFilterCount, filterQueryActions } = useFilterQuery({
    defaultFilters,
    countActiveFilters
  })

  const mockDataPagination = {
    itemsCount: 100,
    page: currentPage,
    pageSize: 5
  }

  const mockOffers = new Array(10).fill(mockOfferSquareCard)
  const toggleFiltersOpen = () => (isOpen ? closeDrawer() : openDrawer())

  const handleShowingTutorOffers = () => {
    const updatedRole =
      filters.authorRole === UserRoleEnum.Student
        ? UserRoleEnum.Tutor
        : UserRoleEnum.Student

    filterQueryActions.updateFilter(updatedRole, 'authorRole')
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
      <OfferSearchToolbar updateFilter={filterQueryActions.updateFilter} />
      <FilterBarMenu
        chosenFiltersQty={activeFilterCount}
        filters={filters}
        handleOffersView={setCardsView}
        offersView={cardsView}
        onToggleTutorOffers={handleShowingTutorOffers}
        toggleFilters={toggleFiltersOpen}
        updateFilter={filterQueryActions.updateFilter}
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
        itemsCount={mockDataPagination.itemsCount}
        itemsPerPage={mockDataPagination.pageSize}
        onChange={setCurrentPage}
        page={mockDataPagination.page}
        size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
      />
      <PopularCategories title={t('common.popularCategories')} />
    </Container>
  )
}

export default FindOffers
