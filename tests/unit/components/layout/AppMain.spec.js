import { render, screen } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'

import { ModalProvider } from '~/context/modal-context'
import { theme } from '~/styles/app-theme/custom-mui.styles'
import { getFromLocalStorage } from '~/services/local-storage-service'
import AppMain from '~/containers/layout/AppMain'

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

  it('should render StudentLayout', () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: 'student'
    }))
    render(
      <MemoryRouter>
        <AppMain />
      </MemoryRouter>
    )
    const studentLayout = screen.getByTestId('studentHome')

    expect(studentLayout).toBeInTheDocument()
  })

  it('should render MentorLayout', () => {
    useSelector.mockImplementation(() => ({
      loading: false,
      userRole: 'mentor'
    }))
    render(
      <MemoryRouter>
        <AppMain />
      </MemoryRouter>
    )
    const mentorHome = screen.getByTestId('mentorHome')

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

  it('should dispatch checkAuth if accessToken exists in localStorage', async () => {
    getFromLocalStorage.mockImplementation(() => true)
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
