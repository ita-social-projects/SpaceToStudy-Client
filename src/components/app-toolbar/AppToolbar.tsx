import { ReactNode, FC } from 'react'

import { SxProps } from '@mui/system'
import Box from '@mui/material/Box'

import { styles } from '~/components/app-toolbar/AppToolbar.styles'

interface AppToolbarProps {
  sx: SxProps
  children: ReactNode
}

const AppToolbar: FC<AppToolbarProps> = ({ sx, children }) => {
  return <Box sx={{ ...styles.container, ...sx }}>{children}</Box>
}

export default AppToolbar
