import { renderWithProviders } from '~tests/test-utils'
import { Navigate, Outlet, useOutletContext } from 'react-router-dom'
import PrivateRoute from '~/router/helpers/PrivateRoute'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: vi.fn(() => null),
    Outlet: vi.fn(() => null),
    useOutletContext: vi.fn()
  }
})

const contextValue = { context: 'context' }
useOutletContext.mockReturnValue(contextValue)

const properState = {
  appMain: { userRole: 'student' }
}
const inappropriateState = {
  appMain: { usrRole: 'tutor' }
}

describe('PrivateRoute component', () => {
  it('should navigate to error page (no user)', () => {
    renderWithProviders(<PrivateRoute role='student' />)

    expect(Navigate).toHaveBeenCalledWith(
      { replace: true, to: '/error/401' },
      {}
    )
  })

  it('should navigate to error page (inappropriate role)', () => {
    renderWithProviders(<PrivateRoute role='student' />, {
      preloadedState: inappropriateState
    })

    expect(Navigate).toHaveBeenCalledWith(
      { replace: true, to: '/error/401' },
      {}
    )
  })

  it('should render outlet', () => {
    renderWithProviders(<PrivateRoute role='student' />, {
      preloadedState: properState
    })

    expect(Outlet).toHaveBeenCalledWith({ context: contextValue }, {})
  })
})
