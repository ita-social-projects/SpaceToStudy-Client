import { fireEvent, screen, cleanup } from '@testing-library/react'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { useParams } from 'react-router-dom'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'
import { vi } from 'vitest'

const setTitle = vi.fn()
const setDescription = vi.fn()
const setQuestions = vi.fn()
const setCategory = vi.fn()
const setSettings = vi.fn()
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

  beforeEach(() => {
    renderComponent()
  })

  afterAll(() => {
    vi.clearAllMocks()
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

  it('should click on save button and save quiz without category', () => {
    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)

    expect(setTitle).toHaveBeenCalled()
    expect(setDescription).toHaveBeenCalled()
  })

  it('should click on save button and save quiz with category', () => {
    cleanup()
    renderComponent({ category })

    const saveBtn = screen.getByText('common.save')

    fireEvent.click(saveBtn)
  })

  it('should render create new question form', async () => {
    const btnAddQuestion = screen.getByText(
      'myResourcesPage.quizzes.createNewQuestion'
    )

    fireEvent.click(btnAddQuestion)

    const formTitle = await screen.findByText(/title:/i)

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

describe('CreateOrEditQuizContainer with id', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: mockId })

    mockAxiosClient
      .onGet(URLs.quizzes.getById.replace(':id', mockId))
      .reply(200, {
        _id: mockId,
        title: 'Mock title',
        description: 'Mock description',
        category,
        items: []
      })

    renderComponent()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call set functions when saving the quiz', async () => {
    const saveBtn = await screen.findByText('common.save')
    fireEvent.click(saveBtn)

    expect(setTitle).toHaveBeenCalled()
    expect(setDescription).toHaveBeenCalled()
    expect(setCategory).toHaveBeenCalled()
    expect(setQuestions).toHaveBeenCalled()
    expect(setSettings).toHaveBeenCalled()
  })
})
