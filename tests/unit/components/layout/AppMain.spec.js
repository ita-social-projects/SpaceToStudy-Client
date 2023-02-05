import { screen, waitFor } from '@testing-library/react'

import AppMain from '~/containers/layout/app-main/AppMain'
import { ModalProvider } from '~/context/modal-context'
import { renderWithProviders } from '~tests/test-utils'

const mockState = {
  appMain: { loading: true, userRole: '' }
}

const mockDispatch = jest.fn()

jest.mock('~/services/local-storage-service')

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
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

    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })
})
