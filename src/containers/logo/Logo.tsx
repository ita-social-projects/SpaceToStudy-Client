import { FC } from 'react'
import logo from '~/assets/logo.svg'
import logoLight from '~/assets/logo-light.svg'
import Box, { BoxProps } from '@mui/material/Box'
import { ComponentEnum } from '~/types'

interface LogoProps extends BoxProps {
  light?: boolean
}

const Logo: FC<LogoProps> = ({ light = false, ...props }) => (
  <Box
    alt='logo'
    component={ComponentEnum.Img}
    src={light ? logoLight : logo}
    {...props}
  />
)

export default Logo
