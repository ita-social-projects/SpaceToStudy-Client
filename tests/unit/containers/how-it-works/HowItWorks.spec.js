import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ModalProvider } from '~/context/modal-context'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import { getByText } from '@storybook/testing-library'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}))

describe('HowItWorks container', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <ConfirmationDialogProvider>
        <ModalProvider>
          <HowItWorks />
        </ModalProvider>
      </ConfirmationDialogProvider>
    </MemoryRouter>
  )

  it('should change info by clicking on switch', () => {
    getByRole('checkbox').click()

    fireEvent.change(getByRole('checkbox'), { target: { checked: 'false' } })
  })
})
