import { ChangeEvent, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AppPagination from '~/components/app-pagination/AppPagination'
import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'

import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useFilterQuery } from '~/hooks/use-filter-query'
import { useAppSelector } from '~/hooks/use-redux'
import {
  defaultFilters,
  itemsPerPage
} from '~/pages/bookmarked-offers/BookmarkedOffers.constants'
import { styles } from '~/pages/bookmarked-offers/BookmarkedOffers.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import { userService } from '~/services/user-service'
import {
  ButtonVariantEnum,
  CardsViewEnum,
  GetOffersParams,
  GetOffersResponse,
  SizeEnum,
  StatusEnum
} from '~/types'
import { countActiveOfferFilters } from '~/utils/count-active-filters'

function BookmarkedOffers() {
  const { userId } = useAppSelector((state) => state.appMain)
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { filters, searchParams, filterQueryActions } = useFilterQuery({
    defaultFilters,
    countActiveFilters: countActiveOfferFilters
  })

  const getOffers = useCallback(
    (params?: GetOffersParams) =>
      userService.getBookmarkedOffers(userId, params),
    [userId]
  )

  const {
    response: offersResponse,
    loading: offersLoading,
    fetchData
  } = useAxios<GetOffersResponse, GetOffersParams>({
    service: getOffers,
    defaultResponse: { items: [], count: 0 },
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

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    filterQueryActions.updateFiltersInQuery({ page })
  }

  if (offersLoading)
    return (
      <PageWrapper>
        <Loader pageLoad />
      </PageWrapper>
    )

  return (
    <PageWrapper>
      {items.length ? (
        <>
          <Typography sx={styles.title}>
            {t('bookmarkedOffers.title')}
          </Typography>
          <Box sx={styles.offersSection}>
            <OfferContainer
              offerCards={items}
              updateOffersInfo={updateInfo}
              viewMode={CardsViewEnum.Inline}
            />
          </Box>
          <AppPagination
            onChange={handlePageChange}
            page={Number(filters.page)}
            pageCount={pageCount}
            size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
            sx={styles.pagination(offersLoading || !offersCount)}
          />
        </>
      ) : (
        <>
          <TitleWithDescription
            description={t('bookmarkedOffers.notFound.description')}
            style={styles.titleWithDescription}
            title={t('bookmarkedOffers.notFound.title')}
          />
          <AppButton
            onClick={() => navigate(authRoutes.findOffers.path)}
            size={SizeEnum.ExtraLarge}
            sx={styles.button}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.goToOffers')}
          </AppButton>
        </>
      )}
    </PageWrapper>
  )
}

export default BookmarkedOffers
