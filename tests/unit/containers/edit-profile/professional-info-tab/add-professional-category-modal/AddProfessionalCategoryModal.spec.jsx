import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import { renderWithProviders, selectOption } from '~tests/test-utils'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { professionalSubjectTemplate } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'

const mockCloseModal = vi.fn()
const mockedBlockedCategory = [{ _id: '4', name: 'Music' }]

const mockDispatch = vi.fn()
const mockSelector = vi.fn()

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector
  }
})

const initialValues = {
  _id: 'kajsdf',
  isDeletionBlocked: false,
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

describe('AddProfessionalCategoryModal without initial value', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.categories.getNames)
        .reply(200, [initialValues.category, ...mockedBlockedCategory])
      mockAxiosClient
        .onGet(
          `${URLs.categories.get}/${initialValues.category._id}${URLs.subjects.getNames}`
        )
        .reply(200, initialValues.subjects)

      renderWithProviders(
        <AddProfessionalCategoryModal
          blockedCategoriesOptions={mockedBlockedCategory}
          closeModal={mockCloseModal}
        />
      )
    })
  })

  it('should update the correct subject when changing value', async () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    await selectOption(categoryAutocomplete, 'Cooking')

    await act(async () => {
      fireEvent.change(professionalSubjects[0], {
        target: { value: 'Updated Gastronomy' }
      })
    })

    expect(professionalSubjects[0].value).toBe('Updated Gastronomy')
  })

  it('should render SubjectGroup using template in (modal create mode)', async () => {
    const professionalSubject = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    expect(professionalSubject).toHaveValue(professionalSubjectTemplate.name)
  })

  it('should add one more subject group if "Add one more subject" button is clicked', () => {
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

  it('should update professional category value in autocomplete and load subjects', async () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    const professionalSubjects = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    await selectOption(categoryAutocomplete, 'Cooking')

    await act(async () => {
      fireEvent.change(professionalSubjects, {
        target: { value: 'Varenychky' }
      })
    })
    expect(professionalSubjects.value).toBe('Varenychky')
  })

  it('should update only the subject with matching index and not others', async () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    const button = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.addSubjectBtn/
    )
    fireEvent.click(button)
    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    await selectOption(categoryAutocomplete, 'Cooking')

    await act(async () => {
      fireEvent.change(professionalSubjects[0], {
        target: { value: 'Gastronomy' }
      })
    })
    expect(professionalSubjects[0].value).toBe('Gastronomy')

    await act(async () => {
      fireEvent.change(professionalSubjects[1], {
        target: { value: 'Varenychky' }
      })
    })
    expect(professionalSubjects[1].value).toBe('Varenychky')
  })

  it('button "Save changes" should be disabled if subject field is empty', async () => {
    const submitButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/
    )
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )

    await selectOption(categoryAutocomplete, 'Cooking')

    expect(submitButton).toBeDisabled()
  })

  it('subject field should be disabled if category is disabled', async () => {
    const subjectAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    expect(subjectAutocomplete).toBeDisabled()
  })
})

describe('AddProfessionalCategoryModal with initial value', () => {
  beforeEach(
    async () =>
      await waitFor(() => {
        renderWithProviders(
          <AddProfessionalCategoryModal
            blockedCategoriesOptions={mockedBlockedCategory}
            closeModal={mockCloseModal}
            initialValues={initialValues}
            isEdit
          />
        )
      })
  )

  it('should create SubjectGroup list according to passed initial values (modal edit mode)', async () => {
    await waitFor(() => {
      const professionalSubjects = screen.getAllByLabelText(
        /editProfilePage.profile.professionalTab.subject/
      )

      initialValues.subjects.forEach((subject, index) => {
        const subjectElement = professionalSubjects[index]
        expect(subjectElement.value).toMatch(new RegExp(subject.name, 'i'))
      })
    })
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

  it('should close modal when form is submitted', async () => {
    const submitButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/
    )
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockCloseModal).toHaveBeenCalled()
  })
})

describe('AddProfessionalCategoryModal Subject Updates', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <AddProfessionalCategoryModal
          blockedCategoriesOptions={mockedBlockedCategory}
          closeModal={mockCloseModal}
          initialValues={initialValues}
          isEdit
        />
      )
    })
  })

  it('should update only the specific subject when changing value', async () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    await selectOption(categoryAutocomplete, 'Cooking')
    await act(async () => {
      fireEvent.change(professionalSubjects[0], {
        target: { value: 'Gastronomy' }
      })
    })
    expect(screen.getByDisplayValue('Gastronomy')).toBeInTheDocument()
    expect(professionalSubjects[1].value).toBe('Varenychky')
  })

  it('should disable the "Save changes" button if any subject field is empty', async () => {
    const submitButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/
    )
    const addButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.addSubjectBtn/
    )

    fireEvent.click(addButton)
    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    await act(async () => {
      fireEvent.change(professionalSubjects[0], {
        target: { value: '' }
      })
    })

    expect(submitButton).toBeDisabled()
  })

  it('should create SubjectGroup list according to passed initial values (modal edit mode)', async () => {
    await waitFor(() => {
      const professionalSubjects = screen.getAllByLabelText(
        /editProfilePage.profile.professionalTab.subject/
      )

      initialValues.subjects.forEach((subject, index) => {
        const subjectElement = professionalSubjects[index]
        expect(subjectElement.value).toMatch(new RegExp(subject.name, 'i'))
      })
    })
  })
})
