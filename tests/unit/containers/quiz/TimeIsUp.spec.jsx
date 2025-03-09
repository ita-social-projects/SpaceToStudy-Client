import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import TimeIsUp from '~/containers/quiz/time-is-up/TimeIsUp'
import { vi } from 'vitest'

describe('TimeIsUp', () => {
  const handleStart = vi.fn()
  const handleClose = vi.fn()

  beforeEach(() => {
    renderWithProviders(
      <TimeIsUp onClose={handleClose} onStart={handleStart} open />
    )
  })

  it('should render the dialog when open is true', () => {
    expect(screen.getByText('quiz.timeIsUpTitle')).toBeInTheDocument()
  })

  it('should call onStart when start button is clicked', () => {
    const startButton = screen.getByText('quiz.viewResults')
    fireEvent.click(startButton)

    expect(handleStart).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when close button is clicked', () => {
    const closeButton = screen.getByTestId('CloseRoundedIcon')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
