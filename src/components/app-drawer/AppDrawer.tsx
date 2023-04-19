import { FC } from 'react'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import CloseRounded from '@mui/icons-material/CloseRounded'

import useConfirm from '~/hooks/use-confirm'

import { styles } from '~/components/app-drawer/AppDrawer.styles'

interface AppDrawerProps extends DrawerProps {
  closeIcon?: boolean
  onClose: () => void
}

const AppDrawer: FC<AppDrawerProps> = ({
  children,
  onClose,
  anchor = 'right',
  open,
  closeIcon = true,
  ...props
}) => {
  const { checkConfirmation } = useConfirm()

  const handleCloseDrawer = async () => {
    const confirmed = checkConfirmation({
      message: 'questions.unsavedChanges',
      title: 'titles.confirmTitle'
    })
    if (await confirmed) {
      onClose()
    }
  }

  return (
    <Drawer
      PaperProps={{ sx: styles.root }}
      anchor={anchor}
      onClose={() => void handleCloseDrawer()}
      open={open}
      {...props}
    >
      {closeIcon && (
        <IconButton
          onClick={() => void handleCloseDrawer()}
          sx={styles.closeButton}
        >
          <CloseRounded sx={styles.closeIcon} />
        </IconButton>
      )}
      {children}
    </Drawer>
  )
}

export default AppDrawer
