import ProfessionalCategory from '~/containers/edit-profile/professional-info-tab/professional-category/ProfessionalCategory'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { ProficiencyLevelEnum } from '~/types'

const mockOpenProfessionalCategoryModal = vi.fn()

const activatedCategory = {
  _id: '1',
  name: 'Computer science',
  isActivated: true,
  isActivationBlocked: false,
  subjects: []
}

const categoryWithSubjects = {
  ...activatedCategory,
  subjects: [
    {
      _id: '1',
      name: 'PHP',
      proficiencyLevels: [
        ProficiencyLevelEnum.Beginner,
        ProficiencyLevelEnum.Intermediate,
        ProficiencyLevelEnum.Advanced
      ]
    },
    {
      _id: '2',
      name: 'Java',
      proficiencyLevels: [ProficiencyLevelEnum.Beginner]
    }
  ]
}

const deactivatedCategory = { ...activatedCategory, isActivated: false }

const renderProfessionalCategoryWithItem = (item) => {
  renderWithProviders(
    <ProfessionalCategory
      item={item}
      openProfessionalCategoryModal={mockOpenProfessionalCategoryModal}
    />
  )
}

describe('ProfessionalCategory', () => {
  it('should render deactivate button when isActivated is true', () => {
    renderProfessionalCategoryWithItem(activatedCategory)

    const deactivateCategoryButton = screen.getByText(
      /editProfilePage.profile.professionalTab.deactivateCategoryBtn/
    )

    expect(deactivateCategoryButton).toBeInTheDocument()
  })

  it('should render activate button when isActivated is false', () => {
    renderProfessionalCategoryWithItem(deactivatedCategory)

    const activateCategoryButton = screen.getByText(
      /editProfilePage.profile.professionalTab.activateCategoryBtn/
    )

    expect(activateCategoryButton).toBeInTheDocument()
  })

  it('should open modal when Delete button is clicked', () => {
    renderProfessionalCategoryWithItem(categoryWithSubjects)

    const deleteCategoryButton = screen.getByTestId(
      'delete-professional-category-button'
    )
    fireEvent.click(deleteCategoryButton)

    const deleteCategoryModalTitle = screen.getByText(
      /editProfilePage.profile.professionalTab.deleteCategoryModal.title/
    )

    expect(deleteCategoryModalTitle).toBeInTheDocument()
  })

  it('should render subjects correctly', () => {
    renderProfessionalCategoryWithItem(categoryWithSubjects)

    const firstSubjectName = categoryWithSubjects.subjects[0].name
    const firstSubjectNameElement = screen.getByText(firstSubjectName)
    expect(firstSubjectNameElement).toBeInTheDocument()

    const subjectLabels = screen.getAllByText(
      /editProfilePage.profile.professionalTab.subject/
    )

    expect(subjectLabels).toHaveLength(categoryWithSubjects.subjects.length)
  })
})
