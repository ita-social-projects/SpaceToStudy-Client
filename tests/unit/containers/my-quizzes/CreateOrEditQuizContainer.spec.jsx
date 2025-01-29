import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'

const setMutations = vi.fn()
const handleInputChange = vi.fn()
const handleNonInputValueChange = vi.fn()
const handleSubmit = vi.fn()

const mockData = {
  title: '',
  description: '',
  category: null,
  items: []
}

describe('CreateOrEditQuizContainer', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <CreateOrEditQuizContainer
          data={mockData}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
          handleSubmit={handleSubmit}
          setMutations={setMutations}
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

    fireEvent.change(titleInput, { target: { value: 'New Quiz Title' } })
    fireEvent.change(descriptionInput, {
      target: { value: 'New Quiz Description' }
    })

    expect(handleInputChange).toHaveBeenCalledWith('title')
    expect(handleInputChange).toHaveBeenCalledWith('description')
  })

  it('should call submit handler when save button is clicked', () => {
    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('should render and open the create question form', async () => {
    const btnCreateNewQuestion = screen.getByText(
      'myResourcesPage.quizzes.createNewQuestion'
    )

    fireEvent.click(btnCreateNewQuestion)

    const formTitle = await screen.findByText(/title:/i)
    expect(formTitle).toBeInTheDocument()
  })

  it('should open and display add questions modal', async () => {
    const btnAddNewQuestion = screen.getByText('myResourcesPage.quizzes.addQuestion')

    fireEvent.click(btnAddNewQuestion)

    const modalTitle = await screen.findByText('myResourcesPage.questions.add')
    expect(modalTitle).toBeInTheDocument()
  })
})