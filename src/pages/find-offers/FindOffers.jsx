import { useState } from 'react'

import useBreakpoints from '~/hooks/use-breakpoints'
import OfferCard from '~/components/offer-card/OfferCard'
import AppPagination from '~/components/app-pagination/AppPagination'

const FindOffers = () => {
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

  const onBookmarkClick = (id) => {}

  return (
    <div>
      FindOffers Page Placeholder

      <OfferCard
        offer={mockOffer}
        onBookmarkClick={ () => onBookmarkClick(mockOffer.id) }
      />

      <AppPagination
        itemsCount={mockDataPagination.itemsCount}
        page={mockDataPagination.page}
        pageSize={mockDataPagination.pageSize}
        setCurrentPage={setCurrentPage}
        size={size}
      />
    </div>
  )
}

export default FindOffers
