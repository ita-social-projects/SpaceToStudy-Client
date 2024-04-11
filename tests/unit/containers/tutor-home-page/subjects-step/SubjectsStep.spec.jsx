import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { StepProvider } from '~/context/step-context'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

vi.mock('~/services/category-service')
vi.mock('~/services/subject-service')

import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'

const mockCategoriesNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' },
  { _id: '3', name: 'Category 3' },
  { _id: '4', name: 'Category 4' }
]

const mockSubjectsNames = [
  { _id: '5', name: 'Subject 1' },
  { _id: '6', name: 'Subject 2' }
]

categoryService.getCategoriesNames.mockResolvedValue({
  data: mockCategoriesNames
})

subjectService.getSubjectsNames.mockResolvedValue({
  data: mockSubjectsNames
})

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

const chooseOption = (name) => {
  const firstOption = screen.getByRole('option', {
    name
  })
  fireEvent.click(firstOption)
}

const chooseCategoryOrSubject = async (inputField, value) => {
  await waitFor(() => {
    fireEvent.click(inputField)
    fireEvent.change(inputField, {
      target: { value }
    })
  })

  chooseOption(value)
}

describe('SubjectsStep test with some data', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <StepProvider
          initialValues={initialValues}
          stepLabels={tutorStepLabels}
        >
          <SubjectsStep btnsBox={btnsBox} stepLabel={'subjects'} />
        </StepProvider>
      )
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render SubjectsStep title', () => {
    const title = screen.getByText('becomeTutor.categories.title')
    expect(title).toBeInTheDocument()
  })

  it('should add a new subject and delete a subject', async () => {
    const addSubject = screen.getByTestId('add-subject')
    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    expect(firstField.value).toBe('')

    await chooseCategoryOrSubject(firstField, 'Category 2')
    expect(firstField.value).toBe('Category 2')

    const secondField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )
    await chooseCategoryOrSubject(secondField, 'Subject 1')
    expect(secondField.value).toBe('Subject 1')

    await chooseCategoryOrSubject(firstField, 'Category 1')
    expect(secondField.value).toBe('')

    await chooseCategoryOrSubject(secondField, 'Subject 1')

    fireEvent.click(addSubject)

    const chip = screen.getByTestId('chip')
    expect(chip).toBeInTheDocument()

    const deleteChipButton = screen.getByTestId('CloseRoundedIcon')
    fireEvent.click(deleteChipButton)
    expect(chip).not.toBeInTheDocument()
  })

  it('should show an error message "All fields must be filled"', async () => {
    const addSubject = screen.getByTestId('add-subject')
    const firstField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    await chooseCategoryOrSubject(firstField, 'Category 3')

    fireEvent.click(addSubject)

    const errorMessage = screen.getByText('becomeTutor.categories.emptyFields')
    expect(errorMessage).toBeInTheDocument()
  })

  it('should show an error message "You have the same subject"', async () => {
    const addSubject = screen.getByTestId('add-subject')
    const firstField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    const secondField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )

    for (let i = 0; i < 2; i++) {
      await chooseCategoryOrSubject(firstField, 'Category 2')
      await chooseCategoryOrSubject(secondField, 'Subject 2')
      fireEvent.click(addSubject)
    }

    let errorMessage = screen.getByText('becomeTutor.categories.sameSubject')
    expect(errorMessage).toBeInTheDocument()

    await chooseCategoryOrSubject(secondField, 'Subject 1')
    fireEvent.click(addSubject)

    errorMessage = screen.queryByText('becomeTutor.categories.sameSubject')
    expect(errorMessage).toBeNull()
  })
})
