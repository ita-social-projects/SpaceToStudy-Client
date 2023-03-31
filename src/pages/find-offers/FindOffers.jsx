import { useState } from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import OfferCard from '~/components/offer-card/OfferCard'
import AppPagination from '~/components/app-pagination/AppPagination'
import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import FilterBarMenu from '~/containers/find-offer/filter-bar-menu/FilterBarMenu'
import { useFilterQuery } from '~/hooks/use-filter-query'

import { mockOffer, defaultFilters } from '~/pages/find-offers/FindOffers.constants'

const FindOffers = () => {
  const { filters, countActiveFilters,filterQueryActions } = useFilterQuery({ defaultFilters })
  const [openFilters, setOpenFilters] = useState(null)
  const [showingTutorOffers, setShowingTutorOffers] = useState(false)
  const { isMobile } = useBreakpoints()
  const size = isMobile ? 'small' : 'medium'
  const [currentPage, setCurrentPage] = useState(1)
  
  const mockDataPagination = {
    itemsCount: 100,
    page: currentPage,
    pageSize: 5
  }

  const onBookmarkClick = (id) => {console.log(id)}
  const handleToggleOpenFilters = (event) => setOpenFilters(prev => prev ? null : event.currentTarget)
  const handleShowingTutorOffers = () => setShowingTutorOffers(prev => !prev)
  
  return (
    <Container sx={ { flex: 1 ,display: 'flex', flexDirection: 'column' } }>
      FindOffers Page Placeholder

      <FilterBarMenu
        chosenFiltersQty={ countActiveFilters } 
        filters={ filters }
        setFilters={ filterQueryActions.updateFilter }
        toggleFilters={ handleToggleOpenFilters }
      />
      <Box sx={ { display: 'flex' } }>
        <OfferFilterBlock
          anchor={ openFilters }
          closeFilters={ handleToggleOpenFilters }
          filterActions={ filterQueryActions }
          filters={ filters }
          onToggleTutorOffers={ handleShowingTutorOffers }
          showingTutorOffers={ showingTutorOffers }
        /> 
        <OfferCard
          offer={ mockOffer }
          onBookmarkClick={ () => onBookmarkClick(mockOffer.id) }
        />
      </Box>
      <AppPagination
        itemsCount={ mockDataPagination.itemsCount }
        page={ mockDataPagination.page }
        pageSize={ mockDataPagination.pageSize }
        setCurrentPage={ setCurrentPage }
        size={ size }
      />
    </Container>
  )
}

export default FindOffers
