import { useState } from 'react'

import Container from '@mui/material/Container'

import useBreakpoints from '~/hooks/use-breakpoints'
import OfferCard from '~/components/offer-card/OfferCard'
import AppPagination from '~/components/app-pagination/AppPagination'
import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import { useFilterQuery } from '~/hooks/use-filter-query'

const defaultFilters = {
  sort: 'createdAt',
  language: 'All languages',
  native: 'false' 
}

const FindOffers = () => {
  const { filters, updateFilter, resetFilters, updateQueryParams } = useFilterQuery({ defaultFilters })
  const { isMobile } = useBreakpoints()
  const size = isMobile ? 'small' : 'medium'
  const [currentPage, setCurrentPage] = useState(1)

  const mockOffer = {
    id: 'id',
    imgSrc: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    rating: 4.3,
    name: 'Vasya Pupkin',
    bio: 'Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology',
    description: 'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
    languages: ['Ukrainian', 'English'],
    price: 100,
    isBookmarked: false,
    subject: 'English',
    level: 'Beginner'
  }

  const mockDataPagination = {
    itemsCount: 100,
    page: currentPage,
    pageSize: 5
  }

  const onBookmarkClick = (id) => {console.log(id)}

  return (
    <Container sx={ { flex:1 } }>
      FindOffers Page Placeholder

      <OfferCard
        offer={ mockOffer }
        onBookmarkClick={ () => onBookmarkClick(mockOffer.id) }
      />

      <OfferFilterBlock
        filters={ filters } 
        resetFilters={ resetFilters } 
        setFilters={ updateFilter }
        setFiltersToQuery={ updateQueryParams }
      /> 
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
