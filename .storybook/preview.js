import '../src/styles/index.css';
import { ThemeProvider } from '@mui/material'
import { theme } from '~/styles/app-theme/custom-mui.styles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={ theme }>
      <Story />
    </ThemeProvider>
  ),
]

