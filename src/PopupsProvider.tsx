import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'

import { FC, ReactElement } from 'react'

interface PopupsProvider {
  children: ReactElement
}

const PopupsProvider: FC<PopupsProvider> = ({ children }) => {
  return (
    <SnackBarProvider>
      <ConfirmationDialogProvider>
        <ModalProvider>{children}</ModalProvider>
      </ConfirmationDialogProvider>
    </SnackBarProvider>
  )
}

export default PopupsProvider
