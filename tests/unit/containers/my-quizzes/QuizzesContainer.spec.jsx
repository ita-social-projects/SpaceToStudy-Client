import { screen } from '@testing-library/react'
import QuizzesContainer from '~/containers/my-quizzes/QuizzesContainer'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const quizzesMock = {
  items: [
    {
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
      author: '6477007a6fa4d05e1a800ce5',
      createdAt: '2023-08-02T13:24:36.451Z',
      updatedAt: '2023-08-02T13:24:36.451Z'
    },
    {
      _id: '64ca5932b57f2442403394a9',
      title: 'Second question',
      items: [
        {
          question: '2) Is it the best programming language?',
          answers: [
            { text: 'Yes,', isCorrect: false },
            { text: 'Yes, of course,', isCorrect: true }
          ]
        }
      ],
      author: '6477007a6fa4d05e1a800ce5',
      createdAt: '2023-08-02T13:25:06.286Z',
      updatedAt: '2023-08-02T13:25:06.286Z'
    }
  ],
  count: 2
}

describe('QuizzesContainer component with data', () => {
  beforeEach(() => {
    mockAxiosClient.onGet(URLs.quizzes.get).reply(200, quizzesMock)
    renderWithProviders(<QuizzesContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render table', () => {
    const title = screen.getByText('First question')
    expect(title).toBeInTheDocument()
  })
})

describe('QuizzesContainer component with an error', () => {
  beforeEach(() => {
    mockAxiosClient.onGet(URLs.quizzes.get).reply(404, {
      code: 'error',
      message: 'The requested URL was not found.'
    })
    renderWithProviders(<QuizzesContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return error message', () => {
    expect(
      screen.getByText('errors.The requested URL was not found.')
    ).toBeInTheDocument()
  })
})
