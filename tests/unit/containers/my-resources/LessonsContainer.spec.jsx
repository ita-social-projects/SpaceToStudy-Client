import { fireEvent, screen, waitFor } from '@testing-library/react'

import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'

import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
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

const lessonMock = {
  _id: '64e49ce305b3353b2ae6309e',
  author: '648afee884936e09a37deaaa',
  title: 'eew',
  description: 'dsdfd',
  attachments: [],
  createdAt: '2023-08-22T11:32:51.995Z',
  updatedAt: '2023-08-22T11:32:51.995Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...lessonMock,
    _id: `${index}`,
    title: index + lessonMock.title
  }))

const lessonResponseMock = {
  count: 10,
  items: responseItemsMock
}

describe('LessonContainer test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, lessonResponseMock)
      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render "New lesson" button', () => {
    const addBtn = screen.getByText('myResourcesPage.lessons.addBtn')

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
