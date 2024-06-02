import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import { renderWithProviders, selectOption } from '~tests/test-utils'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { professionalSubjectTemplate } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const mockCloseModal = vi.fn()
const mockHandleSubmit = vi.fn()
const mockedBlockedCategory = [{ _id: '4', name: 'Music' }]

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
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.categories.getNames)
        .reply(200, [initialValues.category, ...mockedBlockedCategory])
      mockAxiosClient
        .onGet(`${initialValues.category._id}${URLs.subjects.getNames}`)
        .reply(200, initialValues.subjects)

      renderProfessionalCategoryModalWithInitialValues()
    })
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

    // TODO: Implement test case for subjects
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
    // TODO: Implement test case
  })
})

describe('AddProfessionalCategoryModal with initial value', () => {
  beforeEach(
    async () =>
      await waitFor(() => {
        mockAxiosClient
          .onGet(URLs.categories.getNames)
          .reply(200, [initialValues.category, ...mockedBlockedCategory])
        mockAxiosClient
          .onGet(`${initialValues.category._id}${URLs.subjects.getNames}`)
          .reply(200, initialValues.subjects)

        renderProfessionalCategoryModalWithInitialValues(initialValues)
      })
  )

  it('should create SubjectGroup list according to passed initial values (modal edit mode)', async () => {
    // TODO: Implement test case
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
