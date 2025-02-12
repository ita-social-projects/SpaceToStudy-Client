import { fireEvent, screen } from '@testing-library/react'
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import { renderWithProviders } from '~tests/test-utils'
import useQuery from '~/hooks/use-query'

vi.mock('~/hooks/use-query')

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

const lessonMock = {
  _id: '64e49ce305b3353b2ae6309e',
  author: '648afee884936e09a37deaaa',
  title: 'eew',
  description: 'dsdfd',
  attachments: [],
  createdAt: '2023-08-22T11:32:51.995Z',
  updatedAt: '2023-08-22T11:32:51.995Z'
}

const lessonResponseMock = {
  count: 10,
  items: Array(10)
    .fill(null)
    .map((_, index) => ({
      ...lessonMock,
      _id: `${index}`,
      title: `Lesson ${index}`
    }))
}

describe('LessonContainer test', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.resources.lessons.get)
      .reply(200, lessonResponseMock)

    renderWithProviders(<LessonsContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render "New lesson" button', () => {
    useQuery.mockReturnValue({
      data: lessonResponseMock.items,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })
    renderWithProviders(<LessonsContainer />)

    const addBtn = screen.getByText('myResourcesPage.lessons.addBtn')
    expect(addBtn).toBeInTheDocument()
  })

  it('should render table with questions', async () => {
    useQuery.mockReturnValue({
      data: lessonResponseMock.items,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })
    renderWithProviders(<LessonsContainer />)

    const table = await screen.findByTestId('testTable')
    expect(table).toBeInTheDocument()
  })
  
  it('should render loader when loading', async () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    })
    renderWithProviders(<LessonsContainer />)

    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })
})
