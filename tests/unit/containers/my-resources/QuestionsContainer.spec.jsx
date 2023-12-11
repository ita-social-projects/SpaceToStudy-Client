import { screen, waitFor } from '@testing-library/react'

import QuestionsContainer from '~/containers/my-resources/questions-container/QuestionsContainer'

import { URLs } from '~/constants/request'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'

const questionMock = {
  _id: '64fb2c33eba89699411d22bb',
  title: 'First Question',
  answers: [
    { text: 'First answer', isCorrect: true },
    { text: 'Second answer', isCorrect: false }
  ],
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
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.questions.get)
        .reply(200, questionResponseMock)

      renderWithProviders(<QuestionsContainer />)
    })
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
})

describe('QuestionCategory test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.questions.get)
        .reply(200, questionResponseMockCategory)

      renderWithProviders(<QuestionsContainer />)
    })
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
