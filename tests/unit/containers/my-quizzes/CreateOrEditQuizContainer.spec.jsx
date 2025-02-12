import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import { useParams } from 'react-router-dom'
import { ResourceService } from '~/services/resource-service'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'

const setTitle = vi.fn()
const setDescription = vi.fn()
const setQuestions = vi.fn()
const setCategory = vi.fn()
const setSettings = vi.fn()
const category = 'mock-category'
const mockId = '676728f88a5ae7b4b41f5e89'
let getQuizSpy

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
    setQuestions,
    setCategory,
    setSettings
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
  beforeEach(() => {
    useParams.mockReturnValue({ id: mockId })

    getQuizSpy = vi.spyOn(ResourceService, 'getQuiz').mockResolvedValue({
      data: {
        _id: mockId,
        title: 'Mock title',
        description: 'Mock description',
        category: '665799d795ab9dbdd7ad40df',
        settings: {
          view: 'Stepper',
          shuffle: false,
          pointValues: true,
          scoredResponses: true,
          correctAnswers: true
        },
        items: []
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call ResourceService.getQuizQuery with the correct id when loading the quiz', async () => {
    renderComponent()

    expect(getQuizSpy).toHaveBeenCalledWith(mockId)
  })

  it('should call set functions when saving the quiz', async () => {
    renderComponent()

    const saveBtn = screen.getByText('common.save')
    fireEvent.click(saveBtn)

    expect(setTitle).toHaveBeenCalled()
    expect(setDescription).toHaveBeenCalled()
    expect(setCategory).toHaveBeenCalled()
    expect(setQuestions).toHaveBeenCalled()
    expect(setSettings).toHaveBeenCalled()
  })
})
