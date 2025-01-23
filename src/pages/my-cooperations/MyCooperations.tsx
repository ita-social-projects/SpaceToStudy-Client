import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '~/hooks/use-redux'
import usePagination from '~/hooks/table/use-pagination'
import useQuery from '~/hooks/use-query'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useFilter from '~/hooks/table/use-filter'
import Loader from '~/components/loader/Loader'
import Button from '~scss-components/button/Button'
import AppPagination from '~/components/app-pagination/AppPagination'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CooperationOfferToolbar from '~/containers/my-cooperations/cooperation-offer-toolbar/CooperationOfferToolbar'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'
import { cooperationService } from '~/services/cooperation-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import { authRoutes } from '~/router/constants/authRoutes'
import {
  initialFilters,
  initialSort,
  sortTranslationKeys,
  tabsInfo
} from '~/pages/my-cooperations/MyCooperations.constants'
import { itemsLoadLimit } from '~/constants'
import { CardsViewEnum, UserRoleEnum } from '~/types'
import { styles } from '~/pages/my-cooperations/MyCooperations.styles'
import TabFilterList from '~/components/tab-filter-list/TabFilterList'

type TabKey = keyof typeof tabsInfo

const MyCooperations = () => {
  const [itemsView, setItemsView] = useState<CardsViewEnum>(
    CardsViewEnum.Inline
  )
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab')
  const filterOptions = useFilter({
    initialFilters: {
      ...initialFilters,
      status: activeTab ? tabsInfo[activeTab as TabKey].value : ''
    }
  })
  const sortOptions = useSort({
    initialSort
  })
  const { page, handleChangePage } = usePagination()
  const { sort, resetSort } = sortOptions
  const { filters, clearFilters, setFilterByKey } = filterOptions
  const { userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (!activeTab) {
      setSearchParams({ tab: Object.keys(tabsInfo)[0] })
    }
  }, [activeTab, setSearchParams])

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

  const { isFetching, data } = useQuery({
    queryKey: ['cooperations', filters, sort, page],
    queryFn: getMyCooperations,
    options: {
      staleTime: Infinity
    }
  })

  const handleTabClick = (tabName: string, tabValue: string) => {
    clearFilters()
    resetSort()
    setFilterByKey('status')(tabValue)
    setSearchParams({ tab: tabName })
  }

  const sortFields = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  return (
    <PageWrapper>
      <Box sx={styles.titleBlock}>
        <Typography sx={styles.title}>{t('cooperationsPage.title')}</Typography>
        <Button
          component={Link}
          to={
            userRole == UserRoleEnum.Tutor
              ? authRoutes.myOffers.path
              : authRoutes.myRequests.path
          }
        >
          {t(`button.view.${userRole}`)}
        </Button>
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
      {isFetching || !data ? (
        <Loader pageLoad size={50} />
      ) : (
        <>
          <CooperationContainer
            items={data.items}
            showTable={showTable}
            sort={sortOptions}
          />
          <AppPagination
            onChange={handleChangePage}
            page={page}
            pageCount={Math.ceil(data.count / itemsPerPage)}
            sx={styles.pagination}
          />
        </>
      )}
    </PageWrapper>
  )
}

export default MyCooperations
