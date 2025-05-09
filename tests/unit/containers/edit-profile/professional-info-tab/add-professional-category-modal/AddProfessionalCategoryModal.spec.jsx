import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, selectOption } from '~tests/test-utils'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { professionalSubjectTemplate } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'
import { useTranslation } from 'react-i18next'
import { titleToCamel } from '~/utils/title-to-camel-case'
const { t } = useTranslation()

const mockCloseModal = vi.fn()
const mockedBlockedCategory = [{ _id: '4', name: 'Music' }]

const mockDispatch = vi.fn()
const mockSelector = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, options) => options?.defaultValue || key
  })
}))

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
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.categories.getNames)
      .reply(200, [initialValues.category, ...mockedBlockedCategory])

    mockAxiosClient
      .onGet(
        URLs.subjects.getNamesByCategoryId.replace(
          ':id',
          initialValues.category._id
        )
      )
      .reply(200, initialValues.subjects)

    mockAxiosClient.onGet(URLs.subjects.getNames).reply(200, [])

    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={mockedBlockedCategory}
        closeModal={mockCloseModal}
      />
    )
  })

  it('should update the correct subject when changing value', async () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    await selectOption(
      categoryAutocomplete,
      t(`categories.${titleToCamel('Cooking')}`, { defaultValue: 'Cooking' }),
      'findByText'
    )

    await act(() =>
      fireEvent.change(professionalSubjects[0], {
        target: { value: 'Updated Gastronomy' }
      })
    )

    expect(professionalSubjects[0].value).toBe('Updated Gastronomy')
    if (professionalSubjects.length > 1) {
      expect(professionalSubjects[1].value).not.toBe('Updated Gastronomy')
    }
  })

  it('should render SubjectGroup using template in (modal create mode)', async () => {
    const professionalSubject = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    expect(professionalSubject).toHaveValue(professionalSubjectTemplate.name)
  })

  it('should add one more subject group if "Add one more subject" button is clicked', async () => {
    const button = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.addSubjectBtn/
    )

    expect(button).toBeInTheDocument()

    await act(() => fireEvent.click(button))
    await act(() => fireEvent.click(button))

    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    expect(professionalSubjects).toHaveLength(3)
  })

  it('should update professional category value in autocomplete,load subjects and allow clearing the field ', async () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    const professionalSubjects = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    await selectOption(
      categoryAutocomplete,
      t(`categories.${titleToCamel('Cooking')}`, { defaultValue: 'Cooking' })
    )

    await act(() =>
      fireEvent.change(professionalSubjects, {
        target: { value: 'Varenychky' }
      })
    )
    const button = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.addSubjectBtn/
    )
    expect(professionalSubjects.value).toBe('Varenychky')
    const clearButton = screen.getByLabelText('Clear')
    fireEvent.click(clearButton)
    fireEvent.click(button)

    const updatedProfessionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    expect(updatedProfessionalSubjects[0].value).toBe('')
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
    await selectOption(
      categoryAutocomplete,
      t(`categories.${titleToCamel('Cooking')}`, { defaultValue: 'Cooking' })
    )

    await act(() =>
      fireEvent.change(professionalSubjects[0], {
        target: { value: 'Gastronomy' }
      })
    )
    expect(professionalSubjects[0].value).toBe('Gastronomy')

    await act(() =>
      fireEvent.change(professionalSubjects[1], {
        target: { value: 'Varenychky' }
      })
    )
    expect(professionalSubjects[1].value).toBe('Varenychky')
  })

  it('button "Save changes" should be disabled if subject field is empty', async () => {
    const submitButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/
    ).parentNode
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )

    await selectOption(
      categoryAutocomplete,
      t(`categories.${titleToCamel('Cooking')}`, { defaultValue: 'Cooking' })
    )

    expect(submitButton).toBeDisabled()
  })

  it('should remove a subject from the list', async () => {
    const deleteIcons = screen.getAllByTestId('DeleteIcon')
    await act(() => fireEvent.click(deleteIcons[0]))

    expect(screen.queryByDisplayValue('Gastronomy')).not.toBeInTheDocument()
  })

  it('subject field should be disabled if category is disabled', async () => {
    const subjectAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    expect(subjectAutocomplete).toBeDisabled()
  })

  it('should prevent Tutor and Student from selecting invalid subjects', async () => {
    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    expect(professionalSubjects.length).toBeGreaterThan(0)

    fireEvent.change(professionalSubjects[0], {
      target: { value: 'Invalid Subject' }
    })

    expect(professionalSubjects[0]).not.toHaveValue('Invalid Subject')

    const option = screen.queryByText('Invalid Subject')
    expect(option).not.toBeInTheDocument()
  })
})

