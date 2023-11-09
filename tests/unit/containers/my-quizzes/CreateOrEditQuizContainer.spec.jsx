import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'

const setTitle = vi.fn()
const setDescription = vi.fn()

describe('CreateOrEditQuizContainer', () => {
  beforeEach(() => {
    renderWithProviders(
      <CreateOrEditQuizContainer
        setDescription={setDescription}
        setTitle={setTitle}
      />
    )
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
})
