import { fireEvent, screen } from '@testing-library/react'

import CreateOrEditQuizQuestion from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion'
import { renderWithProviders } from '~tests/test-utils'

const setQuestions = vi.fn()
const onCancel = vi.fn()

describe('CreateOrEditQuizQuestion component without question', () => {
  beforeEach(() => {
    renderWithProviders(
      <CreateOrEditQuizQuestion
        onCancel={onCancel}
        setQuestions={setQuestions}
      />
    )
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
})
