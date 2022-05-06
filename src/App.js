import AppHeader from '~/containers/layout/AppHeader'
import AppMain from '~/containers/layout/AppMain'
import { ThemeProvider } from '@mui/material'
import theme from './styles/custom-mui.styles'
import { ModalProvider } from './context/modal-context'
import { ConfirmationDialogProvider } from './context/confirm-context'

const App = () => (
  <div className="App">
    <ThemeProvider theme={ theme }>
      <ConfirmationDialogProvider>
        <ModalProvider>
          <AppHeader />
          <AppMain />
        </ModalProvider>
      </ConfirmationDialogProvider>
    </ThemeProvider>
  </div>
)

export default App
