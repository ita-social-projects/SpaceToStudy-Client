import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'

describe('WhatCanYoDo component', () => {
  it('should render popup after button click', () => {
    render(
      <MemoryRouter>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <WhatCanYouDo />
          </ModalProvider>
        </ConfirmationDialogProvider>
      </MemoryRouter>
    )

    const btn = screen.getByText(/guestHomePage.whatCanYouDo.teach.actionLabel/)
    fireEvent.click(btn)
    const popup = screen.getByTestId('popup')
    expect(popup).toBeInTheDocument()
  })
})
