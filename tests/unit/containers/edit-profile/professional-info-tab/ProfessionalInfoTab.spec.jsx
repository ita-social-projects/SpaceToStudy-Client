import ProfessionalInfoTab from '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'
import { initialProfessoinalBlock } from '~/redux/features/editProfileSlice.ts'

const mockOpenModal = vi.fn()

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      openModal: mockOpenModal
    })
  }
})

vi.mock(
  '~/containers/edit-profile/professional-info-tab/professional-category-list/ProfessionalCategoryList',
  () => ({
    default: () => <div>Professional Category List</div>
  })
)

const mockedCategories = [
  {
    _id: '1',
    isDeletionBlocked: false,
    category: {
      _id: 'category_001',
      name: 'Music'
    },
    subjects: [
      {
        _id: 'subject_001',
        name: 'Violin'
      },
      {
        _id: 'subject_002',
        name: 'Voice training'
      }
    ]
  },
  {
    _id: '2',
    isDeletionBlocked: false,
    category: {
      _id: 'category_002',
      name: 'Marketing'
    },
    subjects: [
      {
        _id: 'subject_003',
        name: 'Digital marketing'
      },
      {
        _id: 'subject_004',
        name: 'Content marketing'
      }
    ]
  }
]

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn()
}))

describe('ProfessionalInfoTab', () => {
  beforeEach(() => {
    useAppSelector.mockReturnValue({
      userRole: UserRoleEnum.Student,
      categories: mockedCategories,
      professionalBlock: initialProfessoinalBlock
    })
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
    useAppSelector.mockReturnValue({
      userRole: UserRoleEnum.Tutor,
      categories: mockedCategories,
      professionalBlock: initialProfessoinalBlock
    })
    renderWithProviders(<ProfessionalInfoTab />)
  })

  it('should render about tutor block', () => {
    const aboutTutorTitle = screen.getByText(
      'editProfilePage.profile.professionalTab.aboutTheTutorTitle'
    )

    expect(aboutTutorTitle).toBeInTheDocument()
  })
})
