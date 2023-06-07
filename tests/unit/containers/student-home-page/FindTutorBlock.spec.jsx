import { vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import FindTutorBlock from '~/containers/student-home-page/find-tutor-block/FindTutorBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
import { renderWithProviders } from '~tests/test-utils'

const mockNavigate = vi.fn()

vi.mock('~/hooks/use-breakpoints')
vi.mock('react-router', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const mockState = {
  appMain: { userRole: 'tutor' }
}

describe('FindTutorBlock test', () => {
  const desktopData = { isDesktop: true, isMobile: false, isTablet: false }

  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    renderWithProviders(<FindTutorBlock />, {
      preloadedState: mockState
    })
  })

  it('should render image for desktop window size', async () => {
    const img = screen.getByAltText('icon')

    expect(img).toBeInTheDocument()
  })

  it('should navigate if press enter', async () => {
    const input = screen.getByPlaceholderText(
      /studentHomePage.findTutorBlock.label/i
    )
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(mockNavigate).toHaveBeenCalled()
  })
})
