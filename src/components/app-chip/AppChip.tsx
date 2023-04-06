import { ReactNode } from 'react'

import { Chip, IconButton, SvgIconProps, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { SxProps } from '@mui/system'

import { styles } from '~/components/app-chips-list/AppChipsList-styles'

interface AppChipProps {
  handleDelete: () => void
  children: ReactNode
  icon: React.ReactElement<SvgIconProps>
  sx?: SxProps
  labelSx?: SxProps
}

const AppChip: React.FC<AppChipProps> = ({
  handleDelete,
  children,
  icon,
  sx,
  labelSx
}) => {
  return (
    <Chip
      data-testid='chip'
      deleteIcon={
        <IconButton
          data-testid='close-btn'
          size='small'
          sx={styles.deleteButton}
        >
          <CloseIcon htmlColor='transparent' />
        </IconButton>
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
