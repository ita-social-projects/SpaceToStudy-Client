import { fireEvent, render, screen } from '@testing-library/react'
import BecomeATutor from '~/containers/mentor-home-page/become-a-tutor/BecomeATutor'

describe('BecomeATutor test', () => {
  beforeEach(() => {
    render(<BecomeATutor />)
  })

  it.skip('should render first tab', () => {
    const firstTab = screen.getByText(/1/i)

    expect(firstTab).toBeInTheDocument()
  })

  it('should render second tab', () => {
    const nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    const secondTab = screen.getByText(/2/i)

    expect(secondTab).toBeInTheDocument()
  })
})
