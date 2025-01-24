import { fireEvent, screen, waitFor } from '@testing-library/react'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { useParams } from 'react-router-dom'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'

const setTitle = vi.fn()
const setDescription = vi.fn()
const category = 'mock-category'
const mockId = '676728f88a5ae7b4b41f5e89'

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom')
  return {
    ...original,
    useParams: vi.fn()
  }
})

describe('CreateOrEditQuizContainer without id', () => {
  beforeAll(() => {
    useParams.mockReturnValue({ id: undefined })
  })

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

describe('CreateOrEditQuizContainer with id', () => {
  beforeAll(() => {
    useParams.mockReturnValue({ id: mockId })
  })

  beforeEach(async () => {
    mockAxiosClient
      .onGet(new RegExp(URLs.quizzes.get.replace(':id', mockId)))
      .reply(200, {
        _id: mockId,
        title: 'Mock title',
        description: 'Mock description',
        category
      })

    await waitFor(() => {
      renderWithProviders(
        <CreateOrEditQuizContainer
          questions={[]}
          category={category}
          setTitle={setTitle}
        />
      )
    })
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('should save quiz with category', async () => {
    const saveBtn = screen.getByText('common.save')
    fireEvent.click(saveBtn)

    expect(setTitle).toHaveBeenCalled()
  })
})
