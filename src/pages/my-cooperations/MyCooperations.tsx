import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import useFilter from '~/hooks/table/use-filter'
import Tab from '~/components/tab/Tab'
import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import AppPagination from '~/components/app-pagination/AppPagination'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CooperationToolbar from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'
import { cooperationService } from '~/services/cooperation-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import {
  sortTranslationKeys,
  initialFilters,
  tabsInfo
} from '~/pages/my-cooperations/MyCooperations.constants'
import { defaultResponses, itemsLoadLimit } from '~/constants'
import { TabType } from '~/types'
import { styles } from '~/pages/my-cooperations/MyCooperations.styles'

const MyCooperations = () => {
  const { t } = useTranslation()
  const { page, handleChangePage } = usePagination()
  const breakpoints = useBreakpoints()
  const filterOptions = useFilter({
    initialFilters
  })

  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getMyCooperations = useCallback(
    () =>
      cooperationService.getCooperations({
        ...filterOptions.filters,
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage
      }),

    [filterOptions.filters, page, itemsPerPage]
  )

  const handleTabClick = (tab: TabType<string>) => {
    filterOptions.clearFilters()
    filterOptions.setFilterByKey('status')(tab.value)
  }

  const tabs = Object.values(tabsInfo).map((tab) => (
    <Tab
      activeTab={filterOptions.filters.status === tab.value}
      key={tab.label}
      label={tab.label}
      onClick={() => handleTabClick(tab)}
    />
  ))

  const { loading, response } = useAxios({
    service: getMyCooperations,
    defaultResponse: { items: defaultResponses.array, count: 0 }
  })

  const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  return (
    <PageWrapper>
      <Box sx={styles.titleBlock}>
        <Typography sx={styles.title}>{t('cooperationsPage.title')}</Typography>
        <AppButton component={Link}>{t('button.viewMyOffers')}</AppButton>
      </Box>
      <Box sx={styles.tabs}>{tabs}</Box>
      <CooperationToolbar
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <>
          <CooperationContainer items={response.items} />
          <AppPagination
            onChange={handleChangePage}
            page={page}
            pageCount={Math.ceil(response.count / itemsPerPage)}
          />
        </>
      )}
    </PageWrapper>
  )
}

export default MyCooperations
