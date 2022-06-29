import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'
import { ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import { theme } from '~/styles/app-theme/custom-mui.styles'


export const renderWithProviders = (
  ui,
  { 
    preloadedState,
    store = configureStore({ reducer: { appMain: reducer }, preloadedState }),
    ...renderOptions 
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter>
      <Provider store={ store }>
        <ThemeProvider theme={ theme }>
          { children }
        </ThemeProvider>
      </Provider>
    </MemoryRouter>
  )
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
