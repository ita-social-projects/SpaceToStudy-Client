import { render, screen } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import AcceptCooperationClosing from '~/containers/my-cooperations/accept-cooperation-close/AcceptCooperationClosing'
describe('AcceptCooperationClosing', () => {
  const mockOnAccept = vi.fn()

  beforeEach(() => {
    render(<AcceptCooperationClosing user='John Doe' onAccept={mockOnAccept} />)
  })

  it('should render the title correctly', () => {
    const titleText = screen.getByText('titles.acceptCooperationClosing')
    expect(titleText).toBeInTheDocument()
  })
})
