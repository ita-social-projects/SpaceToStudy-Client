import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import { SnackBarProvider } from '~/context/snackbar-context'

const mockDispatch = jest.fn()
const mockSelector = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector
}))

jest.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

describe('WhatCanYoDo component', () => {
  it('should render popup after button click', () => {
    render(
      <MemoryRouter>
        <SnackBarProvider>
          <ConfirmationDialogProvider>
            <ModalProvider>
              <WhatCanYouDo />
            </ModalProvider>
          </ConfirmationDialogProvider>
        </SnackBarProvider>
      </MemoryRouter>
    )

    const btn = screen.getByText(/guestHomePage.whatCanYouDo.teach.actionLabel/)
    fireEvent.click(btn)
    const popup = screen.getByTestId('popup')
    expect(popup).toBeInTheDocument()
  })
})
