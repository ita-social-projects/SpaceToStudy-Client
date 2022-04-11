import AppHeader from '~/containers/layout/AppHeader'
import AppMain from '~/containers/layout/AppMain'
import { ThemeProvider } from '@mui/material'
import { ModalProvider } from './context/modal-context'

import theme from './styles/app-theme/custom-mui.styles'

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
