import AppHeader from '~/containers/layout/AppHeader'
import AppMain from '~/containers/layout/AppMain'
import { ThemeProvider } from '@mui/material'
import theme from './styles/custom-mui.styles'
import { ModalProvider } from './context/modal-context'

const App = () => (
  <div className="App">
    <ThemeProvider theme={ theme }>
      <ModalProvider>
        <AppHeader />
        <AppMain />
      </ModalProvider>
    </ThemeProvider>
  </div>
)

export default App
