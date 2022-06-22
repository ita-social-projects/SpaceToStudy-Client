import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import { theme } from '~/styles/app-theme/custom-mui.styles'

export const renderWithRouterAndTheme = (ui) => {
  return render(ui, { wrapper: () => (
    <MemoryRouter>
      <ThemeProvider theme={ theme }>
        { ui }
      </ThemeProvider>
    </MemoryRouter>) 
  })
}
