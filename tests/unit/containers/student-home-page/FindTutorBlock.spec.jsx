import { screen, fireEvent, render } from '@testing-library/react'
import FindTutorBlock from '~/containers/student-home-page/find-tutor-block/FindTutorBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
import { vi } from 'vitest'

const mockNavigate = vi.fn()

vi.mock('~/hooks/use-breakpoints')
vi.mock('react-router', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('FindTutorBlock test', () => {
  const desktopData = { isDesktop: true, isMobile: false, isTablet: false }

  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    render(<FindTutorBlock />)
  })

  it('should render image for desktop window size', async () => {
    const img = screen.getByAltText('Bag')

    expect(img).toBeInTheDocument()
  })
  it('should navigate if click on find tutor button', async () => {
    const findTutorButton = screen.getByText('studentHomePage.findTutorBlock.button')
    fireEvent.click(findTutorButton)

    expect(mockNavigate).toHaveBeenCalled()
  })
  it('should navigate if press enter', async () => {
    const input = screen.getByLabelText(/studentHomePage.findTutorBlock.label/i)
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(mockNavigate).toHaveBeenCalled()
  })
})
