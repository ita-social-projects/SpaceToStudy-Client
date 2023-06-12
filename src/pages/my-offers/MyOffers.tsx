import { useCallback, useState } from 'react'

import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import useFilter from '~/hooks/table/use-filter'
import useSort from '~/hooks/table/use-sort'
import usePagination from '~/hooks/table/use-pagination'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'
import { OfferService } from '~/services/offer-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import {
  initialFilters,
  initialSort,
  button,
  title,
  defaultResponse,
  sortTranslationKeys
} from '~/pages/my-offers/MyOffers.constants'
import { itemsLoadLimit } from '~/constants'
import { CardsViewEnum } from '~/types'

import MyPageWrapper from '~/components/my-page-wrapper/MyPageWrapper'
import AppPagination from '~/components/app-pagination/AppPagination'
import MyOffersContainer from '~/containers/my-offers/my-offers-container/MyOffersContainer'

const MyOffers = () => {
  const [itemsView, setItemsView] = useState<CardsViewEnum>(
    CardsViewEnum.Inline
  )
  const breakpoints = useBreakpoints()
  const { t } = useTranslation()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const filterOptions = useFilter({
    initialFilters
  })
  const sortOptions = useSort({
    initialSort
  })
  const { page, handleChangePage } = usePagination()
  const { filters } = filterOptions
  const { sort } = sortOptions

  const showTable = !breakpoints.isMobile && itemsView === CardsViewEnum.Inline

  const { userId } = useAppSelector((state) => state.appMain)

  const getMyOffers = useCallback(
    () =>
      OfferService.getUsersOffers({
        id: userId,
        sort,
        ...filters,
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage
      }),

    [userId, filters, page, itemsPerPage, sort]
  )

  const { loading, response } = useAxios({
    service: getMyOffers,
    defaultResponse: defaultResponse
  })

  const sortFields = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  return (
    <MyPageWrapper
      button={button}
      filterOptions={filterOptions}
      itemsView={itemsView}
      loading={loading}
      setItemsView={setItemsView}
      sortFields={sortFields}
      sortOptions={sortOptions}
      title={title}
    >
      <MyOffersContainer
        items={response.offers}
        showTable={showTable}
        sort={sortOptions}
      />
      <AppPagination
        onChange={handleChangePage}
        page={page}
        pageCount={Math.ceil(response.count / itemsPerPage)}
      />
    </MyPageWrapper>
  )
}

export default MyOffers
