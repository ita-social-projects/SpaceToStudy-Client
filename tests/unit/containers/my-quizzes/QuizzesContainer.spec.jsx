import { fireEvent, screen } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import QuizzesContainer from '~/containers/my-quizzes/QuizzesContainer'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { getFullUrl } from '~/utils/get-full-url'
import { authRoutes } from '~/router/constants/authRoutes'

vi.mock(
  '~/containers/my-resources/my-resources-table/MyResourcesTable',
  () => ({
    default: ({ actions }) => (
      <div data-testid='testTable'>
        <button
          data-testid='editButton'
          onClick={() => actions.onEdit('quizId')}
        >
          Edit
        </button>
      </div>
    )
  })
)

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

vi.mock(
  '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal',
  () => ({
    default: ({ onConfirm }) => (
      <div data-testid='confirmModal'>
        <button data-testid='confirmButton' onClick={onConfirm}>
          Confirm
        </button>
      </div>
    )
  })
)

const mockNavigate = vi.fn()

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
  beforeEach(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.quizzes.get))
      .reply(200, responseQuizzesMock)
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    renderWithProviders(<QuizzesContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
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

  it('should navigate to editQuiz page on confirm', async () => {
    const editButton = await screen.findByTestId('editButton')
    fireEvent.click(editButton)

    const modal = await screen.findByTestId('confirmModal')
    expect(modal).toBeInTheDocument()

    const confirmButton = await screen.findByTestId('confirmButton')
    fireEvent.click(confirmButton)

    expect(mockNavigate).toHaveBeenCalledWith(
      getFullUrl({
        pathname: authRoutes.myResources.editQuiz.route,
        parameters: { id: 'quizId' }
      })
    )
  })
})
