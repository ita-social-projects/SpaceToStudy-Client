import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { IconButtonProps } from '@mui/material'
import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { ComponentEnum } from '~/types'

type AppIconButtonProps = Omit<IconButtonProps, 'size'> &
  Partial<LinkProps> & {
    size?: 'xs' | 'sm' | 'md' | 'lg'
    toggleAble?: boolean
    isToggled?: boolean
  }

const AppIconButton: FC<AppIconButtonProps> = ({
  to,
  size = 'md',
  toggleAble = false,
  isToggled = false,
  ...props
}) => (
  <IconButton
    component={to ? Link : ComponentEnum.Button}
    isToggled={isToggled}
    size={size}
    to={to}
    toggleAble={toggleAble}
    {...props}
  />
)

export default AppIconButton
