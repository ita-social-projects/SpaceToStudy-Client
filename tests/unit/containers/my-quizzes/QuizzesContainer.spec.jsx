import { screen, waitFor } from '@testing-library/react'
import QuizzesContainer from '~/containers/my-quizzes/QuizzesContainer'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const quizzesMock = {
  _id: '64ca5914b57f2442403394a5',
  title: 'First question',
  items: [
    {
      question: 'Is it the best programming language?',
      answers: [
        { text: 'Yes,', isCorrect: false },
        { text: 'Yes, of course,', isCorrect: true }
      ]
    }
  ],
  category: { id: '64fb2c33eba89699411d22bb', name: 'New Category' },
  author: '6477007a6fa4d05e1a800ce5',
  createdAt: '2023-08-02T13:24:36.451Z',
  updatedAt: '2023-08-02T13:24:36.451Z'
}

const responseQuizzesItemsMock = Array(2)
  .fill('')
  .map((_, index) => ({
    ...quizzesMock,
    _id: quizzesMock._id + index,
    title: index + quizzesMock.title
  }))

const responseQuizzesMock = {
  count: 2,
  items: responseQuizzesItemsMock
}

describe('QuizzesContainer component with data', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient.onGet(URLs.quizzes.get).reply(200, responseQuizzesMock)

      renderWithProviders(<QuizzesContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render table', () => {
    const title = screen.getByText(responseQuizzesMock.items[0].title)

    expect(title).toBeInTheDocument()
  })
})

describe('QuizzesContainer component with an error', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient.onGet(URLs.quizzes.get).reply(404, {
        code: 'UNAUTHORIZED',
        message: 'The requested URL was not found.'
      })

      renderWithProviders(<QuizzesContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should return error message', async () => {
    const notFound = await screen.findByText('errors.UNAUTHORIZED')

    await waitFor(() => {
      expect(notFound).toBeInTheDocument()
    })
  })
})
