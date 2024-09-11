import { fireEvent, screen } from '@testing-library/react'

import FaqBlock from '~/containers/offer-page/faq-block/FaqBlock'
import { renderWithProviders } from '~tests/test-utils'

const handleNonInputValueChange = vi.fn()

const mockDate = 1487076708000
Date.now = vi.fn(() => mockDate)

const emptyQuestion = { question: '', answer: '', id: `${mockDate}` }
const newQuestion = { question: 'New Question', answer: 'New Answer' }

const generateQuestions = (length = 1) => {
  return Array.from({ length }, (_, index) => ({
    ...emptyQuestion,
    id: String(mockDate + index)
  }))
}

const renderAndMock = (questions = generateQuestions()) => {
  const data = { FAQ: questions }
  return renderWithProviders(
    <FaqBlock
      handleNonInputValueChange={handleNonInputValueChange}
      data={data}
    />
  )
}

describe('FaqBlock component', () => {
  it('should update FAQ item when input changes', () => {
    renderAndMock()

    const questionInput = screen.getByLabelText('offerPage.labels.question')
    const answerInput = screen.getByLabelText('offerPage.labels.answer')

    fireEvent.change(questionInput, {
      target: { value: newQuestion.question }
    })

    expect(handleNonInputValueChange).toHaveBeenCalledWith('FAQ', [
      { ...emptyQuestion, question: newQuestion.question }
    ])

    fireEvent.change(answerInput, {
      target: { value: newQuestion.answer }
    })

    expect(handleNonInputValueChange).toHaveBeenCalledWith('FAQ', [
      { ...emptyQuestion, answer: newQuestion.answer }
    ])
  })

  it('should add question', () => {
    renderAndMock()

    const addButton = screen.getByText('button.addQuestion')
    fireEvent.click(addButton)

    expect(handleNonInputValueChange).toHaveBeenCalledWith('FAQ', [
      emptyQuestion,
      emptyQuestion
    ])
  })

  it('should show error when questions limit is reached', () => {
    const initialQuestions = generateQuestions(5)
    renderAndMock(initialQuestions)

    const addButton = screen.getByText('button.addQuestion')
    fireEvent.click(addButton)

    const errorMessage = screen.getByText('offerPage.errorMessages.faq')
    expect(errorMessage).toBeInTheDocument()
  })

  it('should remove question', () => {
    const initialQuestions = generateQuestions(2)
    renderAndMock(initialQuestions)

    const closeButton = screen.getAllByTestId('CloseRoundedIcon')[0]
    fireEvent.click(closeButton)

    expect(handleNonInputValueChange).toHaveBeenCalledWith(
      'FAQ',
      [initialQuestions[1]]
    )
  })
})
