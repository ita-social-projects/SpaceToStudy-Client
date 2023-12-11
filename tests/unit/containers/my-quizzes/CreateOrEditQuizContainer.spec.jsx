import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'

const setTitle = vi.fn()
const setDescription = vi.fn()

describe('CreateOrEditQuizContainer', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <CreateOrEditQuizContainer
          setDescription={setDescription}
          setTitle={setTitle}
        />
      )
    })
  })

  it('should change title and description inputs', () => {
    const titleInput = screen.getByLabelText(
      'myResourcesPage.quizzes.defaultNewTitle'
    )
    const descriptionInput = screen.getByLabelText(
      'myResourcesPage.quizzes.defaultNewDescription'
    )

    fireEvent.change(titleInput, { target: { value: 'quiz title' } })
    fireEvent.change(descriptionInput, {
      target: { value: 'quiz description' }
    })

    expect(titleInput.value).toBe('quiz title')
    expect(descriptionInput.value).toBe('quiz description')
  })

  it('should click on save button', () => {
    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    expect(setTitle).toHaveBeenCalled()
    expect(setDescription).toHaveBeenCalled()
  })

  it('should render create new question form', () => {
    const btnAddQuestion = screen.getByText(
      'myResourcesPage.quizzes.createNewQuestion'
    )

    waitFor(() => fireEvent.click(btnAddQuestion))

    const formTitle = screen.getByText(/title:/i)

    expect(formTitle).toBeInTheDocument()
  })

  it('should render add questions form', () => {
    const btnAddNewQuestion = screen.getByText(
      'myResourcesPage.quizzes.addQuestion'
    )

    waitFor(() => fireEvent.click(btnAddNewQuestion))

    const formTitle = screen.getByText('myResourcesPage.questions.add')

    expect(formTitle).toBeInTheDocument()
  })
})
