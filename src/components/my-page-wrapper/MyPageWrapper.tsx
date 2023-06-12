import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '~/components/tab/Tab'
import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CooperationToolbar from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar'

import { styles } from '~/components/my-page-wrapper/MyPageWrapper.styles'
import { tabsInfo } from '~/pages/my-cooperations/MyCooperations.constants'
import {
  CardsViewEnum,
  MyCooperationsFilters,
  SelectFieldType,
  TabType,
  ButtonActions
} from '~/types'
import { FilterHook } from '~/hooks/table/use-filter'
import { SortHook } from '~/hooks/table/use-sort'

interface MyPageWrapperProps {
  loading: boolean
  children: React.ReactNode
  sortOptions: SortHook
  filterOptions: FilterHook<MyCooperationsFilters>
  title: string
  sortFields: SelectFieldType<string>[]
  button: ButtonActions
  itemsView: CardsViewEnum
  setItemsView: (value: CardsViewEnum) => void
}

const MyPageWrapper: FC<MyPageWrapperProps> = ({
  loading,
  children,
  sortOptions,
  filterOptions,
  title,
  sortFields,
  button,
  itemsView,
  setItemsView
}) => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { filters, clearFilters, setFilterByKey } = filterOptions
  const { resetSort } = sortOptions

  const showTable = !breakpoints.isMobile && itemsView === CardsViewEnum.Inline

  const handleTabClick = (tab: TabType<string>) => {
    clearFilters()
    resetSort()
    setFilterByKey('status')(tab.value)
  }

  const tabs = Object.values(tabsInfo).map((tab) => (
    <Tab
      activeTab={filters.status === tab.value}
      key={tab.label}
      label={tab.label}
      onClick={() => handleTabClick(tab)}
    />
  ))

  return (
    <PageWrapper>
      <Box sx={styles.titleBlock}>
        <Typography sx={styles.title}>{t(title)}</Typography>
        <AppButton {...button.buttonProps}>{t(button.label)}</AppButton>
      </Box>
      <Box sx={styles.tabs}>{tabs}</Box>
      <CooperationToolbar
        filterOptions={filterOptions}
        onChangeView={setItemsView}
        sortFields={sortFields}
        sortOptions={sortOptions}
        view={itemsView}
        withoutSort={showTable}
      />
      {loading ? <Loader pageLoad size={50} /> : <>{children}</>}
    </PageWrapper>
  )
}

export default MyPageWrapper
