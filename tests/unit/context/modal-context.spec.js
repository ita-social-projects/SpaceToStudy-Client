import { render, screen, fireEvent, act, waitForElementToBeRemoved } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { ModalProvider } from '~/context/modal-context'
import AppHeader from '~/containers/layout/AppHeader'
import { ConfirmationDialogProvider } from '~/context/confirm-context'


describe('modal context', () => {
  beforeEach(() => {
    const wrapper = ({ children }) => (
      <MemoryRouter>
        <ConfirmationDialogProvider>
          <ModalProvider>
            { children }
          </ModalProvider>
        </ConfirmationDialogProvider>
      </MemoryRouter>
    )
    render(<AppHeader />, { wrapper })

    const button = screen.getByText('header.loginButton')
    act(() => {fireEvent.click(button)})
    const inputNode = screen.getByLabelText(/common.labels.password/i)
    act(() => { fireEvent.change(inputNode, { target: { value: 'test' } }) })
    act(()=>{fireEvent.blur(inputNode)})
    const closeButton = screen.getByTestId('CloseIcon')
    act(()=>{fireEvent.click(closeButton)})
  })
  
  it('should open modal popup', () => {
    const popup = screen.getByTestId('popup')

    expect(popup).toBeInTheDocument()
  })

  it('should request confirmation if left with filled form', () => {
    const confirmDialog = screen.getByTestId('confirmDialog')
    
    expect(confirmDialog).toBeInTheDocument()
  })

  it('should not close popup if dismiss confirmation', async () => {
    const dismissButton = screen.getByText('common.no')
    act(()=>{fireEvent.click(dismissButton)})
    const popup = screen.getByTestId('popup')

    await waitForElementToBeRemoved(screen.getByTestId('confirmDialog'))

    expect(popup).toBeInTheDocument()
  })

  it('should close popup if accept confirmation', async () => {
    const confirmButton = screen.getByText('common.yes')
    act(()=>{fireEvent.click(confirmButton)})

    const popup = screen.getByTestId('popup')
    
    await waitForElementToBeRemoved(screen.getByTestId('confirmDialog'))

    expect(popup).not.toBeInTheDocument()
  })
})
