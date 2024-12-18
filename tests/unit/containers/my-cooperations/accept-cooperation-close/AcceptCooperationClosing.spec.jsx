import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import AcceptCooperationClosing from '~/containers/my-cooperations/accept-cooperation-close/AcceptCooperationClosing'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))
describe('AcceptCooperationClosing', () => {
  const mockOnAccept = vi.fn()
  const mockOnDecline = vi.fn()

  beforeEach(() => {
    render(
      <AcceptCooperationClosing
        user='John Doe'
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
      />
    )
  })

  it('should render the title correctly', () => {
    const titleText = screen.getByText('titles.acceptCooperationClosing')
    expect(titleText).toBeInTheDocument()
  })

  it('should render input field when decline button is clicked', () => {
    const declineBtn = screen.getByText('cooperationDetailsPage.declineBtn')
    fireEvent.click(declineBtn)
    expect(declineBtn).toBeInTheDocument()

    const inputLabel = screen.getByText(
      'cooperationDetailsPage.InputFieldLabel'
    )
    expect(inputLabel).toBeInTheDocument()
  })

  it('should show error message when submitting empty input', () => {
    const declineBtn = screen.getByText('cooperationDetailsPage.declineBtn')
    fireEvent.click(declineBtn)

    const submitBtn = screen.getByText('cooperationDetailsPage.submitBtn')
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    const errorMessage = screen.getByText('cooperationDetailsPage.inputError')
    expect(errorMessage).toBeInTheDocument()
  })
})
