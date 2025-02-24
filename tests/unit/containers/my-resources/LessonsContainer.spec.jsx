import { screen, fireEvent } from '@testing-library/react'
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import { renderWithProviders } from '~tests/test-utils'
import useQuery from '~/hooks/use-query'
import { getFullUrl } from '~/utils/get-full-url'
import { authRoutes } from '~/router/constants/authRoutes'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { useNavigate } from 'react-router-dom'

const mockNavigate = vi.fn()
const mockDispatch = vi.fn()

vi.mock('~/hooks/use-query')

vi.mock(
  '~/containers/my-resources/my-resources-table/MyResourcesTable',
  () => ({
    default: ({ actions }) => (
      <div data-testid='testTable'>
        <button data-testid='editButton' onClick={() => actions.onEdit('lessonId')}>
          Edit
        </button>
      </div>
    )
  })
)

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch
  }
})

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

describe('LessonContainer - AxiosClient', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.resources.lessons.get)
      .reply(200, lessonResponseMock)
      
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    useQuery.mockReturnValue({
      data: lessonResponseMock.items,
      isLoading: false,
      error: null
    })

      renderWithProviders(<LessonsContainer />)
  })
  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should navigate to editLesson page on confirm', async () => {
    const editButton = await screen.findByTestId('editButton')
    expect(editButton).toBeInTheDocument
    fireEvent.click(editButton)

    const modal = await screen.findByTestId('confirmModal')
    expect(modal).toBeInTheDocument()

    const confirmButton = await screen.findByTestId('confirmButton')
    fireEvent.click(confirmButton)
    
    expect(mockNavigate).toHaveBeenCalledWith(
      getFullUrl({
        pathname: authRoutes.myResources.editLesson.route,
        parameters: { id: 'lessonId' }
      })
    )
  })
})

describe('LessonContainer test', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render "New lesson" button', () => {
    useQuery.mockReturnValue({
      data: lessonResponseMock.items,
      isLoading: false,
      error: null
    })
    renderWithProviders(<LessonsContainer />)

    const addBtn = screen.getByText('myResourcesPage.lessons.addBtn')
    expect(addBtn).toBeInTheDocument()
  })

  it('should render table with questions', async () => {
    useQuery.mockReturnValue({
      data: lessonResponseMock.items,
      isLoading: false,
      error: null
    })
    renderWithProviders(<LessonsContainer />)
    
    const table = await screen.findByTestId('testTable')
    expect(table).toBeInTheDocument()
  })
  
  it('should render loader when loading', async () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    })
    renderWithProviders(<LessonsContainer />)

    const loader = await screen.findByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should render onEdit button', async () => {
    useQuery.mockReturnValue({
      data: lessonResponseMock.items,
      isLoading: false,
      error: null
    })
    renderWithProviders(<LessonsContainer />)
    
    const editButton = await screen.findByTestId('editButton')
    expect(editButton).toBeInTheDocument
    fireEvent.click(editButton)
  })

  it('should not render editButton if lessons is undefined or null', () => {
    useQuery.mockReturnValue({ 
      data: null, 
      isLoading: false, 
      error: null 
    })
    renderWithProviders(<LessonsContainer />)
  
    const editButton = screen.queryByTestId('editButton')
    expect(editButton).toBeNull()
  })

  it('should not return testTable when lessons is null or undefined', () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: null
    })
    
    renderWithProviders(<LessonsContainer />)
    
    expect(screen.queryByTestId('testTable')).toBeNull()
  })    
})