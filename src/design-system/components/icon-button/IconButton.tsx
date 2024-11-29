import { CircularProgress, IconButtonProps } from '@mui/material'
import React, { useState } from 'react'
import { IconButtonVariant } from '~/types'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { IconButton as MuiIconButton } from '@mui/material'
import './IconButton.scss'
interface S2SIconButtonProps extends Omit<IconButtonProps, 'size'> {
  variant?: IconButtonVariant
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  toggleAble?: boolean
}

export const IconButton: React.FC<S2SIconButtonProps> = ({
  variant = IconButtonVariant.Primary,
  size = 'md',
  loading = false,
  disabled = false,
  toggleAble = false,
  ...props
}) => {
  const [isToggled, setIsToggled] = useState<boolean>(false)
  const handleClick = () => {
    if (toggleAble) {
      setIsToggled((prevState) => !prevState)
    }
  }
  const classNamesContainerIconBG = [
    's2s-icon-button',
    `s2s-icon-button--${size}`,
    `s2s-icon-button--${variant}${isToggled ? '-toggle-able' : ''}`
  ].join(' ')
  const classNamesContainerIcon = [
    's2s-icon',
    `s2s-icon--${size}`,
    `s2s-icon--${variant}${isToggled ? '-toggle-able' : ''}`
  ].join(' ')
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
      onClick={handleClick}
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
