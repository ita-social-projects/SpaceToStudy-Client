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

  it('should add a new subject', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getAllByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )

    waitFor(() => {
      fireEvent.click(firstField[0])
      fireEvent.focus(firstField[0])
      fireEvent.change(firstField[0], {
        target: { value: 'Category 2' }
      })
      fireEvent.keyDown(firstField[0], { key: 'ArrowDown' })
      fireEvent.keyDown(firstField[0], { key: 'Enter' })
    })

    expect(firstField[0].value).toBe('Category 2')

    const secondField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )

    waitFor(() => {
      fireEvent.click(secondField)
      fireEvent.focus(secondField)
      fireEvent.change(secondField, {
        target: { value: 'Subject 2' }
      })
      fireEvent.keyDown(secondField, { key: 'ArrowDown' })
      fireEvent.keyDown(secondField, { key: 'Enter' })
    })
  })

  it('should delete a subject', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getAllByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )

    waitFor(() => {
      fireEvent.click(firstField[0])
      fireEvent.focus(firstField[0])
      fireEvent.change(firstField[0], {
        target: { value: 'Category 2' }
      })
      fireEvent.keyDown(firstField[0], { key: 'ArrowDown' })
      fireEvent.keyDown(firstField[0], { key: 'Enter' })
    })

    expect(firstField[0].value).toBe('Category 2')

    const secondField = screen.getByLabelText(
      'becomeTutor.categories.subjectLabel'
    )

    waitFor(() => {
      fireEvent.click(secondField)
      fireEvent.focus(secondField)
      fireEvent.change(secondField, {
        target: { value: 'Subject 2' }
      })
      fireEvent.keyDown(secondField, { key: 'ArrowDown' })
      fireEvent.keyDown(secondField, { key: 'Enter' })
    })

    expect(secondField.value).toBe('')

    waitFor(() => {
      fireEvent.click(addSubject)
    })
  })

  it('should show an error message "All fields must be filled"', () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    waitFor(() => {
      fireEvent.click(firstField)
      fireEvent.change(firstField, { target: { value: 'Mathemat' } })
      fireEvent.keyDown(firstField, { key: 'ArrowDown' })
      fireEvent.keyDown(firstField, { key: 'Enter' })

      fireEvent.click(addSubject)
    })

    expect(screen.getByTestId('error-subject')).toHaveTextContent(
      'becomeTutor.categories.emptyFields'
    )
  })

  it('should show an error message "You have the same subject"', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    waitFor(() => {
      fireEvent.click(firstField)
      fireEvent.focus(firstField)
      fireEvent.change(firstField, { target: { value: 'Category 2' } })
      fireEvent.keyDown(firstField, { key: 'ArrowDown' })
      fireEvent.keyDown(firstField, { key: 'Enter' })
    })

    const secondField = screen.getByLabelText(
      /becomeTutor.categories.subjectLabel/i
    )

    waitFor(() => {
      fireEvent.click(secondField)
      fireEvent.focus(secondField)
      fireEvent.change(secondField, {
        target: { value: 'Subject 2' }
      })
      fireEvent.keyDown(secondField, { key: 'ArrowDown' })
      fireEvent.keyDown(secondField, { key: 'Enter' })
      fireEvent.click(addSubject)

      fireEvent.click(firstField)
      fireEvent.focus(firstField)
      fireEvent.change(firstField, { target: { value: 'Category 2' } })
      fireEvent.keyDown(firstField, { key: 'ArrowDown' })
      fireEvent.keyDown(firstField, { key: 'Enter' })

      fireEvent.click(secondField)
      fireEvent.change(secondField, {
        target: { value: 'Subject 2' }
      })
      fireEvent.keyDown(secondField, { key: 'ArrowDown' })
      fireEvent.keyDown(secondField, { key: 'Enter' })
      fireEvent.click(addSubject)
      fireEvent.focus(addSubject)
    })

    const errorSubject = screen.getByTestId('error-subject')

    waitFor(() => {
      expect(errorSubject).toHaveTextContent(
        'becomeTutor.categories.sameSubject'
      )
    })
  })
})