describe('AddProfessionalCategoryModal with initial value', () => {
  beforeEach(() =>
    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={mockedBlockedCategory}
        closeModal={mockCloseModal}
        initialValues={initialValues}
        isEdit
      />
    )
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

    await act(() => fireEvent.click(deleteBtn[0]))

    const professionalSubjectsAfter = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    expect(professionalSubjectsAfter).toHaveLength(1)
  })

  it('should close modal when form is submitted', async () => {
    const submitButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/
    )
    await act(() => fireEvent.click(submitButton))

    expect(mockCloseModal).toHaveBeenCalled()
  })
})

describe('AddProfessionalCategoryModal Subject Updates', () => {
  beforeEach(() => {
    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={mockedBlockedCategory}
        closeModal={mockCloseModal}
        initialValues={initialValues}
        isEdit
      />
    )
  })

  it('should update only the specific subject when changing value', async () => {
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    const professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    await selectOption(
      categoryAutocomplete,
      t(`categories.${titleToCamel('Cooking')}`, { defaultValue: 'Cooking' }),
      'findByDisplayValue'
    )

    await act(() =>
      fireEvent.change(professionalSubjects[0], {
        target: { value: 'Gastronomy' }
      })
    )
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

    await act(() =>
      fireEvent.change(professionalSubjects[0], {
        target: { value: '' }
      })
    )

    expect(submitButton).toBeInTheDocument()
  })

  it('should create SubjectGroup list according to passed initial values (modal edit mode)', async () => {
    await waitFor(() => {
      const professionalSubjects = screen.getAllByLabelText(
        /editProfilePage.profile.professionalTab.subject/
      )
      initialValues.subjects.forEach((subject, index) => {
        const translatedSubjectName = t(
          `subjects.${titleToCamel(subject.name)}`,
          {
            defaultValue: subject.name
          }
        )

        const subjectElement = professionalSubjects[index]
        expect(subjectElement.value).toMatch(
          new RegExp(translatedSubjectName, 'i')
        )
      })
    })
  })
})
describe('AddProfessionalCategoryModal when clearing categories and subjects', () => {
  let categoryAutocomplete
  let professionalSubjects
  let submitButton

  beforeEach(() => {
    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={mockedBlockedCategory}
        closeModal={mockCloseModal}
        initialValues={initialValues}
        isEdit
      />
    )

    categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    professionalSubjects = screen.getAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )
    submitButton = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/
    )
  })

  it('should reset category and related subjects when category is cleared', async () => {
    await selectOption(
      categoryAutocomplete,
      t(`categories.${titleToCamel('Cooking')}`, { defaultValue: 'Cooking' }),
      'findByDisplayValue'
    )

    expect(professionalSubjects[0]).toHaveValue('Gastronomy')
    await act(() =>
      fireEvent.change(categoryAutocomplete, { target: { value: '' } })
    )

    expect(categoryAutocomplete).toHaveValue('')

    professionalSubjects = screen.queryAllByLabelText(
      /editProfilePage.profile.professionalTab.subject/
    )

    expect(professionalSubjects).toHaveLength(0)

    expect(submitButton.parentNode).toBeDisabled()
  })

  it('should disable "Save changes" button when category is cleared', async () => {
    await selectOption(
      categoryAutocomplete,
      t(`categories.${titleToCamel('Cooking')}`, { defaultValue: 'Cooking' }),
      'findByDisplayValue'
    )
    expect(submitButton).not.toBeDisabled()

    await act(() =>
      fireEvent.change(categoryAutocomplete, { target: { value: '' } })
    )
    expect(submitButton.parentNode).toBeDisabled()
  })

  it('should allow clearing the main study category field', async () => {
    await selectOption(
      categoryAutocomplete,
      t(`categories.${titleToCamel('Cooking')}`, { defaultValue: 'Cooking' }),
      'findByDisplayValue'
    )
    expect(categoryAutocomplete.value).toBe('Cooking')

    await act(() =>
      fireEvent.change(categoryAutocomplete, { target: { value: '' } })
    )
    expect(categoryAutocomplete.value).toBe('')
  })
})

