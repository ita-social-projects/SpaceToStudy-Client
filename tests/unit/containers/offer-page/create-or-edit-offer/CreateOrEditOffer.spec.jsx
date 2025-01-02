import { screen, fireEvent, waitFor } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'

import { renderWithProviders } from '~tests/test-utils'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'
import snackbarReducer, { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'
import { expect } from 'vitest'
import reducer from '~/redux/reducer'

const mockDispatch = vi.fn()
const mockCloseDrawer = vi.fn()
const mockNavigate = vi.fn()

vi.mock('~/hooks/use-axios', async () => {
  const actual = await vi.importActual('~/hooks/use-axios')
  return {
    ...actual,
    useAxios: vi.fn()
  }
})

vi.mock('~/redux/features/snackbarSlice', async () => {
  const actual = await vi.importActual('~/redux/features/snackbarSlice')
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
    useAppSelector: vi.fn(() => ({ userRole: 'tutor' }))
  }
})

vi.mock('~/services/offer-service', async () => {
  const actual = await vi.importActual('~/services/offer-service')
  const mockCreateOffer = vi.fn()
  return {
    ...actual,
    OfferService: {
      createOffer: mockCreateOffer
    }
  }
})

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate
}))

const store = configureStore({
  reducer: {
    appMain: reducer,
    snackbar: snackbarReducer
  }
})

describe('CreateOrEditOffer', () => {
  beforeEach(() => {
    renderWithProviders(<CreateOffer closeDrawer={mockCloseDrawer} />, {
      store
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockDispatch.mockReset()
  })

  it('should call a dispatch and navigate on successful response', async () => {
    const { OfferService } = await import('~/services/offer-service')
    OfferService.createOffer.mockResolvedValue({})

    const saveButton = screen.getByRole('button', {
      name: /offerPage.createOffer.buttonTitles.tutor/i
    })
    fireEvent.click(saveButton)

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({
          severity: snackbarVariants.success,
          message: 'offerPage.createOffer.successMessage'
        })
      )
      expect(mockCloseDrawer).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.stringMatching(/^\/offer-details/)
      )
    })
  })

  it('should call different dispatch and navigate with #offer on successful response', () => {
    vi.mock('react-router-dom', async () => ({
      ...(await vi.importActual('react-router-dom')),
      useLocation: () => ({ hash: '#offer' })
    }))

    const saveButton = screen.getByRole('button', {
      name: /offerPage.createOffer.buttonTitles.tutor/i
    })
    fireEvent.click(saveButton)

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({
          severity: snackbarVariants.success,
          message: 'offerPage.createOffer.extendedSuccessMessage.tutor',
          duration: 10000,
          isExtended: true,
          route: '/my-offers'
        })
      )
      expect(mockCloseDrawer).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/my-profile#complete')
    })
  })
})
