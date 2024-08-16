import { fireEvent, screen, waitFor } from '@testing-library/react'

import CreateOrEditQuizQuestion from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion'
import {
  renderWithProviders,
  mockAxiosClient,
  TestSnackbar
} from '~tests/test-utils'
import { ResourceService } from '~/services/resource-service'
import { URLs } from '~/constants/request'

const setQuestions = vi.fn()
const onCancel = vi.fn()

const mockedQuestion = {
  title: 'Question title',
  text: 'Question text',
  answers: [
    { text: 'Answer 1', isCorrect: true },
    { text: 'Answer 2', isCorrect: false }
  ],
  author: 'Question author',
  type: 'oneAnswer',
  category: {
    _id: 'mockedId',
    name: 'Category name'
  }
}

describe('CreateOrEditQuizQuestion component without question', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <TestSnackbar>
          <CreateOrEditQuizQuestion
            onCancel={onCancel}
            setQuestions={setQuestions}
          />
        </TestSnackbar>
      )
    })
  })

  it('should render modal', () => {
    const modalText = screen.getByText(
      'myResourcesPage.quizzes.createNewQuestion'
    )

    expect(modalText).toBeInTheDocument()
  })

  it('should click on close button', () => {
    const modalText = screen.getByText(
      'myResourcesPage.quizzes.createNewQuestion'
    )
    const cancelBtn = screen.getByText('common.cancel')

    fireEvent.click(cancelBtn)

    expect(onCancel).toHaveBeenCalled()
    expect(modalText).not.toBeInTheDocument()
  })

  it('should change title input', () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(input.value).toBe('test')
  })

  it('should click on save button', () => {
    const saveBtn = screen.getByText('common.save')
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(saveBtn)

    expect(onCancel).toHaveBeenCalled()

    const addNewQuestionText = screen.getByText('questionPage.addNewOne')

    expect(addNewQuestionText).toBeInTheDocument()
  })

  it('should save a new question in the database', async () => {
    mockAxiosClient
      .onPost(`${URLs.resources.questions.post}`)
      .reply(200, { data: mockedQuestion })
    const createQuestionSpy = vi.spyOn(ResourceService, 'createQuestion')
    const modalSaveBtn = screen.getByText('common.save')
    const modalInput = screen.getByRole('textbox')

    fireEvent.change(modalInput, { target: { value: 'test' } })
    fireEvent.click(modalSaveBtn)

    const questionInput = screen.getByLabelText('questionPage.question')
    fireEvent.change(questionInput, { target: { value: 'Question' } })

    const addNewAnswerBtn = screen.getByTestId('addNewAnswerBtn')
    fireEvent.click(addNewAnswerBtn)

    const answerInput = screen.getByPlaceholderText(
      'questionPage.writeYourAnswer'
    )
    fireEvent.change(answerInput, { target: { value: 'answer' } })

    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    const snackbar = await screen.findByText(
      'myResourcesPage.questions.successAddedQuestion'
    )

    expect(snackbar).toBeInTheDocument()
    expect(createQuestionSpy).toHaveBeenCalled()
  })
})

describe('CreateOrEditQuizQuestion component with a question', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <TestSnackbar>
          <CreateOrEditQuizQuestion
            onCancel={onCancel}
            question={mockedQuestion}
            setQuestions={setQuestions}
          />
        </TestSnackbar>
      )
    })
  })

  it('should render QuestionEditor', () => {
    const questionEditorTextField = screen.getByLabelText(
      'questionPage.question'
    )
    expect(questionEditorTextField).toBeInTheDocument()
  })

  it('should change input text', () => {
    const textField = screen.getByLabelText('questionPage.question')

    fireEvent.change(textField, { target: { value: 'test' } })

    expect(textField.value).toBe('test')
  })

  it('should update a question in the database', () => {
    const updateQuestionSpy = vi.spyOn(ResourceService, 'updateQuestion')
    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    expect(updateQuestionSpy).toHaveBeenCalled()
  })

  it('should show a snackbar after succesfull update', async () => {
    mockAxiosClient
      .onPatch(`${URLs.resources.questions.patch}`)
      .reply(200, { data: mockedQuestion })
    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    const snackbar = await screen.findByText(
      'myResourcesPage.questions.successAddedQuestion'
    )

    expect(snackbar).toBeInTheDocument()
  })

  it('should show a snackbar after getting an error', async () => {
    const fakeError = { code: 'mockedErrorCode', message: 'test error' }
    mockAxiosClient
      .onPatch(`${URLs.resources.questions.patch}`)
      .reply(404, fakeError)
    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    const snackbar = await screen.findByText(`errors.${fakeError.code}`)

    expect(snackbar).toBeInTheDocument()
  })
})
