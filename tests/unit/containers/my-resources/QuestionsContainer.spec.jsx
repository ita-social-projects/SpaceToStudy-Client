import { screen, waitFor, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'

import QuestionsContainer from '~/containers/my-resources/questions-container/QuestionsContainer'

import { URLs } from '~/constants/request'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { authRoutes } from '~/router/constants/authRoutes'
import { getFullUrl } from '~/utils/get-full-url'
import { vi } from 'vitest'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const mockNavigate = vi.fn()

const questionMock = {
  _id: '64fb2c33eba89699411d22bb',
  title: 'First Question',
  text: 'question text',
  answers: [
    { text: 'First answer', isCorrect: true },
    { text: 'Second answer', isCorrect: false }
  ],
  type: 'multiple-choice',
  author: '648afee884936e09a37deaaa',
  createdAt: '2023-09-08T14:14:11.373Z',
  updatedAt: '2023-09-08T14:14:11.373Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...questionMock,
    _id: `${index}`,
    title: index + questionMock.title
  }))

const questionResponseMock = {
  count: 10,
  items: responseItemsMock
}

const responseItemsMockCategory = Array(10)
  .fill()
  .map((_, index) => ({
    ...questionMock,
    category: { id: '64fb2c33eba89699411d22bb', name: 'New Category' },
    _id: `${index}`,
    title: index + questionMock.title
  }))

const questionResponseMockCategory = {
  count: 10,
  items: responseItemsMockCategory
}

describe('QuestionsContainer test', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.resources.questions.get))
      .reply(200, questionResponseMock)
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    renderWithProviders(<QuestionsContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render "New question" button', () => {
    const addBtn = screen.getByText('myResourcesPage.questions.addBtn')

    expect(addBtn).toBeInTheDocument()
  })

  it('should render table with questions', async () => {
    const columnLabel = await screen.findByText(
      'myResourcesPage.questions.title'
    )
    const questionTitle = await screen.findByText(responseItemsMock[5].title)

    expect(columnLabel).toBeInTheDocument()
    expect(questionTitle).toBeInTheDocument()
  })

  it('should open menu and duplicate a question successfully', async () => {
    mockAxiosClient
      .onPost(URLs.resources.questions.post)
      .reply(200, { success: true })

    expect(screen.getAllByTestId('menu-icon').length).toBeGreaterThan(0)

    const menuButtons = screen.getAllByTestId('menu-icon')

    fireEvent.click(menuButtons[0])

    const duplicateBtn = await screen.findByText('common.duplicate')

    fireEvent.click(duplicateBtn)

    await waitFor(() => {
      expect(mockAxiosClient.history.post.length).toBe(1)
      expect(JSON.parse(mockAxiosClient.history.post[0].data)).toMatchObject({
        title: '0First Question',
        text: 'question text',
        answers: [
          { text: 'First answer', isCorrect: true },
          { text: 'Second answer', isCorrect: false }
        ],
        category: null,
        type: 'multiple-choice'
      })
    })
  })

  it('should navigate to edit question page when edit button is clicked', async () => {
    const menuButtons = await screen.findAllByTestId('menu-icon')

    fireEvent.click(menuButtons[0])

    const editBtn = await screen.findByText('common.edit')

    fireEvent.click(editBtn)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        getFullUrl({
          pathname: authRoutes.myResources.editQuestion.route,
          parameters: { id: '0' }
        })
      )
    })
  })
})

describe('QuestionCategory test', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.resources.questions.get))
      .reply(200, questionResponseMockCategory)

    renderWithProviders(<QuestionsContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render correct category', async () => {
    const category = await screen.findByText(
      'myResourcesPage.categories.category'
    )

    expect(category).toBeInTheDocument()
  })
})
