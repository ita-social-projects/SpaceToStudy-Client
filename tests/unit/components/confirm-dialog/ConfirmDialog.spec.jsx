import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

const confirm = vi.fn()
const dismiss = vi.fn()

describe('Confirm dialog test', () => {
  const props = {
    title: 'title',
    message: 'message',
    open: true,
    onConfirm: confirm,
    onDismiss: dismiss
  }

  beforeEach(() => {
    render(<ConfirmDialog {...props} />)
  })

  it('should have title text', () => {
    const title = screen.getByText(props.title)

    expect(title).toBeInTheDocument()
  })
  it('should have message text', () => {
    const message = screen.getByText(props.message)

    expect(message).toBeInTheDocument()
  })
  it('should confirm', () => {
    const confirmButton = screen.getByText('common.yes')
    fireEvent.click(confirmButton)

    expect(confirm).toHaveBeenCalled()
  })
  it('should dismiss', () => {
    const dismissButton = screen.getByText('common.no')
    fireEvent.click(dismissButton)

    expect(dismiss).toHaveBeenCalled()
  })
})
