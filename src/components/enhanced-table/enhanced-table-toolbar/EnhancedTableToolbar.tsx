import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { styles } from './EnhancedTableToolbar.styles'
import { TableActionFunc } from '~/types'

interface BulkAction {
  title: string
  func: TableActionFunc
  icon: ReactNode
}

interface EnhancedTableToolbarProps {
  refetchData: () => void
  itemIds: string[]
  bulkActions: BulkAction[]
}

const EnhancedTableToolbar = ({
  refetchData,
  itemIds,
  bulkActions
}: EnhancedTableToolbarProps) => {
  const { t } = useTranslation()

  const onAction = async (actionFunc: TableActionFunc) => {
    await actionFunc(itemIds)
    refetchData()
  }

  const actionButtons = bulkActions.map(({ title, func, icon }) => (
    <Tooltip key={title} placement='top' title={title}>
      <IconButton onClick={() => void onAction(func)}>{icon}</IconButton>
    </Tooltip>
  ))

  return (
    <Box sx={styles.root}>
      <Typography
        component='div'
        data-testid='amountOfSelected'
        sx={styles.selected}
      >
        {`${itemIds.length} ${t('table.selected')}`}
      </Typography>

      {actionButtons}
    </Box>
  )
}

export default EnhancedTableToolbar
