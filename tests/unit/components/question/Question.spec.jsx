import { screen, render, fireEvent } from '@testing-library/react'
import Question from '~/components/question/Question'

const mockedQuestion = {
  id: '1',
  title: 'About Philosophy',
  answers: [
    {
      id: '1',
      text: 'Buddha Shakyamuni',
      isCorrect: true
    },
    {
      id: '2',
      text: 'Jordan Belfort',
      isCorrect: false
    }
  ],
  text: 'Who created buddhism?',
  category: {
    _id: 'some-text-id-123',
    name: 'Philosophy'
  }
}

const setQuestionsMock = vi.fn()
const setEditableItemIdMock = vi.fn()

describe('Question', () => {
  beforeEach(() => {
    render(
      <Question
        question={mockedQuestion}
        setEditableItemId={setEditableItemIdMock}
        setQuestions={setQuestionsMock}
      />
    )
  })

  it('render question text', () => {
    const questionText = screen.getByText(mockedQuestion.text)

    expect(questionText).toBeInTheDocument()
  })

  it('render question category', () => {
    const category = screen.getByText(mockedQuestion.category.name)

    expect(category).toBeInTheDocument()
  })

  it('should update chosen category', () => {
    const moreIcon = screen.getByTestId('MoreVertIcon')

    fireEvent.click(moreIcon)

    const updateIcon = screen.getByTestId('EditIcon')

    fireEvent.click(updateIcon)

    expect(setEditableItemIdMock).toHaveBeenCalled()
  })

  it('should delete chosen category', () => {
    const moreIcon = screen.getByTestId('MoreVertIcon')

    fireEvent.click(moreIcon)

    const deleteIcon = screen.getByTestId('DeleteOutlineIcon')

    fireEvent.click(deleteIcon)

    expect(setQuestionsMock).toHaveBeenCalled()
  })
})
