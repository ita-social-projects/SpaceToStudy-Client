import { useTranslation } from 'react-i18next'
import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

import Tab from '~/components/tab/Tab'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import { columns, tabsInfo } from './constants'

import { styles } from './StudentTable.styles'

const StudentTable = () => {
  const { t } = useTranslation()

  const [externalFilter, setExternalFilter] = useState({ isEmailConfirmed: null })

  const initialFilters = { isFirstLogin: [] }

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

  const tabs = Object.values(tabsInfo).map((tab) => (
    <Tab
      activeTab={ externalFilter.isEmailConfirmed } key={ tab.label } setTab={ setExternalFilter }
      tab={ tab }
    />
  ))

  const props = {
    bulkActions,
    columns,
    fetchService: userService.getUsers,
    initialFilters,
    initialSort: { order: 'asc', orderBy: 'email' },
    isSelection: true,
    rowActions,
    externalFilter,
    tabs
  }

  return (
    <Box sx={ styles.root }>
      <Typography sx={ styles.header } variant='h4'>
        { t('studentTable.studentsTab') }
      </Typography>
      { tabsInfo[externalFilter.isEmailConfirmed].component(props) }
    </Box>
  )
}

export default StudentTable
