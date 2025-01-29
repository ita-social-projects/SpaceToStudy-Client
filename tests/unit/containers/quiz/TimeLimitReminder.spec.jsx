import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import TimeLimitReminder from '~/containers/quiz/time-limit-reminder/TimeLimitReminder'

describe('TimeLimitReminder', () => {
  const handleStart = vi.fn()
  const handleClose = vi.fn()

  it('should render the dialog when open is true', () => {
    renderWithProviders(
      <TimeLimitReminder
        open={true}
        handleStart={handleStart}
        handleClose={handleClose}
      />
    )

    expect(screen.getByText('quiz.timeLimitReminderTitle')).toBeInTheDocument()
  })

  it('should call handleStart when start button is clicked', () => {
    renderWithProviders(
      <TimeLimitReminder
        open={true}
        handleStart={handleStart}
        handleClose={handleClose}
      />
    )

    const startButton = screen.getByText('quiz.start')
    fireEvent.click(startButton)

    expect(handleStart).toHaveBeenCalledTimes(1)
  })

  it('should call handleClose when Close button is clicked', () => {
    renderWithProviders(
      <TimeLimitReminder
        open={true}
        handleStart={handleStart}
        handleClose={handleClose}
      />
    )

    const closeButton = screen.getByTestId('CloseRoundedIcon')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
