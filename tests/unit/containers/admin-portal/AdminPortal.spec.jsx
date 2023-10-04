import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import { routerConfig } from '~/router/router'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '~/styles/app-theme/custom-mui.styles'
import { beforeEach, expect } from 'vitest'

const renderWithRouter = (initialEntries, preloadedState) => {
  const store = configureStore({
    reducer: { appMain: reducer },
    preloadedState
  })
  const router = createMemoryRouter(createRoutesFromElements(routerConfig), {
    initialEntries: [initialEntries]
  })

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

describe('Admin Portal tests', () => {
  beforeEach(() => {
    const preloadState = { appMain: { userRole: 'admin' } }
    const path = '/admin'
    renderWithRouter(path, preloadState)
  })

  it('should render loader', () => {
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should have admin nav bar', () => {
    const adminNavBar = screen.getByTestId('AdminNavBar')
    expect(adminNavBar).toBeInTheDocument()
  })

  it('should render admin home data as default', async () => {
    const adminPagePlaceholder = await screen.findByText('Hello Admin!')
    await waitFor(() => expect(adminPagePlaceholder).toBeInTheDocument())
  })
})
