import { useState, useCallback, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import useSort from '~/hooks/table/use-sort'
import useFilter from '~/hooks/table/use-filter'
import useSelect from '~/hooks/table/use-select'
import usePagination from '~/hooks/table/use-pagination'
import Tab from '~/components/tab/Tab'
import EnhancedTableToolbar from '~/components/enhanced-table/enhanced-table-toolbar/EnhancedTableToolbar'
import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

import { styles } from '~/components/user-table/UserTable.styles'
import { VisibilityEnum, GetUsersParams, Sort } from '~/types'

interface UserTableProps {
  columns: unknown[]
  initialFilters: Record<string, unknown>
  initialSort: Sort
  role: string
  tabsInfo: Record<
    string,
    {
      key: string
      label: string
      value: string
      component: (props: unknown) => JSX.Element
    }
  >
}

interface User {
  id: string
  name: string
  status: Record<string, string>
}

const UserTable: React.FC<UserTableProps> = ({
  columns,
  initialFilters,
  initialSort,
  role,
  tabsInfo
}) => {
  const { t } = useTranslation()
  const [itemsCount, setItemsCount] = useState<number | undefined>()
  const [externalFilter, setExternalFilter] = useState<{
    status: string
    role: string
  }>({
    status: 'all',
    role
  })

  const select = useSelect({})
  const sort = useSort({ initialSort })
  const filter = useFilter({ initialFilters })
  const pagination = usePagination({ itemsCount })

  const { selected, clearSelected } = select
  const { filters, clearFilters } = filter
  const { sort: sortParams } = sort
  const { page, rowsPerPage, clearPage } = pagination

  const setItemsResponse = useCallback((response: { count: number }) => {
    setItemsCount(response.count)
  }, [])

  const getUsers = useCallback(
    (params: GetUsersParams) => userService.getUsers(params),
    []
  )

  const deleteFunction = useCallback(
    (userId: string) => userService.deleteUser(userId),
    []
  )

  const deleteAllFunction = useCallback(
    (userIds: string | string[]) =>
      userService.deleteUsers(Array.isArray(userIds) ? userIds : [userIds]),
    []
  )

  const { loading, response, fetchData } = useAxios({
    service: getUsers,
    fetchOnMount: false,
    defaultResponse: { items: [], count: 0 },
    onResponse: setItemsResponse
  })

  const items = response.items.map((item: User) => ({
    ...item,
    status: item.status[role]
  }))

  const getData = useCallback(async () => {
    const status =
      externalFilter.status !== 'all' ? externalFilter.status : undefined
    clearSelected()
    await fetchData({
      skip: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      sort: sortParams,
      ...filters,
      ...externalFilter,
      status: status ?? filters.status
    } as GetUsersParams)
  }, [
    fetchData,
    externalFilter,
    page,
    sortParams,
    rowsPerPage,
    filters,
    clearSelected
  ])

  useLayoutEffect(() => {
    void getData()
  }, [getData])

  useLayoutEffect(() => {
    clearPage()
  }, [filters, rowsPerPage, clearPage, externalFilter])

  const { fetchData: deleteUser } = useAxios({
    service: deleteFunction,
    fetchOnMount: false,
    defaultResponse: null
  })

  const { fetchData: deleteUsers } = useAxios({
    service: deleteAllFunction,
    fetchOnMount: false,
    defaultResponse: null
  })

  const rowActions = [
    {
      label: t('common.delete'),
      func: deleteUser
    }
  ]

  const bulkActions = [
    {
      title: t('common.delete'),
      func: deleteUsers,
      icon: <DeleteIcon color='primary' />
    }
  ]

  const handleTabClick = (tab: { key: string; value: string }) => {
    clearFilters()
    setExternalFilter((prev) => ({ ...prev, [tab.key]: tab.value }))
  }

  const wrappedHandleTabClick = (tab: { key: string; value: string }) => {
    return () => {
      handleTabClick(tab)
    }
  }

  const tabs = Object.values(tabsInfo).map((tab) => (
    <Tab
      activeTab={externalFilter.status === tab.value}
      key={tab.label}
      onClick={wrappedHandleTabClick({ key: tab.key, value: tab.value })}
    >
      {t(tab.label)}
    </Tab>
  ))

  const props = {
    columns,
    isSelection: true,
    rowActions,
    select,
    filter,
    sort,
    rowsPerPage,
    data: { ...response, items, loading, getData }
  }

  const toolbarVisibility =
    selected.length > 0 ? VisibilityEnum.Visible : VisibilityEnum.Hidden

  const handleChangePage = () => {
    return null
  }

  const handleRefetchData = () => {
    void getData()
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.header}>{t(`userTable.${role}sTab`)}</Typography>
      <Box sx={styles.tabs}>{tabs}</Box>
      <Box className={toolbarVisibility}>
        <EnhancedTableToolbar
          bulkActions={bulkActions}
          itemIds={selected}
          refetchData={handleRefetchData}
        />
      </Box>
      {tabsInfo[externalFilter.status].component(props)}
      {!loading && !!items.length && (
        <EnhancedTablePagination
          pagination={{ ...pagination, handleChangePage }}
        />
      )}
    </Box>
  )
}

export default UserTable
