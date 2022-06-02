import { render, screen, fireEvent } from '@testing-library/react'

import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

const mockConfirm = jest.fn()
const mockDismiss = jest.fn()

describe('Confirm dialog test', () => {
  const props = { 
    title: 'title',
    message: 'message',
    open: true,
    onConfirm: mockConfirm,
    onDismiss: mockDismiss 
  }

  beforeEach(() => {
    render(<ConfirmDialog { ...props } />)
  })

  it('should have title text', () => {
    const title = screen.getByText('title')

    expect(title).toBeInTheDocument()
  })
  it('should have message text', () => {
    const message = screen.getByText('message')

    expect(message).toBeInTheDocument()
  })
  it('should confirm', () => {
    const confirmButton = screen.getByText('common.yes')
    fireEvent.click(confirmButton)

    expect(mockConfirm).toHaveBeenCalled()
  })
  it('should dismiss', () => {
    const dismissButton = screen.getByText('common.no')
    fireEvent.click(dismissButton)

    expect(mockDismiss).toHaveBeenCalled()
  })
})
