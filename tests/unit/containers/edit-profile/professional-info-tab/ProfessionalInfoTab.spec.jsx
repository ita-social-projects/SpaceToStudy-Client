import ProfessionalInfoTab from '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

const mockOpenModal = vi.fn()

const handleSubmitMock = vi.fn()
vi.mock('~/hooks/use-update-user', () => ({
  default: () => ({
    handleSubmit: handleSubmitMock,
    loading: false
  })
}))

const mockedState = (role) => ({ appMain: { userRole: role } })

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      openModal: mockOpenModal
    })
  }
})

describe('ProfessionalInfoTab', () => {
  beforeEach(() => {
    renderWithProviders(<ProfessionalInfoTab />)
  })

  it('should render title and description', () => {
    const title = screen.getByText(
      'editProfilePage.profile.professionalTab.mainTitle'
    )
    expect(title).toBeInTheDocument()

    const description = screen.getByText(
      'editProfilePage.profile.professionalTab.mainDescription'
    )
    expect(description).toBeInTheDocument()
  })

  it('should open create category modal when "add category" button is clicked', () => {
    const addCategoryButton = screen.getByText(
      'editProfilePage.profile.professionalTab.addCategoryBtn'
    )

    fireEvent.click(addCategoryButton)

    expect(mockOpenModal).toHaveBeenCalled()
  })
})

describe('ProfessionalInfoTab for tutor', () => {
  beforeEach(() => {
    renderWithProviders(<ProfessionalInfoTab />, {
      preloadedState: mockedState('tutor')
    })
  })

  it('should render about tutor block', () => {
    const aboutTutorTitle = screen.getByText(
      'editProfilePage.profile.professionalTab.aboutTheTutorTitle'
    )

    expect(aboutTutorTitle).toBeInTheDocument()
  })

  it('should update about tutor info', () => {
    const updateBtn = screen.getByText(
      'editProfilePage.profile.updateProfileBtn'
    )
    fireEvent.click(updateBtn)

    expect(handleSubmitMock).toHaveBeenCalled()
  })
})
