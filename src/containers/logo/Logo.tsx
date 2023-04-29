import { FC } from 'react'
import logo from '~/assets/logo.svg'
import logoLight from '~/assets/logo-light.svg'
import Box, { BoxProps } from '@mui/material/Box'

interface LogoProps extends BoxProps {
  light?: boolean
}

const Logo: FC<LogoProps> = ({ light = false, ...props }) => (
  <Box
    alt='logo'
    className='Home-logo'
    component='img'
    src={light ? logoLight : logo}
    {...props}
  />
)

export default Logo
