import { FC, useEffect, useState } from 'react'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import CloseRounded from '@mui/icons-material/CloseRounded'

import useConfirm from '~/hooks/use-confirm'
import { useDebounce } from '~/hooks/use-debounce'

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
  const [drawerOpen, setDrawerOpen] = useState(open)
  const { checkConfirmation } = useConfirm()

  useEffect(() => {
    setDrawerOpen(open)
  }, [open])

  const debouncedClose = useDebounce(onClose, 300)

  const handleCloseDrawer = async () => {
    const confirmed = await checkConfirmation({
      message: 'questions.unsavedChanges',
      title: 'titles.confirmTitle'
    })

    if (confirmed) {
      setDrawerOpen(false)
      debouncedClose()
    }
  }

  return (
    <Drawer
      PaperProps={{ sx: styles.root }}
      anchor={anchor}
      onClose={handleCloseDrawer}
      open={drawerOpen}
      {...props}
    >
      {closeIcon && (
        <IconButton onClick={handleCloseDrawer} sx={styles.closeButton}>
          <CloseRounded sx={styles.closeIcon} />
        </IconButton>
      )}
      {children}
    </Drawer>
  )
}

export default AppDrawer
