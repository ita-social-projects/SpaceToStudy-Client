import { FC } from 'react'

import Drawer, { DrawerProps } from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import CloseRounded from '@mui/icons-material/CloseRounded'

import { styles } from '~/components/app-drawer/AppDrawer.styles'

interface AppDrawerProps extends DrawerProps{
    closeIcon?: boolean,
    onClose: () => void
}

const AppDrawer:FC<AppDrawerProps> = ({ children, onClose, anchor = 'right', closeIcon = true, ...props }) => {

  return (
    <Drawer anchor={ anchor } onClose={ onClose } { ...props }>
      { closeIcon &&  (
        <IconButton onClick={ onClose } sx={ styles.closeButton }>
          <CloseRounded />
        </IconButton>) }
      { children }
    </Drawer>
  )
}

export default AppDrawer
