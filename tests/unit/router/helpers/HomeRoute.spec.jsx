import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import HomeRoute from '~/router/helpers/HomeRoute'

const mockedUseNavigate = vi.fn()
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedUseNavigate
}))

const userId = '63f5d0ebb'
const studentState = {
  appMain: { userRole: 'student', userId }
}
const tutorState = {
  appMain: { userRole: 'tutor', userId }
}
const adminState = {
  appMain: { userRole: 'admin', userId }
}
describe('HomeRoute component', () => {
  it('should render GuestHomePage when there is no userRole', () => {
    renderWithProviders(<HomeRoute />)

    const welcomeDescription = screen.getByText(
      /guestHomePage.welcomeBlock.description/i
    )

    expect(welcomeDescription).toBeInTheDocument()
  })

  it('should navigate to "student" when userRole is corresponding', () => {
    renderWithProviders(<HomeRoute />, {
      preloadedState: studentState
    })

    expect(mockedUseNavigate).toHaveBeenCalledWith('student')
  })

  it('should navigate to "tutor" when userRole is corresponded', () => {
    renderWithProviders(<HomeRoute />, {
      preloadedState: tutorState
    })

    expect(mockedUseNavigate).toHaveBeenCalledWith('tutor')
  })

  it('should navigate to "admin" when userRole is corresponded', () => {
    renderWithProviders(<HomeRoute />, {
      preloadedState: adminState
    })

    expect(mockedUseNavigate).toHaveBeenCalledWith('admin')
  })
})
