import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { IconButtonProps } from '@mui/material'
import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { ComponentEnum } from '~/types'

type AppIconButtonProps = Omit<IconButtonProps, 'size'> &
  Partial<LinkProps> & {
    size?: 'xs' | 'sm' | 'md' | 'lg'
  }

const AppIconButton: FC<AppIconButtonProps> = ({
  to,
  size = 'md',
  ...props
}) => (
  <IconButton
    component={to ? Link : ComponentEnum.Button}
    size={size}
    to={to}
    {...props}
  />
)

export default AppIconButton
