import {  screen } from '@testing-library/react'
import { vi } from 'vitest'
import { ModalProvider } from '~/context/modal-context'

import AppMain from '~/containers/layout/app-main/AppMain'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~tests/test-utils'

const mockState = {
  appMain: { loading: true, userRole: '' }
}

const mockDispatch = vi.fn()

vi.mock('~/services/local-storage-service')

vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  useDispatch: () => mockDispatch
}))
describe('AppMain layout component test', () => {
  it('should render loader', () => {
    renderWithProviders(
      <ModalProvider>
        <AppMain />
      </ModalProvider>,
      { preloadedState: mockState }
    )
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should dispatch checkAuth if accessToken exists in localStorage', async () => {
    renderWithProviders(
      <ModalProvider>
        <AppMain />
      </ModalProvider>,
      {
        preloadedState: {
          appMain: {
            loading: false,
            userRole: ''
          }
        }
      }
    )
    mockDispatch.mock.calls.length = 1 
    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })
})
