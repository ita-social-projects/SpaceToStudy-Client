import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import { OfferService } from '~/services/offer-service'
import useBreakpoints from '~/hooks/use-breakpoints'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import AppPagination from '~/components/app-pagination/AppPagination'
import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import FilterBarMenu from '~/containers/find-offer/filter-bar-menu/FilterBarMenu'
import OfferSearchToolbar from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import Loader from '~/components/loader/Loader'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'
import { countActiveOfferFilters } from '~/utils/count-active-filters'
import { useDrawer } from '~/hooks/use-drawer'
import { useFilterQuery } from '~/hooks/use-filter-query'
import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'

import {
  CardsViewEnum,
  CardsView,
  SizeEnum,
  UserRoleEnum,
  FindOffersFilters,
  VisibilityEnum
} from '~/types'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import { defaultFilters } from '~/pages/find-offers/FindOffers.constants'

const FindOffers = () => {
  const [cardsView, setCardsView] = useState<CardsView>(CardsViewEnum.Inline)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { isMobile, isDesktop } = useBreakpoints()

  const { t } = useTranslation()

  const itemsPerPage = cardsView === CardsViewEnum.Inline ? 4 : 6

  const { filters, activeFilterCount, searchParams, filterQueryActions } =
    useFilterQuery({
      defaultFilters,
      countActiveFilters: countActiveOfferFilters
    })

  const getOffers = useCallback(
    (params?: FindOffersFilters) => OfferService.getOffers(params),
    []
  )

  const {
    response: offersResponse,
    loading: offersLoading,
    fetchData
  } = useAxios({
    service: getOffers,
    defaultResponse: { offers: [], count: 0 },
    fetchOnMount: false
  })

  const { offers, count: offersCount } = offersResponse

  const {
    page,
    setPage,
    pageCount,
    rowsPerPage,
    handleChangePaginationController
  } = usePagination({
    defaultPage: Number(filters.page),
    itemsCount: offersCount,
    itemsPerPage
  })

  useEffect(() => {
    setPage(1)
  }, [searchParams, setPage])

  const skip = useMemo(() => {
    if (!page) {
      return 0
    }
    return (page - 1) * rowsPerPage
  }, [page, rowsPerPage])

  useEffect(() => {
    void fetchData({
      ...filters,
      limit: itemsPerPage,
      skip
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, searchParams, itemsPerPage, skip])

  const toggleFiltersOpen = () => (isOpen ? closeDrawer() : openDrawer())

  const handleShowingTutorOffers = () => {
    const updatedRole =
      filters.authorRole === UserRoleEnum.Student
        ? UserRoleEnum.Tutor
        : UserRoleEnum.Student

    filterQueryActions.updateFilterInQuery(updatedRole, 'authorRole')
  }

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

  const hidePaginationStyle = {
    visibility:
      offersLoading || !offers.length
        ? VisibilityEnum.Hidden
        : VisibilityEnum.Visible
  }

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
        {offersLoading ? (
          <Loader pageLoad size={70} />
        ) : (
          <OfferContainer
            isFiltersOpen={isOpen}
            offerCards={offers}
            viewMode={cardsView}
          />
        )}
      </Box>
      <AppPagination
        onChange={handleChangePaginationController}
        page={page}
        pageCount={pageCount}
        size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
        sx={hidePaginationStyle}
      />
      <PopularCategories title={t('common.popularCategories')} />
    </Container>
  )
}

export default FindOffers
