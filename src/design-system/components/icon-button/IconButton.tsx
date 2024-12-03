import {
  CircularProgress,
  IconButtonProps,
  IconButton as MuiIconButton
} from '@mui/material'
import { FC } from 'react'
import { IconButtonVariant } from './IconButton.constants'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { cn } from '~/utils/cn'
import './IconButton.scss'

interface S2SIconButtonProps extends Omit<IconButtonProps, 'size'> {
  variant?: IconButtonVariant
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  toggleAble?: boolean
  isToggled?: boolean
  onClick?: () => void
}

export const IconButton: FC<S2SIconButtonProps> = ({
  variant = IconButtonVariant.Primary,
  size = 'md',
  loading = false,
  disabled = false,
  toggleAble = false,
  isToggled = false,
  onClick,
  ...props
}) => {
  const classNamesContainerIconBG = cn(
    's2s-icon-button',
    `s2s-icon-button--${size}`,
    `s2s-icon-button--${variant}${toggleAble && isToggled ? '-toggle-able' : ''}`
  )
  const classNamesContainerIcon = cn(
    's2s-icon',
    `s2s-icon--${size}`,
    `s2s-icon--${variant}${toggleAble && isToggled ? '-toggle-able' : ''}`
  )
  const loaderSizes = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24
  }

  const loader = (
    <CircularProgress data-testid='loader' size={loaderSizes[size]} />
  )
  return (
    <MuiIconButton
      className={classNamesContainerIconBG}
      disabled={loading || disabled}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        loader
      ) : (
        <AddRoundedIcon className={classNamesContainerIcon} />
      )}
    </MuiIconButton>
  )
}
