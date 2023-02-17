import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'
import { ThemeProvider} from '@mui/material/styles'
import { render } from '@testing-library/react'
import { theme } from '~/styles/app-theme/custom-mui.styles'
import { vi } from 'vitest'

export const renderWithProviders = (
  ui,
  {
    initialEntries = '/',
    preloadedState,
    store = configureStore({ reducer: { appMain: reducer }, preloadedState }),
    ...renderOptions
  } = {}
) => {
  const router = (element) =>
    createMemoryRouter(createRoutesFromElements(<Route element={ element } path='/*' />), {
      initialEntries: [initialEntries]
    })

  const Wrapper = ({ children }) => (
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <RouterProvider router={ router(children) } />
      </ThemeProvider>
    </Provider>
  )
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export const getFakeTestEvent = (key, value) => ({ preventDefault: vi.fn(), target: { [key]: value } })
