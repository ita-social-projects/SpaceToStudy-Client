import { ReactNode, ReactElement } from 'react'

import {
  Chip,
  IconButton,
  SvgIconProps,
  Typography,
  TypographyProps
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { SxProps } from '@mui/system'

import { styles } from '~/components/app-chips-list/AppChipsList-styles'

interface AppChipProps {
  handleDelete?: () => void
  children: ReactNode
  icon?: ReactElement<SvgIconProps>
  sx?: SxProps
  labelSx?: SxProps
  labelElementProps?: Omit<TypographyProps, 'sx'>
}

const AppChip: React.FC<AppChipProps> = ({
  handleDelete,
  children,
  icon,
  sx,
  labelSx,
  labelElementProps
}) => {
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
        <Typography
          sx={{ typography: 'subtitle2', ...labelSx }}
          {...labelElementProps}
        >
          {children}
        </Typography>
      }
      onDelete={handleDelete}
      sx={{ ...styles.chip, ...sx }}
    />
  )
}

export default AppChip
