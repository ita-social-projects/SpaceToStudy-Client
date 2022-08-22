import { ThemeProvider } from '@mui/material'
import { ModalProvider } from './context/modal-context'
import { ConfirmationDialogProvider } from './context/confirm-context'
import AppContent from '~/containers/app-content/AppContent'
import useHashScroll from '~/hooks/use-hash-scroll'

import { theme } from './styles/app-theme/custom-mui.styles'

const App = () => {
  useHashScroll()

  return (
    <div className='App'>
      <ThemeProvider theme={ theme }>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <AppContent />
          </ModalProvider>
        </ConfirmationDialogProvider>
      </ThemeProvider>
    </div>
  )
}
export default App
