import { IconButtonProps } from '@mui/material'
import React from 'react'
import { IconButtonVariant, SizeEnum } from '~/types'
import AddIcon from '@mui/icons-material/Add'
import { IconButton as MuiIconButton } from '@mui/material'
import './IconButton.scss'
interface S2SIconButtonProps extends Omit<IconButtonProps, 'size'> {
  variant?: IconButtonVariant
  size?: SizeEnum.Small | SizeEnum.Medium | SizeEnum.Large | SizeEnum.ExtraLarge
  loading?: boolean
  disabled?: boolean
}

export const IconButton: React.FC<S2SIconButtonProps> = ({
  variant = IconButtonVariant.Primary,
  size = SizeEnum.ExtraLarge,
  loading = false,
  disabled = false,
  ...props
}) => {
  const classNamesContainerIconBG = [
    's2s-icon-button',
    `s2s-icon-button--${size}`,
    `s2s-icon-button--${variant}`
  ].join(' ')
  const classNamesContainerIcon = [
    's2s-icon',
    `s2s-icon--${size}`,
    `s2s-icon--${variant}`
  ].join(' ')
  return (
    <MuiIconButton
      className={classNamesContainerIconBG}
      disabled={loading || disabled}
      {...props}
    >
      <AddIcon className={classNamesContainerIcon} />
    </MuiIconButton>
  )
}
