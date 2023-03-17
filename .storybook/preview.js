import '../src/styles/index.css'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '~/styles/app-theme/custom-mui.styles'
import i18n from '~/plugins/i18n'
import { I18nextProvider } from 'react-i18next'

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
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </ThemeProvider>
  )
]
