import { ThemeProvider } from '@mui/material'
import { ModalProvider } from './context/modal-context'
import { ConfirmationDialogProvider } from './context/confirm-context'
import { SnackBarProvider } from './context/snackbar-context'
import AppContent from '~/containers/app-content/AppContent'
import useHashScroll from '~/hooks/use-hash-scroll'

import { theme } from './styles/app-theme/custom-mui.styles'

const App = () => {
  useHashScroll()

  return (
    <ThemeProvider theme={ theme }>
      <SnackBarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <AppContent />
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackBarProvider>
    </ThemeProvider>
  )
}
export default App
