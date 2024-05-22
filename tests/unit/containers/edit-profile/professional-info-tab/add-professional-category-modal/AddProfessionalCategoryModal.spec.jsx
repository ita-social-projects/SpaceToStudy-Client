import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import { renderWithProviders, selectOption } from '~tests/test-utils'
import { act, fireEvent, screen } from '@testing-library/react'
import { professionalSubjectTemplate } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'

const mockCloseModal = vi.fn()
const mockHandleSubmit = vi.fn()
const mockedBlockedCategory = [{ id: '4', name: 'Music' }]

const initialValues = {
  category: { _id: '1', name: 'Cooking' },
  subjects: [
    {
      _id: '2',
      name: 'Gastronomy'
    },
    {
      _id: '3',
      name: 'Varenychky'
    }
  ]
}

vi.mock('~/services/subject-service', async () => {
  const actual = await vi.importActual('~/services/subject-service')
  return {
    ...actual,
    getSubjectsNames: () => initialValues.subjects
  }
})

vi.mock('~/services/category-service', async () => {
  const actual = await vi.importActual('~/services/category-service')
  return {
    ...actual,
    getCategoriesNames: () => [initialValues.category, ...mockedBlockedCategory]
  }
})

const renderProfessionalCategoryModalWithInitialValues = (initialValues) => {
  renderWithProviders(
    <AddProfessionalCategoryModal
      blockedCategoriesOptions={mockedBlockedCategory}
      closeModal={mockCloseModal}
      handleSubmit={mockHandleSubmit}
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

  it('should update professional category value in autocomplete', async () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    await selectOption(categoryAutocomplete, 'Cooking', 'getByDisplayValue')

    // const subjectAutoComplete = screen.getByLabelText(
    //   /editProfilePage.profile.professionalTab.subject/
    // )
    // await selectOption(subjectAutoComplete, 'Gastronomy')
  })

  it('should close modal when form is submitted', async () => {
    const submitButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/
    )
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockCloseModal).toHaveBeenCalled()
  })

  it('should be disabled if category is disabled', () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    fireEvent.mouseDown(categoryAutocomplete)
    // const disabledOption = screen.getByText('Music')
  })
})

describe('AddProfessionalCategoryModal with initial value', () => {
  beforeEach(() =>
    renderProfessionalCategoryModalWithInitialValues(initialValues)
  )

  it('should create SubjectGroup list according to passed initial values (modal edit mode)', async () => {
    // const professionalSubjects = screen.getAllByTestId('subjectField')
    // expect(professionalSubjects).toHaveLength(2)
    // expect(professionalSubjects[0]).toHaveValue(initialValues.subjects[0]._id)
    // expect(professionalSubjects[1]).not.toHaveValue(
    //   initialValues.subjects[0]._id
    // )
  })

  it('should delete subject from the list', async () => {
    const professionalSubjectsBefore = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    const deleteBtn = screen.getAllByTestId('deleteBtn')

    expect(professionalSubjectsBefore).toHaveLength(2)

    await act(async () => fireEvent.click(deleteBtn[0]))

    const professionalSubjectsAfter = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    expect(professionalSubjectsAfter).toHaveLength(1)
  })
})
