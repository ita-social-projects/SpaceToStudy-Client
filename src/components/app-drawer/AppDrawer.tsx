import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import CloseRounded from '@mui/icons-material/CloseRounded'

import useConfirm from '~/hooks/use-confirm'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { styles } from '~/components/app-drawer/AppDrawer.styles'
import { PositionEnum } from '~/types'
import { spliceSx } from '~/utils/helper-functions'

interface AppDrawerProps extends Omit<DrawerProps, 'anchor'> {
  children: ReactNode
  closeIcon?: boolean
  onClose: () => void
  anchor?:
    | DrawerProps['anchor']
    | Exclude<PositionEnum, 'start' | 'vertical' | 'end' | 'center'>
}

const AppDrawer: FC<AppDrawerProps> = ({
  children,
  onClose,
  anchor = PositionEnum.Right,
  closeIcon = true,
  sx,
  ...props
}) => {
  const { t } = useTranslation()

  const { checkConfirmation } = useConfirm()

  const handleCloseDrawer = async () => {
    const confirmed = checkConfirmation({
      message: 'questions.discardChanges',
      title: 'titles.discardOffer',
      confirmButton: t('common.discard'),
      cancelButton: t('common.cancel')
    })
    if (await confirmed) {
      onClose()
    }
  }

  return (
    <Drawer
      PaperProps={{ sx: spliceSx(styles.root, sx) }}
      anchor={anchor}
      onClose={() => void handleCloseDrawer()}
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
