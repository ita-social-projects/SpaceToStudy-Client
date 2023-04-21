import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'

import useBreakpoints from '~/hooks/use-breakpoints'
import OfferCard from '~/components/offer-card/OfferCard'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import AppPagination from '~/components/app-pagination/AppPagination'
import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import FilterBarMenu from '~/containers/find-offer/filter-bar-menu/FilterBarMenu'
import { useFilterQuery } from '~/hooks/use-filter-query'
import { defaultResponses } from '~/constants'

import {
  mockOffer,
  defaultFilters
} from '~/pages/find-offers/FindOffers.constants'

const FindOffers = () => {
  const { filters, countActiveFilters, filterQueryActions } = useFilterQuery({
    defaultFilters
  })
  const [openFilters, setOpenFilters] = useState(false)
  const [showingTutorOffers, setShowingTutorOffers] = useState(false)
  const { isMobile } = useBreakpoints()
  const size = isMobile ? 'small' : 'medium'
  const [currentPage, setCurrentPage] = useState(1)

  const { t } = useTranslation()

  const getCategories = useCallback(
    () => categoryService.getCategories({ limit: 9 }),
    []
  )
  const { response: categoriesData, loading: categoriesLoading } = useAxios({
    service: getCategories,
    defaultResponse: defaultResponses.array
  })

  const mockDataPagination = {
    itemsCount: 100,
    page: currentPage,
    pageSize: 5
  }

  const onBookmarkClick = (id) => {
    console.log(id)
  }
  const handleToggleOpenFilters = () => setOpenFilters((prev) => !prev)
  const handleShowingTutorOffers = () => setShowingTutorOffers((prev) => !prev)

  return (
    <Container
      sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      FindOffers Page Placeholder
      <FilterBarMenu
        chosenFiltersQty={countActiveFilters}
        filters={filters}
        setFilters={filterQueryActions.updateFilter}
        toggleFilters={handleToggleOpenFilters}
      />
      <Box sx={{ display: 'flex' }}>
        <OfferFilterBlock
          closeFilters={handleToggleOpenFilters}
          countActiveFilters={countActiveFilters}
          filterActions={filterQueryActions}
          filters={filters}
          onToggleTutorOffers={handleShowingTutorOffers}
          open={openFilters}
          showingTutorOffers={showingTutorOffers}
        />
        <OfferCard
          offer={mockOffer}
          onBookmarkClick={() => onBookmarkClick(mockOffer.id)}
        />
      </Box>
      <AppPagination
        itemsCount={mockDataPagination.itemsCount}
        page={mockDataPagination.page}
        itemsPerPage={mockDataPagination.itemsPerPage}
        onChange={setCurrentPage}
        size={size}
      />
      <PopularCategories
        items={categoriesData}
        loading={categoriesLoading}
        title={t('common.popularCategories')}
      />
    </Container>
  )
}

export default FindOffers
