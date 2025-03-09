import { beforeEach, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import CooperationClosureDeclinedBanner from '~/containers/my-cooperations/cooperation-closure-declined-banner/CooperationClosureDeclinedBanner'

const userName = 'John Doe'

const userMessage = 'You forgot to add the material.'

const mockOnSend = vi.fn()

vi.mock('react-i18next', () => ({
  Trans: ({ i18nKey }) => i18nKey,
  useTranslation: () => ({
    t: (key) => key
  })
}))
describe('CooperationClosureDeclinedBanner', () => {
  beforeEach(() => {
    render(
      <CooperationClosureDeclinedBanner
        message={userMessage}
        onSend={mockOnSend}
        user={userName}
      />
    )
  })

  it('should render input field on resend button click', () => {
    const resendButton = screen.getByText(
      'cooperationDetailsPage.resendRequestBtn'
    )
    expect(resendButton).toBeInTheDocument()
    fireEvent.click(resendButton)

    const inputLabel = screen.getByText(
      'cooperationDetailsPage.responseInputFieldLabel'
    )
    expect(inputLabel).toBeInTheDocument
  })

  it('should render user message', async () => {
    const messageText = screen.getByText(userMessage)
    expect(messageText).toBeInTheDocument()
  })

  it('should call onResend on submit message button click', () => {
    const resendButton = screen.getByText(
      'cooperationDetailsPage.resendRequestBtn'
    )
    expect(resendButton).toBeInTheDocument()

    fireEvent.click(resendButton)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, {
      target: { value: 'Sorry, I have added material that I promised.' }
    })

    const submitButton = screen.getByText('cooperationDetailsPage.submitBtn')
    fireEvent.click(submitButton)

    expect(mockOnSend).toHaveBeenCalled()
  })
})
