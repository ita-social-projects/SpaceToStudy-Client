import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../src/styles/app-theme/custom-mui.styles'
import i18n from '../src/plugins/i18n'
import { I18nextProvider } from 'react-i18next'
import type { Preview } from '@storybook/react'

import '../src/styles/index.css'
import '../src/scss/styles.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    )
  ]
}

export default preview
