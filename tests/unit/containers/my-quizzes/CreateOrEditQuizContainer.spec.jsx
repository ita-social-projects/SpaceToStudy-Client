import { fireEvent, screen, waitFor } from '@testing-library/react'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { useParams } from 'react-router-dom'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'

const setTitle = vi.fn()
const setDescription = vi.fn()
const setQuestions = vi.fn()
const setCategory = vi.fn()
const category = 'mock-category'
const mockId = '676728f88a5ae7b4b41f5e89'

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom')
  return {
    ...original,
    useParams: vi.fn()
  }
})

const renderComponent = (props = {}) => {
  const defaultProps = {
    setDescription,
    setTitle,
    setQuestions
  }

  renderWithProviders(
    <CreateOrEditQuizContainer {...defaultProps} {...props} />
  )
}

describe('CreateOrEditQuizContainer without id', () => {
  beforeAll(() => {
    useParams.mockReturnValue({ id: undefined })
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('should change title and description inputs', async () => {
    await waitFor(() => renderComponent())

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

  it('should click on save button and save quiz without category', async () => {
    await waitFor(() => renderComponent())

    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    expect(setTitle).toHaveBeenCalled()
    expect(setDescription).toHaveBeenCalled()
  })

  it('should click on save button and save quiz with category', async () => {
    await waitFor(() => renderComponent({ category }))

    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)
  })

  it('should render create new question form', async () => {
    await waitFor(() => renderComponent())

    const btnAddQuestion = screen.getByText(
      'myResourcesPage.quizzes.createNewQuestion'
    )

    waitFor(() => fireEvent.click(btnAddQuestion))

    const formTitle = screen.getByText(/title:/i)

    expect(formTitle).toBeInTheDocument()
  })

  it('should render add questions form', async () => {
    await waitFor(() => renderComponent())

    const btnAddNewQuestion = screen.getByText(
      'myResourcesPage.quizzes.addQuestion'
    )

    waitFor(() => fireEvent.click(btnAddNewQuestion))

    const formTitle = screen.getByText('myResourcesPage.questions.add')

    expect(formTitle).toBeInTheDocument()
  })
})

describe('CreateOrEditQuizContainer with id', () => {
  beforeAll(() => {
    useParams.mockReturnValue({ id: mockId })
    mockAxiosClient
      .onGet(new RegExp(URLs.quizzes.get.replace(':id', mockId)))
      .reply(200, {
        _id: mockId,
        title: 'Mock title',
        description: 'Mock description',
        category,
        items: []
      })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should save quiz with category and questions', async () => {
    await waitFor(() => renderComponent({ category, questions: [] }))

    const saveBtn = screen.getByText('common.save')
    fireEvent.click(saveBtn)

    expect(setTitle).toHaveBeenCalled()
  })

  it('should save quiz without category', async () => {
    await waitFor(() => renderComponent())

    const saveBtn = screen.getByText('common.save')
    fireEvent.click(saveBtn)

    expect(setTitle).toHaveBeenCalled()
  })

  it('should call setCategory', async () => {
    await waitFor(() => renderComponent({ setCategory }))

    expect(setCategory).toHaveBeenCalled()
  })
})
