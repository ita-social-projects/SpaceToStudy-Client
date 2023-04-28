import { FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import EnhancedTableWrapper from '~/components/enhanced-table/enhanced-table-wrapper/EnhancedTableWrapper'
import Tab from '~/components/tab/Tab'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service.js'

import { UserInitialFilters } from '~/types/user-table/types/user-table.types'
import { styles } from '~/components/user-table/UserTable.styles'
import {
  BulkAction,
  Column,
  ExternalFilter,
  InitialSort,
  Options,
  RowAction,
  TabsInfo,
  UserInterface
} from '~/types'

interface UserTableProps {
  role: string
  tabsInfo: TabsInfo<Options<UserInitialFilters>>
  columns: Column<UserInterface>[]
  initialFilters: UserInitialFilters
  initialSort: InitialSort
}

const UserTable: FC<UserTableProps> = ({
  columns,
  initialFilters,
  initialSort,
  role,
  tabsInfo
}) => {
  const { t } = useTranslation()

  const [externalFilter, setExternalFilter] = useState<ExternalFilter>({
    status: 'all',
    role
  })

  const deleteFunction = useCallback(
    (userId: string) => userService.deleteUser(userId),
    []
  )
  const { fetchData: deleteUser } = useAxios({
    service: deleteFunction,
    fetchOnMount: false
  })

  const deleteAllFunction = useCallback(
    (userIds: string[]) => userService.deleteUsers(userIds),
    []
  )
  const { fetchData: deleteUsers } = useAxios({
    service: deleteAllFunction,
    fetchOnMount: false
  })

  const rowActions: RowAction[] = [
    {
      label: t('common.delete'),
      func: deleteUser
    }
  ]

  const bulkActions: BulkAction[] = [
    {
      title: t('common.delete'),
      func: deleteUsers,
      icon: <DeleteIcon color='primary' />
    }
  ]

  const tabs = Object.values(tabsInfo).map((tab) => (
    <Tab<UserInterface, UserInitialFilters>
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
      <EnhancedTableWrapper
        bulkActions={bulkActions}
        columns={columns}
        initialFilters={initialFilters}
        initialSort={initialSort}
        isSelection
        rowActions={rowActions}
      >
        <Box sx={styles.tabs}>{tabs}</Box>
        {tabsInfo[externalFilter.status].component(props)}
      </EnhancedTableWrapper>
    </Box>
  )
}

export default UserTable
