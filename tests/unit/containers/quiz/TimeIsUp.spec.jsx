import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import TimeIsUp from '~/containers/quiz/time-is-up/TimeIsUp'

describe('TimeIsUp', () => {
  const handleStart = vi.fn()
  const handleClose = vi.fn()

  it('should render the dialog when open is true', () => {
    renderWithProviders(
      <TimeIsUp open={true} onStart={handleStart} onClose={handleClose} />
    )

    expect(screen.getByText('quiz.timeIsUpTitle')).toBeInTheDocument()
  })

  it('should call onStart when start button is clicked', () => {
    renderWithProviders(
      <TimeIsUp open={true} onStart={handleStart} onClose={handleClose} />
    )

    const startButton = screen.getByText('quiz.viewResults')
    fireEvent.click(startButton)

    expect(handleStart).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when close button is clicked', () => {
    renderWithProviders(
      <TimeIsUp open={true} onStart={handleStart} onClose={handleClose} />
    )

    const closeButton = screen.getByTestId('CloseRoundedIcon')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
