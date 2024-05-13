import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { render, waitFor } from '@testing-library/react'
import { theme } from '~/styles/app-theme/custom-mui.styles'
import PopupsProvider from '~/PopupsProvider'
import cooperationsReducer from '~/redux/features/cooperationsSlice'
import snackbarReducer from '~/redux/features/snackbarSlice'
import AppSnackbar from '~/containers/layout/app-snackbar/AppSnackbar'

import MockAdapter from 'axios-mock-adapter'
import { axiosClient } from '~/plugins/axiosClient'

export const renderWithProviders = (
  ui,
  {
    initialEntries = '/',
    preloadedState,
    store = configureStore({
      reducer: {
        appMain: reducer,
        cooperations: cooperationsReducer,
        snackbar: snackbarReducer
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntries]}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <PopupsProvider>{children}</PopupsProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </MemoryRouter>
    </Provider>
  )
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export const getFakeTestEvent = (key, value) => ({
  preventDefault: vi.fn(),
  target: { [key]: value }
})

export const mockAxiosClient = new MockAdapter(axiosClient)

export const waitForTimeout = (callback, options) => {
  const mergedOptions = { timeout: 5000, ...options }
  return waitFor(callback, mergedOptions)
}

export const TestSnackbar = ({ children }) => (
  <>
    <AppSnackbar />
    {children}
  </>
)
