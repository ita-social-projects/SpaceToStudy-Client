import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CreateOrEditOffer from '~/containers/offer-page/create-or-edit-offer/CreateOrEditOffer'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'

const mockDispatch = vi.fn()
const mockCloseDrawer = vi.fn()
const mockService = vi.fn()

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

  it('should call a dispatch on successful response', async () => {
    const saveButton = screen.getByRole('button', {name: /offerPage.createOffer.buttonTitles.tutor/i})
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(openAlert).toHaveBeenCalledWith({
        severity: snackbarVariants.success,
        message: 'offerPage.createOffer.successMessage'
      })
    })
  })
})
