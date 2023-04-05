import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import OfferContainer from '~/containers/OfferContainer/OfferContainer'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import AppPagination from '~/components/app-pagination/AppPagination'
import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import FilterBarMenu from '~/containers/find-offer/filter-bar-menu/FilterBarMenu'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import { useDrawer } from '~/hooks/use-drawer'

import { useFilterQuery } from '~/hooks/use-filter-query'

import { defaultFilters, mockOffers } from '~/pages/find-offers/FindOffers.constants'

const FindOffers = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { filters, countActiveFilters, filterQueryActions } = useFilterQuery({
    defaultFilters
  })
  const [showingTutorOffers, setShowingTutorOffers] = useState(false)
  const { isMobile } = useBreakpoints()
  const size = isMobile ? 'small' : 'medium'

  const { t } = useTranslation()

  const mockDataPagination = {
    itemsCount: 100,
    page: currentPage,
    pageSize: 5
  }


  const handleToggleOpenFilters = () => setOpenFilters(prev => !prev)
  const handleShowingTutorOffers = () => setShowingTutorOffers(prev => !prev)

  const currentOffersOnPage = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * mockDataPagination.pageSize
    const lastPageIndex = firstPageIndex + mockDataPagination.pageSize
    return mockOffers.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, mockDataPagination.pageSize])
  
  return (
    <Container sx={ { flex: 1 ,display: 'flex', flexDirection: 'column', gap: 1 } }>
      FindOffers Page Placeholder

  const toggleFiltersOpen = () => (isOpen ? closeDrawer() : openDrawer())

  const handleShowingTutorOffers = () => setShowingTutorOffers((prev) => !prev)

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
    <Container
      sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      FindOffers Page Placeholder
      <FilterBarMenu
        chosenFiltersQty={ countActiveFilters }
        filters={ filters }
        setFilters={ filterQueryActions.updateFilter }
        toggleFilters={ handleToggleOpenFilters }
      />
      <Box sx={ { display: 'flex' } }>
        <OfferFilterBlock
          closeFilters={ handleToggleOpenFilters }
          countActiveFilters={ countActiveFilters }
          filterActions={ filterQueryActions }
          filters={ filters }
          onToggleTutorOffers={ handleShowingTutorOffers }
          open={ openFilters }
          showingTutorOffers={ showingTutorOffers }
        /> 
        <OfferContainer offerCards={ currentOffersOnPage } /> 
      </Box>
      <AppPagination
        itemsCount={mockDataPagination.itemsCount}
        itemsPerPage={mockDataPagination.itemsPerPage}
        onChange={setCurrentPage}
        page={mockDataPagination.page}
        size={size}
      />
      <PopularCategories title={t('common.popularCategories')} />
    </Container>
  )
}

export default FindOffers
