import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import useFilter from '~/hooks/table/use-filter'
import Tab from '~/components/tab/Tab'
import AppButton from '~/components/app-button/AppButton'
import AppPagination from '~/components/app-pagination/AppPagination'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CooperationToolbar from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar'
import CooperationContainer from '~/containers/my-cooperations/cooperations-container/CooperationContainer'
import { cooperationService } from '~/services/cooperation-service'

import {
  sortTranslationKeys,
  initialFilters,
  itemsPerPage,
  tabsInfo
} from '~/pages/my-cooperations/MyCooperations.constants'
import { defaultResponses } from '~/constants'
import { ProficiencyLevelEnum, TabType, StatusEnum } from '~/types'
import { styles } from '~/pages/my-cooperations/MyCooperations.styles'

const mockedCoop = {
  _id: 'mockId',
  offer: {
    title:
      'Hello. There are many variations of passages of There are many variations of passages of...asfjtkspe',
    subject: { _id: 'id', name: 'Quantum Mechanics' }
  },
  user: {
    firstName: 'Kathryn',
    lastName: 'Murphy',
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  price: 1800,
  requiredProficiencyLevel: ProficiencyLevelEnum.Beginner,
  status: StatusEnum.Pending,
  createdAt: '2023-05-13T13:44:25.716Z',
  updatedAt: '2023-05-13T13:44:25.716Z'
}

const MyCooperations = () => {
  const { t } = useTranslation()
  const filterOptions = useFilter({
    initialFilters
  })

  const { page, handleChangePage } = usePagination()

  const getMyCooperations = useCallback(
    () =>
      cooperationService.getCooperations({
        ...filterOptions.filters,
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage
      }),

    [filterOptions.filters, page]
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

  const { response } = useAxios({
    service: getMyCooperations,
    defaultResponse: defaultResponses.array
  })

  console.log(response)

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
      <CooperationContainer items={new Array(12).fill(mockedCoop)} />
      <AppPagination onChange={handleChangePage} page={page} pageCount={4} />
    </PageWrapper>
  )
}

export default MyCooperations
