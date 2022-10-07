import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { styles } from './EnhancedTableToolbar.styles'

const EnhancedTableToolbar = ({ bulkActions, numSelected, itemIds, refetchData }) => {
  const { t } = useTranslation()

  const onAction = async (actionFunc) => {
    await actionFunc({ itemIds })
    refetchData()
  }

  return (
    <Box sx={ styles.root }>
      <Typography component='div' sx={ styles.selected } variant='subtitle2'>
        { `${numSelected} ${t('table.selected')}` }
      </Typography>

      { bulkActions.map(({ title, func, icon }) => (
        <Tooltip key={ title } placement='top' title={ title }>
          <IconButton onClick={ () => onAction(func) }>
            { icon }
          </IconButton>
        </Tooltip>
      )) }
    </Box>
  )
}

export default EnhancedTableToolbar
