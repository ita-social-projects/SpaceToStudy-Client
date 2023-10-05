import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import { routerConfig } from '~/router/router'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '~/styles/app-theme/custom-mui.styles'
import { beforeEach, expect } from 'vitest'

import AdminPortal from '~/containers/layout/admin-portal/AdminPortal'

const renderAdminPortalRouter = (initialEntries, preloadedState) => {
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
        <RouterProvider router={router}>
          <AdminPortal />
        </RouterProvider>
      </ThemeProvider>
    </Provider>
  )
}

describe('Admin Portal tests', () => {
  beforeEach(() => {
    const preloadedState = { appMain: { userRole: 'admin' } }
    const path = '/admin'
    renderAdminPortalRouter(path, preloadedState)
  })

  it('should render loader', () => {
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should have admin nav bar', () => {
    const adminNavBar = screen.getByTestId('AdminNavBar')
    expect(adminNavBar).toBeInTheDocument()
  })
})
