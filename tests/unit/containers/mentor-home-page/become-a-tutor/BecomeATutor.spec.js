import { fireEvent, render, screen } from '@testing-library/react'
import BecomeATutor from '~/containers/mentor-home-page/become-a-tutor/BecomeATutor'

describe('BecomeATutor test', () => {
  beforeEach(() => {
    render(<BecomeATutor />)
  })

  it('should render first tab', () => {
    const firstTab = screen.getByText(/becomeTutor.firstStep.title/i)

    expect(firstTab).toBeInTheDocument()
  })

  it('should render second tab', () => {
    const nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    const secondTab = screen.getByText(/2/i)

    expect(secondTab).toBeInTheDocument()
  })
})
