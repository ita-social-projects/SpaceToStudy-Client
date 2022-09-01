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

  it('should render MentorLayout', async () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: 'mentor'
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

    const mentorHome = await screen.findByTestId('mentorHome')

    expect(mentorHome).toBeInTheDocument()
  })

  it('should render GuestLayout', () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: ''
    }))
    render(
      <ModalProvider>
        <MemoryRouter>
          <AppMain />
        </MemoryRouter>
      </ModalProvider>
    )
    const guestHome = screen.getByTestId('guestHome')

    expect(guestHome).toBeInTheDocument()
  })

  it('should render AuthPolicy page if the path with role and user role do not match', () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: 'mentor'
    }))
    render(
      <ModalProvider>
        <MemoryRouter initialEntries={ ['/student'] }>
          <AppMain />
        </MemoryRouter>
      </ModalProvider>
    )

    const errorTitle = screen.getByText(/errorPage.401.title/)

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
          <AppMain />
        </MemoryRouter>
      </ModalProvider>
    )

    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })
})
