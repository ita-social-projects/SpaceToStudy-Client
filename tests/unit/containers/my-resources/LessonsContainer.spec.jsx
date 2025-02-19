import { screen, fireEvent, waitFor, render } from '@testing-library/react'
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import { renderWithProviders } from '~tests/test-utils'
import useQuery from '~/hooks/use-query'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { snackbarVariants } from '~/constants'
import { getFullUrl } from '~/utils/get-full-url'
import { authRoutes } from '~/router/constants/authRoutes'

const mockNavigate = vi.fn()
const mockDispatch = vi.fn()
const mockOpenModal = vi.fn()

vi.mock('~/hooks/use-query')

vi.mock('~/utils/get-error-key', () => ({
  getErrorKey: vi.fn(() => 'mockedErrorMessage')
}))

vi.mock(
  '~/containers/my-resources/my-resources-table/MyResourcesTable',
  () => ({
    default: ({ actions }) => (
      <div data-testid='testTable'>
        <button data-testid='editButton' onClick={() => actions.onEdit('0')}>
          Edit
        </button>
      </div>
    )
  })
)

vi.mock('~/redux/features/snackbarSlice', async () => {
  const actual = await vi.importActual('~/redux/features/snackbarSlice')
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch
  }
})

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      openModal: mockOpenModal
    })
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

vi.mock('~/utils/get-full-url', () => ({
  getFullUrl: vi.fn(({ pathname, parameters }) => 
    `${pathname.replace(':id', parameters.id)}`
  )
}))

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

describe('LessonContainer alert', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    mockDispatch.mockReset()
  })

  it('should dispatch openAlert with error message when there is an error', () => {
    const mockError = { message: 'Test error' }

    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError,
      refetch: vi.fn()
    })

    renderWithProviders(<LessonsContainer />)

    expect(getErrorKey).toHaveBeenCalledWith(mockError)
    expect(mockDispatch).toHaveBeenCalledWith(
      openAlert({
        severity: snackbarVariants.error,
        message: 'mockedErrorMessage'
      })
    )
  })
})

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
      error: null,
      refetch: vi.fn(),
    })
    renderWithProviders(<LessonsContainer />)

    const loader = await screen.findByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should call onEdit and open modal when edit button is clicked', async () => {
    useQuery.mockReturnValue({
      data: lessonResponseMock.items,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    })
    renderWithProviders(<LessonsContainer />)

    const editButton = await screen.findByTestId('editButton')
    expect(editButton).toBeInTheDocument
    fireEvent.click(editButton)

    expect(mockOpenModal).toHaveBeenCalled()
  })

  it('should not render editButton if lessons is undefined or null', () => {
    useQuery.mockReturnValue({ 
      data: null, 
      isLoading: false, 
      error: null, 
      refetch: vi.fn(), 
    })
    renderWithProviders(<LessonsContainer />)
  
    const editButton = screen.queryByTestId('editButton')
    expect(editButton).toBeNull()
  })

  it('should create correct edit URL when onEdit is called', async () => {
    useQuery.mockReturnValue({
      data: lessonResponseMock.items,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    })
    renderWithProviders(<LessonsContainer />)

    const editButton = await screen.findByTestId('editButton')
    expect(editButton).toBeInTheDocument()

    fireEvent.click(editButton)
    await waitFor(() => {
      expect(mockOpenModal).toHaveBeenCalled();
    })
    
    const expectedUrl = getFullUrl({
      pathname: authRoutes.myResources.editLesson.route,
      parameters: { id: '0' }
    })

    expect(expectedUrl).toBe(`my-resources/edit-lesson/0`)

    mockNavigate(expectedUrl)

    expect(mockNavigate).toHaveBeenCalled()
  })
})

describe('LessonContainer - error', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockDispatch.mockReset()
  })

  it('should dispatch openAlert with error message when there is an error', () => {
    const mockError = { message: 'Test error' }

    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
      refetch: vi.fn()
    })

    renderWithProviders(<LessonsContainer />)

    expect(getErrorKey).toHaveBeenCalledWith(mockError)
    expect(mockDispatch).toHaveBeenCalledWith(
      openAlert({
        severity: snackbarVariants.error,
        message: 'mockedErrorMessage'
      })
    )
  })
})