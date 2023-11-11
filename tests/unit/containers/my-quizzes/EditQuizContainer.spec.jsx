import { vi } from 'vitest'
import EditQuizContainer from '~/containers/my-quizzes/edit-quiz-container/EditQuizContainer'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

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

const route = '/categories/subjects?categoryId=123'

const mockState = {
  appMain: { userRole: 'tutor' }
}

describe('EditQuizContainer', () => {
  beforeEach(() => {
    renderWithProviders(
      <EditQuizContainer questions={[]} setQuestions={() => {}} />,
      {
        initialEntries: route,
        preloadedState: mockState
      }
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    const autocomplete = screen.getByLabelText(
      'myResourcesPage.quizzes.categoryDropdown'
    )
    expect(autocomplete).toBeInTheDocument()
  })

  it('should change autocomplete', () => {
    const autocomplete = screen.getByLabelText(
      'myResourcesPage.quizzes.categoryDropdown'
    )

    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: 'Category 2' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe('Category 2')
  })

  it('should clear autocomplete', () => {
    const autocomplete = screen.getByLabelText(
      'myResourcesPage.quizzes.categoryDropdown'
    )

    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: '' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe('')
  })
  it('should change title and description', () => {
    const titleInput = screen.getByLabelText(
      'myResourcesPage.quizzes.defaultNewTitle'
    )
    const descriptionInput = screen.getByLabelText(
      'myResourcesPage.quizzes.defaultNewDescription'
    )

    fireEvent.change(titleInput, { target: { value: 'New Title' } })
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } })

    expect(titleInput.value).toBe('New Title')
    expect(descriptionInput.value).toBe('New Description')
  })
})
