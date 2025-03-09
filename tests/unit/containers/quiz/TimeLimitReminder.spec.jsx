import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import TimeLimitReminder from '~/containers/quiz/time-limit-reminder/TimeLimitReminder'
import { vi } from 'vitest'

describe('TimeLimitReminder', () => {
  const handleStart = vi.fn()
  const handleClose = vi.fn()

  it('should render the dialog when open is true', () => {
    renderWithProviders(
      <TimeLimitReminder onClose={handleClose} onStart={handleStart} open />
    )

    expect(screen.getByText('quiz.timeLimitReminderTitle')).toBeInTheDocument()
  })

  it('should call handleStart when start button is clicked', () => {
    renderWithProviders(
      <TimeLimitReminder onClose={handleClose} onStart={handleStart} open />
    )

    const startButton = screen.getByText('quiz.start')
    fireEvent.click(startButton)

    expect(handleStart).toHaveBeenCalledTimes(1)
  })

  it('should call handleClose when close button is clicked', () => {
    renderWithProviders(
      <TimeLimitReminder onClose={handleClose} onStart={handleStart} open />
    )

    const closeButton = screen.getByTestId('CloseRoundedIcon')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
