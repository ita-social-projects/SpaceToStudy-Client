import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
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
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { authRoutes } from '~/router/constants/authRoutes'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import Loader from '~/components/loader/Loader'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
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
  VisibilityEnum,
  GetOffersPrarams,
  GetOffersResponse
} from '~/types'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import {
  defaultFilters,
  defaultResponse
} from '~/pages/find-offers/FindOffers.constants'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

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
    (params?: GetOffersPrarams) => OfferService.getOffers(params),
    []
  )

  const {
    response: offersResponse,
    loading: offersLoading,
    fetchData
  } = useAxios<GetOffersResponse, GetOffersPrarams>({
    service: getOffers,
    defaultResponse,
    fetchOnMount: false
  })

  const { offers, count: offersCount } = offersResponse

  const { page, setPage, pageCount, rowsPerPage, handleChangePage } =
    usePagination({
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

  const offerContainerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  const updateOfferContainerHeight = () => {
    if (offerContainerRef.current) {
      setHeight(offerContainerRef.current.offsetHeight)
    }
  }

  useEffect(() => {
    updateOfferContainerHeight()
  }, [filterQueryActions])
  console.log(offers.length)
  const getFilterSectionStyles = useMemo(() => {
    return !offers.length && isDesktop
      ? styles.filterSectionNotFound(height)
      : styles.filterSectionStyles(isDesktop, height)
  }, [offers.length, isDesktop, height])

  const filtersComponent = (
    <OfferFilterBlock
      activeFilterCount={activeFilterCount}
      closeFilters={closeDrawer}
      filterActions={filterQueryActions}
      filters={filters}
      onToggleTutorOffers={handleShowingTutorOffers}
      open={isOpen}
      sx={getFilterSectionStyles}
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
      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize='small' />}
          linkTo={authRoutes.subjects.path}
          title={t('findOffers.backToAllSubjects')}
        />
      </Box>
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
          <Box
            onLoad={updateOfferContainerHeight}
            sx={styles.offerContainerHeight}
          >
            {!offers.length && !offersLoading ? (
              <Box ref={offerContainerRef}>
                <NotFoundResults
                  description={t('findOffers.notFound.description')}
                />
              </Box>
            ) : (
              <Box ref={offerContainerRef}>
                <OfferContainer
                  isFiltersOpen={isOpen}
                  offerCards={offers}
                  viewMode={cardsView}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <AppPagination
        onChange={handleChangePage}
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