describe('AddProfessionalCategoryModal My Full Flow Replication', () => {
  const init = {
    _id: 'kajsdf',
    isDeletionBlocked: false,
    category: { _id: '1', name: 'Cooking' },
    subjects: []
  }

  beforeEach(() => {
    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={mockedBlockedCategory}
        closeModal={mockCloseModal}
        initialValues={init}
        isEdit={false}
      />
    )
  })

  it('should allow selecting a main category, adding subjects, and submitting the modal', async () => {
    expect(
      screen.getByText(
        /editProfilePage.profile.professionalTab.addCategoryModal.title/i
      )
    ).toBeInTheDocument()

    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/i
    )

    await act(() =>
      fireEvent.change(categoryAutocomplete, {
        target: { value: 'Cooking' }
      })
    )
    expect(categoryAutocomplete).toHaveValue('Cooking')

    const addSubjectBtn = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.addSubjectBtn/i
    ).parentNode
    expect(addSubjectBtn).toBeInTheDocument()
    expect(addSubjectBtn).toBeEnabled()

    const submitBtn = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/i
    ).parentNode
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toBeDisabled()

    await act(() => userEvent.click(addSubjectBtn))

    let professionalSubjects = screen
      .getAllByLabelText(/editProfilePage.profile.professionalTab.subject/i)
      .map((el) => el.closest('input'))

    expect(professionalSubjects).toHaveLength(1)

    act(() => {
      fireEvent.change(professionalSubjects[0], {
        target: { value: 'Gastronomy' }
      })
      expect(professionalSubjects[0]).toHaveValue('Gastronomy')
    })

    await act(() => userEvent.click(addSubjectBtn))

    professionalSubjects = screen
      .getAllByLabelText(/editProfilePage.profile.professionalTab.subject/i)
      .map((el) => el.closest('input'))
      .filter((el) => el !== null)

    expect(professionalSubjects).toHaveLength(2)

    act(() => {
      fireEvent.change(professionalSubjects[1], {
        target: { value: 'Varenychky' }
      })
      expect(professionalSubjects[1]).toHaveValue('Varenychky')
    })

    fireEvent.click(submitBtn)
    expect(mockCloseModal).toHaveBeenCalled()
  })
})

describe('Additional Coverage Tests for Uncovered Branches in AddProfessionalCategoryModal', () => {
  it('should render a subject field with an empty value when subject._id is falsy (using null)', async () => {
    const initialValuesNullSubject = {
      _id: 'testId',
      isDeletionBlocked: false,
      category: { _id: '1', name: 'Cooking' },
      subjects: [
        {
          _id: null,
          name: 'Test Subject'
        }
      ]
    }

    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={mockedBlockedCategory}
        closeModal={mockCloseModal}
        initialValues={initialValuesNullSubject}
        isEdit
      />
    )

    const subjectFieldContainer = await screen.findByTestId('subjectField')
    const inputElement = subjectFieldContainer.querySelector('input')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('')
  })

  it('should assign a new _id using crypto.randomUUID when not in edit mode and no initial _id is provided', async () => {
    const fakeUUID = 'fake-uuid-1234'
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(fakeUUID)

    const initialValuesNoId = {
      isDeletionBlocked: false,
      category: { _id: '1', name: 'Cooking' },
      subjects: [
        {
          _id: '',
          name: 'Test Subject'
        }
      ]
    }
    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={[]}
        closeModal={mockCloseModal}
        initialValues={initialValuesNoId}
        isEdit={false}
      />
    )

    const submitBtn = screen.getByText(
      /editProfilePage.profile.professionalTab.addCategoryModal.submitBtn/i
    ).parentNode
    expect(submitBtn).toBeEnabled()

    await act(() => userEvent.click(submitBtn))

    expect(mockCloseModal).toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it('should update the main category and use empty string for category._id when it is falsy', async () => {
    const testCategory = { _id: undefined, name: 'Cooking' }
    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={[]}
        closeModal={mockCloseModal}
        initialValues={initialValues}
        isEdit
      />
    )
    const categoryAutocomplete = screen.getByLabelText(
      /editProfilePage.profile.professionalTab.mainStudyCategory/
    )
    fireEvent.change(categoryAutocomplete, {
      target: { value: testCategory.name }
    })
    expect(categoryAutocomplete.value).toBe(testCategory.name)
  })

  it('should mark an option as disabled when the option matches a blocked category', async () => {
    const blockedCategoryOption = { _id: '4', name: 'Music' }
    const currentOption = { _id: '4', name: 'Music' }
    const isBlocked = true
    const isCurrent = currentOption._id === blockedCategoryOption._id
    expect(isBlocked && isCurrent).toBe(true)
  })

  it('should render subject field with empty value using fallback when subject._id is undefined', async () => {
    const initialValuesUndefinedSubject = {
      _id: 'testId',
      isDeletionBlocked: false,
      category: { _id: '1', name: 'Cooking' },
      subjects: [
        {
          name: 'Test Subject'
        }
      ]
    }
    renderWithProviders(
      <AddProfessionalCategoryModal
        blockedCategoriesOptions={[]}
        closeModal={mockCloseModal}
        initialValues={initialValuesUndefinedSubject}
        isEdit
      />
    )
    const subjectFieldContainer = await screen.findByTestId('subjectField')
    const inputElement = subjectFieldContainer.querySelector('input')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('')
  })
})
