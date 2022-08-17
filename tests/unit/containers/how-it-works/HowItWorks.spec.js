import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}))

describe('HowItWorks container', () => {
  render(
    <MemoryRouter>
      <ConfirmationDialogProvider>
        <ModalProvider>
          <HowItWorks />
        </ModalProvider>
      </ConfirmationDialogProvider>
    </MemoryRouter>
  )

  it('should change info by clicking on switch', () => {
    const checkbox = screen.getByRole('checkbox')
    checkbox.click()

    fireEvent.change(checkbox, { target: { checked: 'false' } })
    const btnText = screen.getByText('Become a mentor')

    expect(btnText).toBeInTheDocument()
  })
})
