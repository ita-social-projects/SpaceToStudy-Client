import { useCallback, useEffect, ChangeEvent, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { OfferService } from '~/services/offer-service'
import useBreakpoints from '~/hooks/use-breakpoints'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import AppPagination from '~/components/app-pagination/AppPagination'
import OfferFilterBlock from '~/containers/find-offer/offer-filter-block/OfferFilterBlock'
import FilterBarMenu from '~/containers/find-offer/filter-bar-menu/FilterBarMenu'
import OfferSearchToolbar from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { authRoutes } from '~/router/constants/authRoutes'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import Loader from '~/components/loader/Loader'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import { countActiveOfferFilters } from '~/utils/count-active-filters'
import { useDrawer } from '~/hooks/use-drawer'
import { useFilterQuery } from '~/hooks/use-filter-query'
import { useAppSelector } from '~/hooks/use-redux'
import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import { getOpositeRole } from '~/utils/helper-functions'

import {
  CardsViewEnum,
  CardsView,
  SizeEnum,
  GetOffersParams,
  GetOffersResponse,
  PositionEnum,
  StatusEnum
} from '~/types'
import {
  defaultFilters,
  defaultResponse,
  itemsPerPage
} from '~/pages/find-offers/FindOffers.constants'
import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const [cardsView, setCardsView] = useState<CardsView>(CardsViewEnum.Inline)
  const { userRole } = useAppSelector((state) => state.appMain)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { isMobile, isLaptopAndAbove } = useBreakpoints()

  const { t } = useTranslation()

  const oppositeRole = getOpositeRole(userRole)

  const { filters, activeFilterCount, searchParams, filterQueryActions } =
    useFilterQuery({
      defaultFilters: defaultFilters(oppositeRole),
      countActiveFilters: countActiveOfferFilters
    })

  const getOffers = useCallback(
    (params?: GetOffersParams) => OfferService.getOffers(params),
    []
  )

  const {
    response: offersResponse,
    loading: offersLoading,
    fetchData
  } = useAxios<GetOffersResponse, GetOffersParams>({
    service: getOffers,
    defaultResponse,
    fetchOnMount: false
  })

  const { items, count: offersCount } = offersResponse

  const { pageCount } = usePagination({
    itemsCount: offersCount,
    itemsPerPage
  })

  const price = useMemo(() => {
    const filterItems = items.map((item) => item.price)
    const minPrice = Math.min(...filterItems)
    const maxPrice = Math.max(...filterItems)

    return { minPrice, maxPrice }
  }, [items])

  const updateInfo = useCallback(() => {
    void fetchData({
      ...filters,
      status: StatusEnum.Active,
      limit: itemsPerPage,
      skip: (Number(filters.page) - 1) * itemsPerPage
    })
  }, [fetchData, filters])

  const searchString = searchParams.toString()

  useEffect(() => {
    updateInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, searchString])

  const toggleFiltersOpen = () => (isOpen ? closeDrawer() : openDrawer())

  const defaultParams = { page: defaultFilters(oppositeRole).page }

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    filterQueryActions.updateFiltersInQuery({ page })
  }

  const handleShowingTutorOffers = () => {
    const updatedRole = getOpositeRole(filters.authorRole)
    filterQueryActions.updateFiltersInQuery({
      ...defaultParams,
      authorRole: updatedRole
    })
  }

  return (
    <PageWrapper>
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
        additionalParams={defaultParams}
        filterActions={filterQueryActions}
        filters={filters}
      />
      <FilterBarMenu
        additionalParams={defaultParams}
        chosenFiltersQty={activeFilterCount}
        filters={filters}
        handleOffersView={setCardsView}
        offersView={cardsView}
        onToggleTutorOffers={handleShowingTutorOffers}
        toggleFilters={toggleFiltersOpen}
        updateFilters={filterQueryActions.updateFiltersInQuery}
      />
      <Box sx={styles.filterSection}>
        <AppDrawer
          anchor={isLaptopAndAbove ? PositionEnum.Left : PositionEnum.Right}
          onClose={closeDrawer}
          open={isOpen}
        >
          <OfferFilterBlock
            activeFilterCount={activeFilterCount}
            additionalParams={defaultParams}
            closeFilters={closeDrawer}
            filterActions={filterQueryActions}
            filters={filters}
            onToggleTutorOffers={handleShowingTutorOffers}
            open={isOpen}
            price={price}
          />
        </AppDrawer>
        {offersLoading ? (
          <Loader pageLoad />
        ) : !items.length && !offersLoading ? (
          <NotFoundResults
            data
            description={t('findOffers.notFound.description')}
          />
        ) : (
          <OfferContainer
            offerCards={items}
            updateOffersInfo={updateInfo}
            viewMode={cardsView}
          />
        )}
      </Box>
      <AppPagination
        onChange={handlePageChange}
        page={Number(filters.page)}
        pageCount={pageCount}
        size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
        sx={styles.pagination(offersLoading || !offersCount)}
      />
      <PopularCategories
        sx={styles.popularCategories}
        title={t('common.popularCategories')}
      />
    </PageWrapper>
  )
}

export default FindOffers
