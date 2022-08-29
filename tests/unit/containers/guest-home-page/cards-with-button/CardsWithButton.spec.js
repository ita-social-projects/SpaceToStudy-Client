import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'

import howItWorksMentorFirst from '~/assets/img/guest-home-page/howItWorksMentorFirst.svg'
import howItWorksMentorSecond from '~/assets/img/guest-home-page/howItWorksMentorSecond.svg'
import { SnackBarProvider } from '~/context/snackbar-context'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}))

describe('CardsWithButton container', () => {
  const items = [
    {
      image: howItWorksMentorFirst,
      title: 'guestHomePage.howItWorks.mentor.signUp.title',
      description: 'guestHomePage.howItWorks.mentor.signUp.description'
    },
    {
      image: howItWorksMentorSecond,
      title: 'guestHomePage.howItWorks.mentor.createAMentorAccount.title',
      description: 'guestHomePage.howItWorks.mentor.createAMentorAccount.description'
    }
  ]
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SnackBarProvider>
          <ConfirmationDialogProvider>
            <ModalProvider>
              <CardsWithButton array={ items } btnText={ 'Become a mentor' } role={ 'mentor' } />
            </ModalProvider>
          </ConfirmationDialogProvider>
        </SnackBarProvider>
      </MemoryRouter>
    )
  })

  it('should render popup after button click', () => {
    const btn = screen.getByText('Become a mentor')
    fireEvent.click(btn)

    const popup = screen.getByTestId('popup')

    expect(popup).toBeInTheDocument()
  })
})
