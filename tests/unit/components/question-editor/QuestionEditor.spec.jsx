import QuestionEditor from '~/components/question-editor/QuestionEditor'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { afterEach, beforeEach, describe, expect } from 'vitest'

const handleInputChange = vi.fn()
const handleNonInputValueChange = vi.fn()
const onEditMock = vi.fn()
const onSave = vi.fn()

const props = {
  handleInputChange,
  handleNonInputValueChange,
  onCancel: vi.fn(),
  onEdit: onEditMock,
  onSave,
  isQuizQuestion: true
}

describe('QuestionEditor component with an open question type', () => {
  const openQuestionData = {
    type: 'openAnswer',
    title: 'question 1',
    category: null,
    text: 'question text',
    openAnswer: 'answer',
    answers: []
  }

  const openQuestionProps = {
    ...props,
    data: openQuestionData
  }

  beforeEach(() => {
    renderWithProviders(<QuestionEditor {...openQuestionProps} />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should renders question input field', () => {
    const questionInput = screen.getByLabelText('questionPage.question')
    expect(questionInput).toBeInTheDocument()
  })

  it('should renders a open answer', () => {
    const appSelect = screen.getByTestId('app-select')

    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'openAnswer' }
    })

    const multipleChoiceRadio = screen.getByText(
      'questionPage.questionType.openAnswer'
    )
    expect(multipleChoiceRadio).toBeInTheDocument()
  })

  it('should change question type', () => {
    const appSelect = screen.getByTestId('app-select')

    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'oneAnswer' }
    })

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('should change question and answer input fields', () => {
    const appSelect = screen.getByTestId('app-select')

    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'openAnswer' }
    })

    const questionInput = screen.getByLabelText('questionPage.question')
    const answerInput = screen.getByLabelText('questionPage.answer')

    fireEvent.change(questionInput, {
      target: { value: 'New question' }
    })

    fireEvent.change(answerInput, {
      target: { value: 'New answer' }
    })

    expect(handleInputChange).toHaveBeenCalled()
  })

  it('should click on edit title and category', () => {
    const moreIcon = screen.getByTestId('MoreVertIcon')

    fireEvent.click(moreIcon)

    const updateIcon = screen.getByTestId('EditIcon')

    fireEvent.click(updateIcon)

    expect(onEditMock).toHaveBeenCalled()
  })

  it('should save the question', () => {
    const saveButton = screen.getByRole('button', { name: 'common.save' })

    fireEvent.click(saveButton)

    expect(onSave).toHaveBeenCalled()
  })
})

describe('QuestionEditor component with a multiple choice question type', () => {
  const multipleChoiceData = {
    type: 'multipleChoice',
    title: 'Question 2',
    category: null,
    text: 'Question',
    openAnswer: '',
    answers: [{ text: 'Answer 1' }, { text: 'Answer 2' }]
  }

  const multipleChoiceProps = {
    ...props,
    data: multipleChoiceData
  }

  beforeEach(() => {
    renderWithProviders(<QuestionEditor {...multipleChoiceProps} />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render answer options', () => {
    const answerInput = screen.getByDisplayValue('Answer 1')

    expect(answerInput).toBeInTheDocument()
  })

  it('should change the answer field value', () => {
    const answerInput = screen.getByDisplayValue('Answer 1')

    fireEvent.change(answerInput, {
      target: { value: 'New answer' }
    })

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('should change the checkbox state', () => {
    const [answerCheckbox] = screen.getAllByRole('checkbox')

    fireEvent.click(answerCheckbox)

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('should add a new answer', () => {
    const addNewAnswer = screen.getByTestId('addNewAnswerBtn')

    fireEvent.click(addNewAnswer)

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('should delete an answer', () => {
    const [deleteAnswerBtn] = screen.getAllByTestId('CloseIcon')

    fireEvent.click(deleteAnswerBtn)

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('should change question type and answers accordingly', () => {
    const appSelect = screen.getByTestId('app-select')

    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'oneAnswer' }
    })

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })
})

describe('QuestionEditor component with a single choice question type', () => {
  const singleChoiceData = {
    type: 'oneAnswer',
    title: 'Question 3',
    category: null,
    text: 'Question',
    openAnswer: '',
    answers: [{ text: 'Answer 1' }, { text: 'Answer 2' }]
  }

  const singleChoiceProps = {
    ...props,
    data: singleChoiceData
  }

  beforeEach(() => {
    renderWithProviders(<QuestionEditor {...singleChoiceProps} />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render answer options', () => {
    const answerInput = screen.getByDisplayValue('Answer 1')

    expect(answerInput).toBeInTheDocument()
  })

  it('should change the radio input state', () => {
    const [answerRadio] = screen.getAllByRole('radio')

    fireEvent.click(answerRadio)

    expect(handleNonInputValueChange).toHaveBeenCalled()
  })
})
