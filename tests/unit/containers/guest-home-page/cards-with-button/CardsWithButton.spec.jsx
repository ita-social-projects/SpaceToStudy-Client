import { fireEvent, screen } from '@testing-library/react'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import { renderWithProviders } from '~tests/test-utils'
import howItWorksTutorFirst from '~/assets/img/guest-home-page/howItWorksTutorFirst.svg'
import howItWorksTutorSecond from '~/assets/img/guest-home-page/howItWorksTutorSecond.svg'
import { vi } from 'vitest'

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
      description:
        'guestHomePage.howItWorks.tutor.createATutorAccount.description'
    }
  ]
  beforeEach(() => {
    renderWithProviders(
      <CardsWithButton
        array={items}
        btnText={'Become a tutor'}
        role={'tutor'}
      />
    )
  })

  it('should render popup after button click', () => {
    const btn = screen.getByText('Become a tutor')
    fireEvent.click(btn)

    const popup = screen.getByTestId('popup')

    expect(popup).toBeInTheDocument()
  })
})
