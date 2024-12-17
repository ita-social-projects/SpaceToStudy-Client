import { Outlet } from 'react-router-dom'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { ChatProvider } from '~/context/chat-context'
import { theme } from './styles/app-theme/custom-mui.styles'
import QueryProvider from '~/QueryProvider'
import PopupsProvider from './PopupsProvider'

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryProvider>
          <PopupsProvider>
            <ChatProvider>
              <Outlet />
            </ChatProvider>
          </PopupsProvider>
        </QueryProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
export default App
