import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import theme from '~/styles/app-theme/custom-mui.styles'

export const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter })
}

export const renderWithTheme = (ui) => {
  return render(ui, { wrapper: () => (
    <ThemeProvider theme={ theme }>
      { ui }
    </ThemeProvider>) 
  })
}
