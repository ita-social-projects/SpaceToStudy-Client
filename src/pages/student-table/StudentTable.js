import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import { columns, rowPropsArr, tabLabels } from './constants'

import { styles } from './StudentTable.styles'

const StudentTable = () => {
  const { t } = useTranslation()

  const initialFilters = { isFirstLogin: [], isEmailConfirmed: null }

  const deleteFunction = useCallback((userId) => userService.deleteUser(userId), [])
  const { fetchData: deleteUser } = useAxios({ service: deleteFunction, fetchOnMount: false })

  const deleteAllFunction = useCallback((userIds) => userService.deleteUsers(userIds), [])
  const { fetchData: deleteUsers } = useAxios({ service: deleteAllFunction, fetchOnMount: false })

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

  return (
    <Box sx={ styles.root }>
      <Typography sx={ styles.header } variant='h4'>
        { t('studentTable.studentsTab') }
      </Typography>
      <EnhancedTable
        bulkActions={ bulkActions }
        columns={ columns(t) }
        fetchService={ userService.getUsers }
        initialFilters={ initialFilters }
        initialSort={ { order: 'asc', orderBy: 'email' } }
        isSelection
        rowActions={ rowActions }
        rowPropsArr={ rowPropsArr }
        tabLabels={ tabLabels }
      />
    </Box>
  )
}

export default StudentTable
