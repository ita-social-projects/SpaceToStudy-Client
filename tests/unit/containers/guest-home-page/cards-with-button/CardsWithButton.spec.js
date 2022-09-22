import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'

import howItWorksTutorFirst from '~/assets/img/guest-home-page/howItWorksTutorFirst.svg'
import howItWorksTutorSecond from '~/assets/img/guest-home-page/howItWorksTutorSecond.svg'
import { SnackBarProvider } from '~/context/snackbar-context'

const mockDispatch = jest.fn()
const mockSelector = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector
}))

describe('CardsWithButton container', () => {
  const items = [
    {
      image: howItWorksTutorFirst,
      title: 'guestHomePage.howItWorks.tutor.signUp.title',
      description: 'guestHomePage.howItWorks.tutor.signUp.description'
    },
    {
      image: howItWorksTutorSecond,
      title: 'guestHomePage.howItWorks.tutor.createATutorAccount.title',
      description: 'guestHomePage.howItWorks.tutor.createATutorAccount.description'
    }
  ]
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SnackBarProvider>
          <ConfirmationDialogProvider>
            <ModalProvider>
              <CardsWithButton array={ items } btnText={ 'Become a tutor' } role={ 'tutor' } />
            </ModalProvider>
          </ConfirmationDialogProvider>
        </SnackBarProvider>
      </MemoryRouter>
    )
  })

  it('should render popup after button click', () => {
    const btn = screen.getByText('Become a tutor')
    fireEvent.click(btn)

    const popup = screen.getByTestId('popup')

    expect(popup).toBeInTheDocument()
  })
})
