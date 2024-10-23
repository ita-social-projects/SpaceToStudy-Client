import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppPagination from '~/components/app-pagination/AppPagination'
import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TabFilterList from '~/components/tab-filter-list/TabFilterList'
import CooperationOfferToolbar from '~/containers/my-cooperations/cooperation-offer-toolbar/CooperationOfferToolbar'
import MyOffersContainer from '~/containers/my-offers/my-offers-container/MyOffersContainer'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'
import { useSearchParams } from 'react-router-dom'
import useFilter from '~/hooks/table/use-filter'
import usePagination from '~/hooks/table/use-pagination'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { OfferService } from '~/services/offer-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import { itemsLoadLimit } from '~/constants'
import { styles } from '~/pages/my-cooperations/MyCooperations.styles'
import {
  defaultResponse,
  initialFilters,
  initialSort,
  sortTranslationKeys,
  tabsInfo
} from '~/pages/my-offers/MyOffers.constants'
import { CardsViewEnum } from '~/types'
import { setPageLoad } from '~/redux/reducer'

type TabName = keyof typeof tabsInfo

const MyOffers = () => {
  const [itemsView, setItemsView] = useState<CardsViewEnum>(
    CardsViewEnum.Inline
  )
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const breakpoints = useBreakpoints()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab')
  const filterOptions = useFilter({
    initialFilters: {
      ...initialFilters,
      status: activeTab ? tabsInfo[activeTab as TabName].value : ''
    }
  })
  const sortOptions = useSort({
    initialSort
  })
  const { page, handleChangePage } = usePagination()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

  const { sort, resetSort } = sortOptions
  const { filters, clearFilters, setFilterByKey } = filterOptions

  const handleOpenDrawer = () => openDrawer()

  useEffect(() => {
    if (!activeTab) setSearchParams({ tab: Object.keys(tabsInfo)[0] })
  }, [activeTab, setSearchParams])

  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const showTable = !breakpoints.isMobile && itemsView === CardsViewEnum.Inline

  const { userId, userRole } = useAppSelector((state) => state.appMain)

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
    defaultResponse
  })

  const handleTabClick = (tabName: string, tabValue: string) => {
    setSearchParams({ tab: tabName })
    clearFilters()
    resetSort()
    setFilterByKey('status')(tabValue)
  }

  const sortFields = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  useLayoutEffect(() => {
    void dispatch(setPageLoad(loading))
  }, [dispatch, loading])

  return (
    <PageWrapper>
      <Box sx={styles.titleBlock}>
        <Typography sx={styles.title}>
          {t(`myOffersPage.title.${userRole}`)}
        </Typography>
        <AppButton onClick={handleOpenDrawer}>
          {t(`myOffersPage.buttonLabel.${userRole}`)}
        </AppButton>
        <AppDrawer onClose={closeDrawer} open={isOpen} sx={styles.drawer}>
          <CreateOffer closeDrawer={closeDrawer} />
        </AppDrawer>
      </Box>
      <TabFilterList
        activeTab={activeTab ?? ''}
        onClick={handleTabClick}
        sx={styles.tabs}
        tabsData={tabsInfo}
      />
      <CooperationOfferToolbar
        filterOptions={filterOptions}
        onChangeView={setItemsView}
        sortFields={sortFields}
        sortOptions={sortOptions}
        view={itemsView}
        withoutSort={showTable}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <>
          <MyOffersContainer
            items={response.items}
            showTable={showTable}
            sort={sortOptions}
          />
          <AppPagination
            onChange={handleChangePage}
            page={page}
            pageCount={Math.ceil(response.count / itemsPerPage)}
            sx={styles.pagination}
          />
        </>
      )}
    </PageWrapper>
  )
}

export default MyOffers
