import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider } from '@mui/material'
import Typography from '@mui/material/Typography'

import AppPagination from '~/components/app-pagination/AppPagination'
import Loader from '~/components/loader/Loader'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import BookmarksToolbar from '~/containers/bookmarked-offers/BookmarksToolbar'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'

import { snackbarVariants } from '~/constants'
import usePagination from '~/hooks/table/use-pagination'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useFilterQuery } from '~/hooks/use-filter-query'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import {
  defaultFilters,
  itemsPerPage
} from '~/pages/bookmarked-offers/BookmarkedOffers.constants'
import { styles } from '~/pages/bookmarked-offers/BookmarkedOffers.styles'
import { fetchUserById } from '~/redux/features/editProfileSlice'
import { openAlert } from '~/redux/features/snackbarSlice'
import { userService } from '~/services/user-service'
import { CardsView, CardsViewEnum, SizeEnum, UserRole } from '~/types'
import { parseQueryParams } from '~/utils/helper-functions'
import useQuery from '~/hooks/use-query'

const BookmarkedOffers = () => {
  const [cardsView, setCardsView] = useState<CardsView>(CardsViewEnum.Inline)
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const { isMobile } = useBreakpoints()
  const dispatch = useAppDispatch()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const { filters, searchParams, filterQueryActions } = useFilterQuery({
    defaultFilters
  })

  const handleResponseError = useCallback(() => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: t('bookmarkedOffers.loadingError')
      })
    )
  }, [dispatch, t])

  const getBookmarkedOffers = useCallback(() => {
    const parsedFilters = parseQueryParams(searchParams, defaultFilters)
    const filters = { ...defaultFilters, ...parsedFilters }

    return userService.getBookmarkedOffers(userId, {
      ...filters,
      limit: itemsPerPage,
      skip: (Number(filters.page) - 1) * itemsPerPage
    })
  }, [userId, searchParams])

  const {
    isLoading: isOffersLoading,
    data: offers,
    refetch: fetchData,
    isError
  } = useQuery({
    queryKey: ['bookmarks', filters, searchParams.toString()],
    queryFn: getBookmarkedOffers,
    options: {
      staleTime: Infinity
    }
  })

  useEffect(() => {
    if (isError) handleResponseError()
  }, [isError, handleResponseError])

  const initialData = { items: [], count: isError ? 0 : -1 }
  const { items, count: offersCount } = offers ?? initialData

  const { pageCount } = usePagination({
    itemsCount: offersCount,
    itemsPerPage
  })

  const updateInfo = useCallback(() => {
    void fetchData()
  }, [fetchData])

  const defaultParams = { page: defaultFilters.page }

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    filterQueryActions.updateFiltersInQuery({ page })
    toolbarRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
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
        ref={toolbarRef}
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
