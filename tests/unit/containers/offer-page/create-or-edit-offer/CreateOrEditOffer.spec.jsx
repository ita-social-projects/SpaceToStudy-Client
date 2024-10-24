import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CreateOrEditOffer from '~/containers/offer-page/create-or-edit-offer/CreateOrEditOffer'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'
import { expect } from 'vitest'

const mockDispatch = vi.fn()
const mockCloseDrawer = vi.fn()
const mockService = vi.fn()
const mockNavigate = vi.fn()

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
    useAppSelector: vi.fn(() => ({ userRole: 'tutor' })),
  }
})

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate
}))


describe('CreateOrEditOffer', () => {
  beforeEach(() => {
    renderWithProviders(
      <CreateOrEditOffer existingOffer={null} closeDrawer={mockCloseDrawer} service={mockService} />
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockDispatch.mockReset()
  })

  it('should call a dispatch and navigate on successful response', () => {
    const saveButton = screen.getByRole('button', {name: /offerPage.createOffer.buttonTitles.tutor/i})
    fireEvent.click(saveButton)

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(openAlert({
          severity: snackbarVariants.success,
          message: 'offerPage.createOffer.successMessage'
        }
      ))
      expect(mockCloseDrawer).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/offer-details')
    })
  })

  it('should call different dispatch and navigate with #offer on successful response', () => {
    vi.mock('react-router-dom', async () => ({
      ...(await vi.importActual('react-router-dom')),
      useLocation: () => ({hash: '#offer'})
    }))
    
    const saveButton = screen.getByRole('button', {name: /offerPage.createOffer.buttonTitles.tutor/i})
    fireEvent.click(saveButton)

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(openAlert({
          severity: snackbarVariants.success,
          message: 'offerPage.createOffer.extendedSuccessMessage.tutor',
          duration: 10000,
          isExtended: true,
          route: '/my-offers'
        }
      ))
      expect(mockCloseDrawer).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/my-profile#complete')
    })
  })
})
