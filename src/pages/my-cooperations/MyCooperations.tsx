import { useCallback, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { setPageLoad } from '~/redux/reducer'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useFilter from '~/hooks/table/use-filter'
import Tab from '~/components/tab/Tab'
import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import AppPagination from '~/components/app-pagination/AppPagination'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CooperationOfferToolbar from '~/containers/my-cooperations/cooperation-offer-toolbar/CooperationOfferToolbar'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'
import { cooperationService } from '~/services/cooperation-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import { authRoutes } from '~/router/constants/authRoutes'
import {
  defaultResponse,
  initialFilters,
  initialSort,
  sortTranslationKeys,
  tabsInfo
} from '~/pages/my-cooperations/MyCooperations.constants'
import { itemsLoadLimit } from '~/constants'
import { CardsViewEnum, TabType, UserRoleEnum } from '~/types'
import { styles } from '~/pages/my-cooperations/MyCooperations.styles'

const MyCooperations = () => {
  const [itemsView, setItemsView] = useState<CardsViewEnum>(
    CardsViewEnum.Inline
  )
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const breakpoints = useBreakpoints()
  const filterOptions = useFilter({
    initialFilters
  })
  const sortOptions = useSort({
    initialSort
  })
  const { page, handleChangePage } = usePagination()
  const { sort, resetSort } = sortOptions
  const { filters, clearFilters, setFilterByKey } = filterOptions
  const { userRole } = useAppSelector((state) => state.appMain)

  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const showTable = !breakpoints.isMobile && itemsView === CardsViewEnum.Inline

  const getMyCooperations = useCallback(
    () =>
      cooperationService.getCooperations({
        ...filters,
        sort,
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        categories: []
      }),
    [filters, page, itemsPerPage, sort]
  )

  const {
    loading,
    response,
    fetchData: getCooperations
  } = useAxios({
    service: getMyCooperations,
    defaultResponse
  })

  const handleTabClick = (tab: TabType<string>) => {
    clearFilters()
    resetSort()
    setFilterByKey('status')(tab.value)
  }

  const tabs = Object.values(tabsInfo).map((tab) => (
    <Tab
      activeTab={filters.status === tab.value}
      key={tab.label}
      onClick={() => handleTabClick(tab)}
    >
      {t(tab.label)}
    </Tab>
  ))

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
        <Typography sx={styles.title}>{t('cooperationsPage.title')}</Typography>
        <AppButton
          component={Link}
          to={
            userRole == UserRoleEnum.Tutor
              ? authRoutes.myOffers.path
              : authRoutes.myRequests.path
          }
        >
          {t(
            `button.view.${
              userRole == UserRoleEnum.Tutor ? 'viewMyOffers' : 'viewMyRequests'
            }`
          )}
        </AppButton>
      </Box>
      <Box sx={styles.tabs}>{tabs}</Box>
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
          <CooperationContainer
            getCooperations={getCooperations}
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

export default MyCooperations
