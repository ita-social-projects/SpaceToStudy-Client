import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import Modal from '~/components/modal/Modal'

const mockCloseModal = jest.fn()

describe('Modal dialog test', () => {
  const props = {
    content: 'test',
    closeModal: mockCloseModal
  }

  beforeEach(() => {
    render(<Modal { ...props } />)
  })

  it('should have content text', () => {
    const content = screen.getByText('test')

    expect(content).toBeInTheDocument()
  })
  it('should close modal', async () => {
    const closeButton = screen.getByTestId('close-modal')
    fireEvent.click(closeButton)

    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled())
  })
})
