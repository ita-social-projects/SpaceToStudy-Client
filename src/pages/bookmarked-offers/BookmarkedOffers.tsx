import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider } from '@mui/material'
import Typography from '@mui/material/Typography'

import AppPagination from '~/components/app-pagination/AppPagination'
import Loader from '~/components/loader/Loader'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import BookmarksToolbar from '~/containers/bookmarked-offers/BookmarksToolbar'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'

import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useFilterQuery } from '~/hooks/use-filter-query'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import {
  defaultFilters,
  itemsPerPage
} from '~/pages/bookmarked-offers/BookmarkedOffers.constants'
import { styles } from '~/pages/bookmarked-offers/BookmarkedOffers.styles'
import { fetchUserById } from '~/redux/features/editProfileSlice'
import { userService } from '~/services/user-service'
import {
  CardsView,
  CardsViewEnum,
  GetOffersParams,
  GetOffersResponse,
  SizeEnum,
  UserRole
} from '~/types'

const BookmarkedOffers = () => {
  const [cardsView, setCardsView] = useState<CardsView>(CardsViewEnum.Inline)
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const { bookmarkedOffers } = useAppSelector((state) => state.editProfile)
  const { isMobile } = useBreakpoints()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { filters, searchParams, filterQueryActions } = useFilterQuery({
    defaultFilters
  })

  const getOffers = useCallback(
    (params?: GetOffersParams) =>
      userService.getBookmarkedOffers(userId, params),
    [userId]
  )

  const {
    response: offersResponse,
    loading: isOffersLoading,
    fetchData
  } = useAxios<GetOffersResponse, GetOffersParams>({
    service: getOffers,
    defaultResponse: { items: [], count: -1 },
    fetchOnMount: false
  })

  const { items, count: offersCount } = offersResponse

  const { pageCount } = usePagination({
    itemsCount: offersCount,
    itemsPerPage
  })

  const updateInfo = useCallback(() => {
    void fetchData({
      ...filters,
      limit: itemsPerPage,
      skip: (Number(filters.page) - 1) * itemsPerPage
    })
  }, [fetchData, filters])

  const searchString = searchParams.toString()

  useEffect(() => {
    updateInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, bookmarkedOffers])

  const defaultParams = { page: defaultFilters.page }

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    filterQueryActions.updateFiltersInQuery({ page })
  }

  useEffect(() => {
    void dispatch(
      fetchUserById({ userId, role: userRole as UserRole, isEdit: false })
    )
  }, [dispatch, userId, userRole])

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{t('bookmarkedOffers.title')}</Typography>
      <BookmarksToolbar
        additionalParams={defaultParams}
        filters={filters}
        handleOffersView={setCardsView}
        offersView={cardsView}
        updateFilters={filterQueryActions.updateFiltersInQuery}
      />
      <Divider sx={styles.divider} />

      {isOffersLoading && <Loader pageLoad />}

      {offersCount > 0 && (
        <OfferContainer
          offerCards={items}
          updateOffersInfo={updateInfo}
          viewMode={cardsView}
        />
      )}

      {offersCount === 0 && (
        <NotFoundResults
          description={t('bookmarkedOffers.notFound.description')}
          sx={styles.notFound}
        />
      )}

      <AppPagination
        onChange={handlePageChange}
        page={Number(filters.page)}
        pageCount={pageCount}
        size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
        sx={styles.pagination(isOffersLoading || !offersCount)}
      />
    </PageWrapper>
  )
}

export default BookmarkedOffers
