import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import AppMain from '~/containers/layout/app-main/AppMain'
import { renderWithProviders } from '~tests/test-utils'

window.scrollTo = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useMatches: () => [{ handle: { crumb: { name: 'home', path: '/' } } }],
    useNavigation: () => ({ state: 'idle' })
  }
})

const mockState = {
  appMain: { loading: true, userRole: '' }
}

const mockDispatch = vi.fn()

vi.mock('~/services/local-storage-service')
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch
  }
})

describe('AppMain layout component test', () => {
  it('should render loader', () => {
    renderWithProviders(<AppMain />, { preloadedState: mockState })
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should dispatch checkAuth if accessToken exists in localStorage', async () => {
    renderWithProviders(<AppMain />, {
      preloadedState: {
        appMain: {
          authLoading: false,
          userRole: ''
        }
      }
    })
    mockDispatch.mock.calls.length = 1
    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })
})
