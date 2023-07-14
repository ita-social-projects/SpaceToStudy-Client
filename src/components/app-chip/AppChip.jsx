import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Chip, IconButton, Typography } from '@mui/material'

import { styles } from '~/components/app-chips-list/AppChipsList-styles'

const AppChip = ({ handleDelete, children, icon, sx, labelSx }) => {
  return (
    <Chip
      data-testid='chip'
      deleteIcon={
        handleDelete && (
          <IconButton
            data-testid='close-btn'
            size='small'
            sx={styles.deleteButton}
          >
            <CloseRoundedIcon fontSize='small' />
          </IconButton>
        )
      }
      icon={icon}
      label={
        <Typography sx={{ typography: 'subtitle2', ...labelSx }}>
          {children}
        </Typography>
      }
      onDelete={handleDelete}
      sx={{ ...styles.chip, ...sx }}
    />
  )
}

export default AppChip
