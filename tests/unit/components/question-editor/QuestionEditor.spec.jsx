import QuestionEditor from '~/components/question-editor/QuestionEditor'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { beforeEach, describe } from 'vitest'

describe('QuestionEditor component', () => {
  beforeEach(() => {
    renderWithProviders(<QuestionEditor />)
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

  it('should renders a radio buttons for one answer', () => {
    const appSelect = screen.getByTestId('app-select')

    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'oneAnswer' }
    })

    const multipleChoiceRadio = screen.getByText(
      'questionPage.questionType.oneAnswer'
    )
    expect(multipleChoiceRadio).toBeInTheDocument()
  })

  it('should add a new one answer', () => {
    const addNewOne = screen.getByText('questionPage.addNewOne')

    fireEvent.click(addNewOne)
    const answer = screen.getByPlaceholderText('questionPage.writeYourAnswer')

    fireEvent.change(answer, {
      target: { value: 'Changed answer' }
    })

    const inputValue = screen.getByDisplayValue('Changed answer')

    expect(inputValue).toBeInTheDocument()
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

    const questionValue = screen.getByDisplayValue('New question')
    const answerValue = screen.getByDisplayValue('New answer')

    expect(questionValue).toBeInTheDocument()
    expect(answerValue).toBeInTheDocument()
  })

  it('should update answer.isCorrect for single choice questions', () => {
    const appSelect = screen.getByTestId('app-select')
    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'singleChoice' }
    })

    const addNewOne = screen.getByText('questionPage.addNewOne')
    fireEvent.click(addNewOne)

    const firstAnswerCheckbox = screen.getByRole('checkbox', { name: '' })

    fireEvent.click(firstAnswerCheckbox)

    expect(firstAnswerCheckbox).toBeChecked()

    const otherAnswerCheckboxes = screen.getAllByRole('checkbox', { name: '' })
    otherAnswerCheckboxes.forEach((checkbox, index) => {
      if (index !== 0) {
        expect(checkbox).not.toBeChecked()
      }
    })
  })

  it('should update answer.isCorrect for single choice questions', () => {
    const appSelect = screen.getByTestId('app-select')
    fireEvent.click(appSelect)
    fireEvent.change(appSelect, {
      target: { value: 'oneAnswer' }
    })

    const addNewOne = screen.getByText('questionPage.addNewOne')
    fireEvent.click(addNewOne)

    const answer = screen.getByPlaceholderText('questionPage.writeYourAnswer')

    fireEvent.change(answer, {
      target: { value: 'New answer' }
    })
    fireEvent.click(addNewOne)

    const firstAnswerRadio = screen.getAllByRole('radio')[0]
    const secondAnswerRadio = screen.getAllByRole('radio')[1]

    fireEvent.click(firstAnswerRadio)
    fireEvent.click(secondAnswerRadio)

    expect(firstAnswerRadio).not.toBeChecked()
    expect(secondAnswerRadio).toBeChecked()
  })

  it('should delete a radio button', () => {
    const addNewOne = screen.getByText('questionPage.addNewOne')
    fireEvent.click(addNewOne)

    const answer = screen.getByPlaceholderText('questionPage.writeYourAnswer')

    fireEvent.change(answer, {
      target: { value: 'New answer' }
    })

    fireEvent.click(addNewOne)
    const deleteButtons = screen.getAllByTestId('CloseIcon')

    fireEvent.click(deleteButtons[0])

    const remainingAnswers = screen.getAllByRole('checkbox')
    expect(remainingAnswers.length - 1).toBe(1)
  })
})
