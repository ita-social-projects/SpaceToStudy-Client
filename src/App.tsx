import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { SnackBarProvider } from '~/context/snackbar-context'
import { ChatProvider } from '~/context/chat-context'

import { theme } from './styles/app-theme/custom-mui.styles'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <ChatProvider>
              <Outlet />
            </ChatProvider>
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackBarProvider>
    </ThemeProvider>
  )
}
export default App
