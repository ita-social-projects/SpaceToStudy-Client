import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'

vi.mock('~/hooks/use-categories-names', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: [
      { _id: '123', name: 'Category 1' },
      { _id: '456', name: 'Category 2' },
      { _id: '789', name: '' }
    ]
  })
}))

const initialCategory = 'initialCategory'
const route = '/categories/subjects?categoryId=123'
const mockState = {
  appMain: { userRole: 'tutor' }
}

const setTitle = vi.fn()
const setDescription = vi.fn()

describe('CreateOrEditQuizContainer', () => {
  beforeEach(() => {
    renderWithProviders(
      <CreateOrEditQuizContainer
        initialCategory={initialCategory}
        setDescription={setDescription}
        setTitle={setTitle}
      />,
      {
        initialEntries: route,
        preloadedState: mockState
      }
    )
  })
  it('should render correctly autocomplete', () => {
    const autocomplete = screen.getByLabelText('common.categoryDropdown')
    expect(autocomplete).toBeInTheDocument()
  })

  it('should change autocomplete', () => {
    const autocomplete = screen.getByLabelText('common.categoryDropdown')
    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: 'Category 2' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })
    expect(autocomplete.value).toBe('Category 2')
  })

  it('should clear autocomplete', () => {
    const autocomplete = screen.getByLabelText('common.categoryDropdown')
    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: '' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })
    expect(autocomplete.value).toBe('')
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

    fireEvent.click(btnAddQuestion)

    const formTitle = screen.getByText(/title:/i)

    expect(formTitle).toBeInTheDocument()
  })

  it('should render add questions form', () => {
    const btnAddNewQuestion = screen.getByText(
      'myResourcesPage.quizzes.addQuestion'
    )

    fireEvent.click(btnAddNewQuestion)

    const formTitle = screen.getByText('myResourcesPage.questions.add')

    expect(formTitle).toBeInTheDocument()
  })
})
