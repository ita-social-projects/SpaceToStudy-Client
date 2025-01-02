import { expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import CooperationActionInput from '~/containers/my-cooperations/cooperation-action-input/CooperationActionInput'

const inputProps = {
  inputLabel: 'Input Label',
  inputPlaceholderMessage: 'Input Placeholder',
  isInputShown: true,
  onReasonSubmit: vi.fn(),
  setIsInputShown: vi.fn()
}

const inputMessage = 'Sorry, I have added material that I promised.'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))
describe('CooperationActionInput', () => {
  it('should render input field when isInputShown is true', () => {
    render(<CooperationActionInput {...inputProps} />)

    expect(
      screen.getByPlaceholderText(inputProps.inputPlaceholderMessage)
    ).toBeInTheDocument()
  })

  it('should render confirmation message when isReasonSubmitted is true and input is hidden', () => {
    render(
      <CooperationActionInput
        {...inputProps}
        isInputShown={false}
        isReasonSubmitted
      />
    )
    expect(
      screen.getByText('cooperationDetailsPage.submitMessage')
    ).toBeInTheDocument()
  })

  it('should show validation error for empty input', async () => {
    render(<CooperationActionInput {...inputProps} />)

    const submitButton = screen.getByText('cooperationDetailsPage.submitBtn')
    fireEvent.click(submitButton)

    const errorMessage = await screen.findByText(
      'cooperationDetailsPage.inputError'
    )
    expect(errorMessage).toBeInTheDocument()
  })

  it('should handle onReasonSubmit', async () => {
    render(<CooperationActionInput {...inputProps} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, {
      target: { value: inputMessage }
    })

    const submitButton = screen.getByText('cooperationDetailsPage.submitBtn')
    fireEvent.click(submitButton)

    expect(inputProps.onReasonSubmit).toHaveBeenCalled()
  })
})
