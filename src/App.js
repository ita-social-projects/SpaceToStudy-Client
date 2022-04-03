import AppHeader from '~/containers/layout/AppHeader'
import AppMain from '~/containers/layout/AppMain'
import { ThemeProvider } from '@mui/material'
import theme from './styles/custom-mui.styles'
import Layout from '~/components/layout/Layout'

const App = () => (
  <div className="App">
    <ThemeProvider theme={ theme }>
      <Layout>
        { /*Router will be here*/ }
        { /*move AppHeader to Layout.js*/ }
        <AppHeader /> 
        <AppMain />
      </Layout>
    </ThemeProvider>
  </div>
)

export default App
