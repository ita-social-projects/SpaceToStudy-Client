import { vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import FindBlock from '~/components/find-block/FindBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
import { renderWithProviders } from '~tests/test-utils'

import { translationKey } from '~/components/find-block/find-student-constants'

const mockNavigate = vi.fn()

vi.mock('~/hooks/use-breakpoints')
vi.mock('react-router', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

const mockState = {
  appMain: { userRole: 'tutor' }
}

describe('FindBlock test', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }

  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    renderWithProviders(<FindBlock translationKey={translationKey} />, {
      preloadedState: mockState
    })
  })

  it('should render image for desktop window size', async () => {
    const img = screen.getByAltText('icon')

    expect(img).toBeInTheDocument()
  })

  it('should navigate if press enter', async () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(mockNavigate).toHaveBeenCalled()
  })
})
