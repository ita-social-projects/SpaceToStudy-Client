import { screen, fireEvent } from '@testing-library/react'
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import { renderWithProviders } from '~tests/test-utils'
import * as useQuery from '~/hooks/use-query'
import { getFullUrl } from '~/utils/get-full-url'
import { authRoutes } from '~/router/constants/authRoutes'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { afterAll, beforeEach, describe, vi } from 'vitest'

const mockNavigate = vi.fn()

vi.mock(
  '~/containers/my-resources/my-resources-table/MyResourcesTable',
  () => ({
    default: ({ actions }) => (
      <div data-testid='testTable'>
        <button data-testid='editButton' onClick={() => actions.onEdit('id-1')}>
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
    useNavigate: () => mockNavigate
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
      _id: `id-${index}`,
      title: `Lesson ${index}`
    }))
}

describe('LessonContainer with defined data', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.resources.lessons.get))
      .reply(200, lessonResponseMock)

    renderWithProviders(<LessonsContainer />)
  })

  it('should render "New lesson" button', () => {
    const addBtn = screen.getByText('myResourcesPage.lessons.addBtn')
    expect(addBtn).toBeInTheDocument()
  })

  it('should render table with questions', async () => {
    const table = await screen.findByTestId('testTable')
    expect(table).toBeInTheDocument()
  })

  it('should render onEdit button', async () => {
    const editButton = await screen.findByTestId('editButton')
    expect(editButton).toBeInTheDocument
    fireEvent.click(editButton)
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
        parameters: { id: 'id-1' }
      })
    )
  })
})

describe('LessonContainer with undefined data', () => {
  const useQuerySpy = vi.spyOn(useQuery, 'default')

  beforeEach(() => {
    useQuerySpy.mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'app-button-menu') {
        return []
      }

      return {
        data: undefined,
        isLoading: true,
        error: null
      }
    })

    renderWithProviders(<LessonsContainer />)
  })

  afterAll(() => {
    useQuerySpy.mockRestore()
  })

  it('should render loader when loading', async () => {
    const loader = await screen.findByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should not render editButton if lessons is undefined or null', () => {
    const editButton = screen.queryByTestId('editButton')
    expect(editButton).toBeNull()
  })

  it('should not return testTable when lessons is null or undefined', () => {
    expect(screen.queryByTestId('testTable')).toBeNull()
  })
})
