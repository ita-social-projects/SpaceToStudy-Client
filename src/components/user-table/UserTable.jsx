import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import { TableProvider } from '~/context/table-context'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import Tab from '~/components/tab/Tab'

import { styles } from '~/components/user-table/UserTable.styles'

const UserTable = ({
  columns,
  initialFilters,
  initialSort,
  role,
  tabsInfo
}) => {
  const { t } = useTranslation()

  const [externalFilter, setExternalFilter] = useState({
    status: 'all',
    role
  })

  const deleteFunction = useCallback(
    (userId) => userService.deleteUser(userId),
    []
  )
  const { fetchData: deleteUser } = useAxios({
    service: deleteFunction,
    fetchOnMount: false,
    defaultResponse: null
  })

  const deleteAllFunction = useCallback(
    (userIds) => userService.deleteUsers(userIds),
    []
  )
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

  const tabs = Object.values(tabsInfo).map((tab) => (
    <Tab
      activeTab={externalFilter.status}
      key={tab.label}
      setTab={setExternalFilter}
      tab={tab}
    />
  ))

  const props = {
    fetchService: userService.getUsers,
    externalFilter
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.header} variant='h4'>
        {t(`userTable.${role}sTab`)}
      </Typography>

      <TableProvider
        bulkActions={bulkActions}
        columns={columns}
        initialFilters={initialFilters}
        initialSort={initialSort}
        isSelection
        rowActions={rowActions}
      >
        <Box sx={styles.tabs}>{tabs}</Box>
        {tabsInfo[externalFilter.status].component(props)}
      </TableProvider>
    </Box>
  )
}

export default UserTable
