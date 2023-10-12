import QuestionEditor from '~/components/question-editor/QuestionEditor'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { beforeEach, describe } from 'vitest'

const data = {
  type: 'openAnswer',
  text: '',
  openAnswer: '',
  answers: []
}
const handleInputChange = vi.fn()
const handleNonInputValueChange = vi.fn()

const props = {
  data,
  handleInputChange,
  handleNonInputValueChange,
  onCancel: vi.fn(),
  onSave: vi.fn()
}

describe('QuestionEditor component', () => {
  beforeEach(() => {
    renderWithProviders(<QuestionEditor {...props} />)
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
})
