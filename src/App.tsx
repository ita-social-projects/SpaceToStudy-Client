import { Outlet } from 'react-router-dom'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { ChatProvider } from '~/context/chat-context'
import { theme } from './styles/app-theme/custom-mui.styles'
import PopupsProvider from './PopupsProvider'

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <PopupsProvider>
          <ChatProvider>
            <Outlet />
          </ChatProvider>
        </PopupsProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
export default App
