import { fireEvent, screen } from '@testing-library/react'

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
  _id: '123',
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
const mockedOpenAnswerQuestion = {
  title: 'Question title',
  text: 'Question text',
  answers: [
    {
      id: 0,
      text: 'Answer 1',
      isCorrect: true
    }
  ],
  author: 'Question author',
  type: 'openAnswer',
  category: {
    _id: 'mockedId',
    name: 'Category name'
  }
}

describe('CreateOrEditQuizQuestion component without question', () => {
  beforeEach(() => {
    renderWithProviders(
      <TestSnackbar>
        <CreateOrEditQuizQuestion
          onCancel={onCancel}
          setQuestions={setQuestions}
        />
      </TestSnackbar>
    )
  })

  it('should change question and anwer inputs', () => {
    const input = screen.getByRole('textbox')
    const addNewAnswerBtn = screen.getByTestId('addNewAnswerBtn')

    fireEvent.click(addNewAnswerBtn)

    const newAnswerInput = screen.getByPlaceholderText(
      'questionPage.writeYourAnswer'
    )

    fireEvent.change(newAnswerInput, { target: { value: 'test' } })
    fireEvent.change(input, { target: { value: 'test' } })

    expect(newAnswerInput).toHaveValue('test')
    expect(input).toHaveValue('test')
  })

  it('should call onCancel when clicking cancel button', () => {
    const cancelBtn = screen.getByText('common.cancel')

    fireEvent.click(cancelBtn)

    expect(onCancel).toHaveBeenCalled()
  })

  it('should save a new question in the database', async () => {
    mockAxiosClient
      .onPost(URLs.resources.questions.post)
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

  it('should call onCreateQuestion with openAnswer data', async () => {
    mockAxiosClient
      .onPost(URLs.resources.questions.post)
      .reply(200, { data: mockedOpenAnswerQuestion })
    const createQuestionSpy = vi.spyOn(ResourceService, 'createQuestion')
    const modalSaveBtn = screen.getByText('common.save')
    const modalInput = screen.getByRole('textbox')

    fireEvent.change(modalInput, { target: { value: 'test' } })
    fireEvent.click(modalSaveBtn)
    const appSelect = screen.getByTestId('app-select')

    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'openAnswer' }
    })
    const questionInput = screen.getByLabelText('questionPage.question')
    fireEvent.change(questionInput, { target: { value: 'Question' } })

    const addNewAnswerBtn = screen.getByTestId('addNewAnswerBtn')
    fireEvent.click(addNewAnswerBtn)

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
  beforeEach(() => {
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

  it('should show a snackbar after succesfull update', async () => {
    mockAxiosClient
      .onPatch(
        URLs.resources.questions.patch.replace(':id', mockedQuestion._id)
      )
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
      .onPatch(
        URLs.resources.questions.patch.replace(':id', mockedQuestion._id)
      )
      .reply(404, fakeError)
    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    const snackbar = await screen.findByText(`errors.${fakeError.code}`)

    expect(snackbar).toBeInTheDocument()
  })

  it('should clear answers when changing type to openAnswer', () => {
    const appSelect = screen.getByTestId('app-select')

    fireEvent.change(appSelect, { target: { value: 'openAnswer' } })

    expect(screen.queryByText('Answer 1')).not.toBeInTheDocument()
  })
  it('should close modal on cancel button click', () => {
    const cancelBtn = screen.getByText('common.cancel')

    fireEvent.click(cancelBtn)

    expect(onCancel).toHaveBeenCalled()
  })

  it('should clear answers when changing type to openAnswer', () => {
    const appSelect = screen.getByTestId('app-select')

    fireEvent.change(appSelect, { target: { value: 'openAnswer' } })

    expect(screen.queryByText('Answer 1')).not.toBeInTheDocument()
  })

  it('should close modal on cancel button click', () => {
    const cancelBtn = screen.getByText('common.cancel')

    fireEvent.click(cancelBtn)

    expect(onCancel).toHaveBeenCalled()
  })
})
