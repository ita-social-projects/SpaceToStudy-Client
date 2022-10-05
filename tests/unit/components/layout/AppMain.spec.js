import { render, screen } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import AppMain from '~/containers/layout/app-main/AppMain'
import { theme } from '~/styles/app-theme/custom-mui.styles'

const mockState = {
  appMain: { loading: true, userRole: '' }
}

const mockDispatch = jest.fn()

jest.mock('~/services/local-storage-service')

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn()
}))

describe('AppMain layout component test', () => {
  it('should render loader', () => {
    useSelector.mockImplementation((fn) => fn(mockState))
    render(
      <MemoryRouter>
        <ThemeProvider theme={ theme }>
          <AppMain />
        </ThemeProvider>
      </MemoryRouter>
    )
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('should render StudentLayout', async () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: 'student'
    }))
    render(
      <ThemeProvider theme={ theme }>
        <MemoryRouter>
          <AppMain />
        </MemoryRouter>
      </ThemeProvider>
    )

    const studentHome = await screen.findByTestId('studentHome')

    expect(studentHome).toBeInTheDocument()
  })

  it('should render TutorLayout', async () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: 'tutor'
    }))
    render(
      <MemoryRouter>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <ThemeProvider theme={ theme }>
              <AppMain />
            </ThemeProvider>
          </ModalProvider>
        </ConfirmationDialogProvider>
      </MemoryRouter>
    )

    const tutorHome = await screen.findByTestId('tutorHome')

    expect(tutorHome).toBeInTheDocument()
  })

  it('should render AdminLayout', async () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: 'admin'
    }))
    render(
      <MemoryRouter>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <ThemeProvider theme={ theme }>
              <AppMain />
            </ThemeProvider>
          </ModalProvider>
        </ConfirmationDialogProvider>
      </MemoryRouter>
    )

    const adminHome = await screen.findByText(/Hello Admin!/)

    expect(adminHome).toBeInTheDocument()
  })

  it('should render GuestLayout', async () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: ''
    }))
    render(
      <ModalProvider>
        <MemoryRouter>
          <ThemeProvider theme={ theme }>
            <AppMain />
          </ThemeProvider>
        </MemoryRouter>
      </ModalProvider>
    )

    const guestHome = await screen.findByTestId('guestHome')

    expect(guestHome).toBeInTheDocument()
  })

  it('should render AuthPolicy page if the path with role and user role do not match', async () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: 'tutor'
    }))
    render(
      <ModalProvider>
        <MemoryRouter initialEntries={ ['/student'] }>
          <ThemeProvider theme={ theme }>
            <AppMain />
          </ThemeProvider>
        </MemoryRouter>
      </ModalProvider>
    )

    const errorTitle = await screen.findByText(/errorPage.401.title/)

    expect(errorTitle).toBeInTheDocument()
  })

  it('should dispatch checkAuth if accessToken exists in localStorage', async () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: ''
    }))
    render(
      <ModalProvider>
        <MemoryRouter>
          <ThemeProvider theme={ theme }>
            <AppMain />
          </ThemeProvider>
        </MemoryRouter>
      </ModalProvider>
    )

    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })
})
