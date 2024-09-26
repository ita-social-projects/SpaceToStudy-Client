import { fireEvent, screen, waitFor } from '@testing-library/react'
import QuizzesContainer from '~/containers/my-quizzes/QuizzesContainer'
import {
  mockAxiosClient,
  renderWithProviders,
  TestSnackbar
} from '~tests/test-utils'
import { URLs } from '~/constants/request'

vi.mock(
  '~/containers/my-resources/my-resources-table/MyResourcesTable',
  () => ({
    default: ({ actions }) => (
      <div data-testid='testTable'>
        <button data-testid='editButton' onClick={() => actions.onEdit()}>
          Edit
        </button>
      </div>
    )
  })
)

vi.mock(
  '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal',
  () => ({
    default: () => <div data-testid='confirmModal' />
  })
)

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

  it('should render "New quiz" button', () => {
    const addBtn = screen.getByText('myResourcesPage.quizzes.addBtn')

    expect(addBtn).toBeInTheDocument()
  })

  it('should render table with questions', async () => {
    const table = await screen.findByTestId('testTable')

    expect(table).toBeInTheDocument()
  })

  it('should run onEdit action', async () => {
    const editButton = await screen.findByTestId('editButton')

    fireEvent.click(editButton)

    const modal = await screen.findByTestId('confirmModal')

    expect(modal).toBeInTheDocument()
  })
})

describe('QuizzesContainer component with an error', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient.onGet(URLs.quizzes.get).reply(404, {
        code: 'UNAUTHORIZED',
        message: 'The requested URL was not found.'
      })

      renderWithProviders(
        <TestSnackbar>
          <QuizzesContainer />
        </TestSnackbar>
      )
    })
  })
  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should return error message', async () => {
    const notFound = await screen.findByText('errors.UNAUTHORIZED')

    expect(notFound).toBeInTheDocument()
  })
})
