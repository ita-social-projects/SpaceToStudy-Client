import { fireEvent, screen } from '@testing-library/react'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const mockDispatch = vi.fn()

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch
  }
})

describe('HowItWorks container', () => {
  renderWithProviders(<HowItWorks />)

  it('should change info by clicking on switch', () => {
    const checkbox = screen.getByRole('checkbox')
    checkbox.click()

    fireEvent.change(checkbox, { target: { checked: 'false' } })
    const btnText = screen.getByText(
      'guestHomePage.whatCanYouDo.learn.actionLabel'
    )

    expect(btnText).toBeInTheDocument()
  })
})
