import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'

const mockDispatch = vi.fn()
const mockSelector = vi.fn()

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector
  }
})

vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

describe('WhatCanYoDo component', () => {
  it('should render popup after button click', () => {
    renderWithProviders(<WhatCanYouDo />)

    const btn = screen.getByText(/guestHomePage.whatCanYouDo.teach.actionLabel/)
    fireEvent.click(btn)
    const popup = screen.getByTestId('popup')
    expect(popup).toBeInTheDocument()
  })
})
