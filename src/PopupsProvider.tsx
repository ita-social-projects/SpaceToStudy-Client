import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'

import { FC, ReactElement } from 'react'

interface PopupsProvider {
  children: ReactElement
}

const PopupsProvider: FC<PopupsProvider> = ({ children }) => {
  return (
    <ConfirmationDialogProvider>
      <ModalProvider>{children}</ModalProvider>
    </ConfirmationDialogProvider>
  )
}

export default PopupsProvider
