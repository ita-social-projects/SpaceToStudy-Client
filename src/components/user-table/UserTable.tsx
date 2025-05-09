import { useState, useCallback, useLayoutEffect, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import { userService } from '~/services/user-service'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import useSort from '~/hooks/table/use-sort'
import useFilter from '~/hooks/table/use-filter'
import useSelect from '~/hooks/table/use-select'
import usePagination from '~/hooks/table/use-pagination'
import Tab from '~/components/tab/Tab'
import EnhancedTableToolbar from '~/components/enhanced-table/enhanced-table-toolbar/EnhancedTableToolbar'
import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

import { styles } from '~/components/user-table/UserTable.styles'
import { VisibilityEnum, GetUsersParams, Sort, UserResponse } from '~/types'
import { defaultResponses } from '~/constants'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

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
  const { handleSuccessAlert, handleErrorAlert } = useSnackbarAlert()

  const setItemsResponse = useCallback((response: { count: number }) => {
    setItemsCount(response.count)
  }, [])

  const getUsers = useCallback(() => {
    const status =
      externalFilter.status !== 'all' ? externalFilter.status : undefined
    clearSelected()

    return userService.getUsers({
      skip: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      sort: sortParams,
      ...filters,
      ...externalFilter,
      status: status ?? filters.status
    } as GetUsersParams)
  }, [filters, externalFilter, page, rowsPerPage, sortParams, clearSelected])

  const deleteFunction = useCallback(
    (userId: string) => userService.deleteUser(userId),
    []
  )

  const deleteAllFunction = useCallback(
    (userIds: string | string[]) =>
      userService.deleteUsers(Array.isArray(userIds) ? userIds : [userIds]),
    []
  )

  const {
    isLoading,
    data: users = defaultResponses.itemsWithCount,
    refetch: fetchUsers
  } = useQuery({
    queryKey: ['users', filters, externalFilter, sort, page, rowsPerPage],
    queryFn: getUsers,
    options: {
      staleTime: Infinity
    }
  })

  useEffect(() => {
    if (users) setItemsResponse(users)
  }, [users, setItemsResponse])

  const items = users.items.map((item: UserResponse) => ({
    ...item,
    status: item.status[role as keyof typeof item.status]
  }))

  useLayoutEffect(() => {
    clearPage()
  }, [filters, rowsPerPage, clearPage, externalFilter])

  const { mutate: deleteUser } = useMutation({
    queryKey: ['users'],
    mutationFn: deleteFunction,
    onSuccess: () => handleSuccessAlert(t(`userTable.deleteUserSuccess`)),
    onError: handleErrorAlert
  })

  const { mutate: deleteUsers } = useMutation({
    queryKey: ['users'],
    mutationFn: deleteAllFunction,
    onSuccess: () => handleSuccessAlert(t(`userTable.deleteUsersSuccess`)),
    onError: handleErrorAlert
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
    data: { ...users, items, isLoading }
  }

  const toolbarVisibility =
    selected.length > 0 ? VisibilityEnum.Visible : VisibilityEnum.Hidden

  const handleChangePage = () => {
    return null
  }

  const handleRefetchData = () => {
    void fetchUsers()
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
      {!isLoading && !!items.length && (
        <EnhancedTablePagination
          pagination={{ ...pagination, handleChangePage }}
        />
      )}
    </Box>
  )
}

export default UserTable
