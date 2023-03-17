import { FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import Tab from '~/components/tab/Tab'
import useAxios from '~/hooks/use-axios'
import { TableProvider } from '~/context/table-context'
import { userService } from '~/services/user-service.js'

import { BulkAction, Column, InitialSort, RowAction, TabsInfo } from '~/types/common/types/common.types'
import { EnhancedTableProps } from '~/types/common/interfaces/common.interfaces'
import { UserExternalFilter, UserInitialFilters, UserOptions } from '~/types/user-table/types/user-table.types'
import { baseColumns, baseInitialFilters, baseInitialSort, baseTabsInfo } from '~/components/base-user-table/constants'
import { styles } from '~/components/base-user-table/BaseUserTable.styles'

interface BaseUserTableProps {
  role: string
  tabsInfo?: TabsInfo<UserExternalFilter, UserOptions>
  columns?: Column<any>[] //TODO add common user type
  initialFilters?: UserInitialFilters
  initialSort?: InitialSort
}

const BaseUserTable: FC<BaseUserTableProps> = ({
  columns = baseColumns,
  initialFilters = baseInitialFilters,
  initialSort = baseInitialSort,
  role,
  tabsInfo = baseTabsInfo
}) => {
  const { t } = useTranslation()

  const [externalFilter, setExternalFilter] = useState<UserExternalFilter>({ status: 'all', role })

  const deleteFunction = useCallback((userId: string) => userService.deleteUser(userId), [])
  const { fetchData: deleteUser } = useAxios({ service: deleteFunction, fetchOnMount: false })

  const deleteAllFunction = useCallback((userIds: string[]) => userService.deleteUsers(userIds), [])
  const { fetchData: deleteUsers } = useAxios({ service: deleteAllFunction, fetchOnMount: false })

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
    <Tab<any, UserInitialFilters, UserExternalFilter, UserOptions>
      activeTab={ externalFilter.status } key={ tab.label } setTab={ setExternalFilter }
      tab={ tab }
    />
  ))

  const props: EnhancedTableProps<UserExternalFilter, UserOptions> = {
    fetchService: userService.getUsers,
    externalFilter
  }

  return (
    <Box sx={ styles.root }>
      <Typography sx={ styles.header } variant='h4'>
        { t(`baseUserTable.${role}sTab`) }
      </Typography>
      <TableProvider<any, UserInitialFilters>
        bulkActions={ bulkActions }
        columns={ columns }
        initialFilters={ initialFilters }
        initialSort={ initialSort }
        isSelection
        rowActions={ rowActions }
      >
        <Box sx={ styles.tabs }>
          { tabs }
        </Box>
        { tabsInfo[externalFilter.status].component(props) }
      </TableProvider>
    </Box>
  )
}

export default BaseUserTable
