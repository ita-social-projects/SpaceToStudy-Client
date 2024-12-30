import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { IconButtonProps } from '@mui/material'
import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { ComponentEnum } from '~/types'

type AppIconButtonProps = Omit<IconButtonProps, 'size'> & Partial<LinkProps>

const AppIconButton: FC<AppIconButtonProps> = ({ to, ...props }) => (
  <IconButton component={to ? Link : ComponentEnum.Button} to={to} {...props} />
)

export default AppIconButton
