import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import { renderWithProviders, selectOption } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { professionalSubjectTemplate } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'
import { ProficiencyLevelEnum } from '~/types'

const mockCloseModal = vi.fn()

const initialValues = {
  _id: '1',
  name: 'Computer science',
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

const renderProfessionalCategoryModalWithInitialValues = (initialValues) => {
  renderWithProviders(
    <AddProfessionalCategoryModal
      closeModal={mockCloseModal}
      initialValues={initialValues}
    />
  )
}

describe('AddProfessionalCategoryModal without initial value', () => {
  beforeEach(() => {
    renderProfessionalCategoryModalWithInitialValues()
  })

  it('should render SubjectGroup using template in (modal create mode)', async () => {
    const professionalSubject = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    expect(professionalSubject).toHaveValue(professionalSubjectTemplate.name)
  })

  it('should add one more subject group if "Add one more subject" button in clicked', () => {
    const button = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.addSubjectBtn/
    )

    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    fireEvent.click(button)

    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    expect(professionalSubjects).toHaveLength(3)
  })

  it('should update subject name when other option is selected', async () => {
    const autocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    await selectOption(autocomplete, 'Language1')
  })

  it('should update professional subject value in autocomplete', async () => {
    const autocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    await selectOption(autocomplete, 'Subject1')
  })

  it('should update proficiency level select value correctly', () => {
    const select = screen.getByTestId('proficiency-levels')
    expect(select).toHaveValue('')

    fireEvent.select(select, {
      target: {
        value: [ProficiencyLevelEnum.Beginner, ProficiencyLevelEnum.Advanced]
      }
    })
    expect(select).toHaveValue(
      [ProficiencyLevelEnum.Beginner, ProficiencyLevelEnum.Advanced].join(',')
    )
  })

  it('should close modal when form is submitted', () => {
    const submitButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/
    )
    fireEvent.click(submitButton)

    expect(mockCloseModal).toHaveBeenCalled()
  })
})

describe('AddProfessionalCategoryModal with initial value', () => {
  beforeEach(() => {
    renderProfessionalCategoryModalWithInitialValues(initialValues)
  })

  it('should create SubjectGroup list according to passed initial values (modal edit mode)', () => {
    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    expect(professionalSubjects).toHaveLength(2)

    expect(professionalSubjects[0]).toHaveValue(initialValues.subjects[0].name)
    expect(professionalSubjects[1]).not.toHaveValue(
      initialValues.subjects[0].name
    )

    const professionalProficiencyLevelSelects =
      screen.getAllByTestId('proficiency-levels')
    expect(professionalProficiencyLevelSelects).toHaveLength(2)

    const secondProficiencyLevelSelect = professionalProficiencyLevelSelects[1]
    const selectedProficiencyLevels =
      initialValues.subjects[1].proficiencyLevels
    expect(secondProficiencyLevelSelect).toHaveValue(
      selectedProficiencyLevels.join(', ')
    )
  })
})
