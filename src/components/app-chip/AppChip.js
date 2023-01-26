import { Chip, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '~/components/app-chips-list/AppChipsList-styles'

const AppChip = ({ handleDelete, children }) => {
  return (
    <Chip
      data-testid='chip'
      deleteIcon={
        <IconButton
          data-testid='close-btn' size='small' sx={ styles.deleteButton }
          variant='plain'
        >
          <CloseIcon color='transparent' />
        </IconButton>
      }
      label={ <Typography variant='body2'>
        { children }
      </Typography> }
      onDelete={ handleDelete }
      sx={ styles.chip }
    />
  )
}

export default AppChip
