import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import AppContent from '~/containers/app-content/AppContent'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useMatches: () => [{ handle: { crumb: { name: 'home', path: '/' } } }],
    useNavigation: () => ({ state: 'idle' })
  }
})

describe('AppContent container', () => {
  window.scrollTo = vi.fn()

  it('should render container on the page', () => {
    renderWithProviders(<AppContent />)

    const content = screen.getByTestId('AppContent')

    expect(content).toBeInTheDocument()
  })
})
