import AppHeader from '~/containers/layout/AppHeader'
import AppMain from '~/containers/layout/AppMain'
import { ThemeProvider } from '@mui/material'
import theme from './styles/custom-mui.styles'

const App = () => (
  <div className="App">
    <ThemeProvider theme={ theme }>
      <AppHeader />
      <AppMain />
    </ThemeProvider>
  </div>
)

export default App
