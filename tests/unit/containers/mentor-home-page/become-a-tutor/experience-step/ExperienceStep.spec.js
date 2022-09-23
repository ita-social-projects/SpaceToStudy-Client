import { fireEvent, render, screen } from '@testing-library/react'
import BecomeATutor from '~/containers/tutor-home-page/become-a-tutor/BecomeATutor'

describe('Experience page test', () => {
  beforeEach(() => {
    render(<BecomeATutor />)
    fireEvent.click(screen.getByText(/Experience/i))
  })

  it('should render with title', () => {
    const title = screen.getByText(/becomeTutor.experience.title/i)

    expect(title).toBeInTheDocument()
  })

  it('should show error for short text', () => {
    const textField = screen.getByRole('textbox')
    fireEvent.change(textField, {
      target: { value: 'New value' }
    })
    fireEvent.blur(textField)
    const shortTextError = screen.getByText(/common.errorMessages.shortText/i)

    expect(shortTextError).toBeInTheDocument()
  })

  it('should show error for long text', () => {
    const textField = screen.getByRole('textbox')
    fireEvent.change(textField, {
      target: { value: 'Some experience.'.repeat(100) }
    })
    fireEvent.blur(textField)
    const longTextError = screen.getByText(/common.errorMessages.longText/i)

    expect(longTextError).toBeInTheDocument()
  })
})
