import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import PopupDialog from '~/components/popup-dialog/PopupDialog'

const closeModal = jest.fn()

jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    checkConfirmation: () => true
  })
})

describe('Popup dialog test', () => {
  const props = {
    content: 'test',
    closeModal: closeModal
  }

  beforeEach(() => {
    render(<PopupDialog { ...props } />)
  })

  it('should have content text', () => {
    const content = screen.getByText(props.content)

    expect(content).toBeInTheDocument()
  })
  it('should close popup', async () => {
    const closeButton = screen.getByTestId('close-popup')
    fireEvent.click(closeButton)

    await waitFor(() => expect(closeModal).toHaveBeenCalled())
  })
})
