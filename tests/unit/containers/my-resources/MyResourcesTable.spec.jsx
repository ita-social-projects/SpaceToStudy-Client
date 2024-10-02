import { fireEvent, screen, waitFor } from '@testing-library/react'

import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'

import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/components/enhanced-table/EnhancedTable', () => ({
  default: ({ rowActions }) => (
    <div data-testid='table'>
      {rowActions.map(({ label, func }) => (
        <button data-testid={label} key={label} onClick={func}>
          {label}
        </button>
      ))}
    </div>
  )
}))

vi.mock('~/components/app-pagination/AppPagination', () => ({
  default: () => <div data-testid='pagination' />
}))

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

const props = {
  resource: 'lessons',
  data: {
    response: {
      items: responseItemsMock,
      count: 10
    },
    getData: vi.fn()
  },
  actions: {
    onEdit: vi.fn(),
    onDuplicate: vi.fn()
  },
  services: {
    deleteService: vi.fn()
  }
}

describe('MyResourcesTable test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<MyResourcesTable {...props} />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render table and pagination', () => {
    const table = screen.getByTestId('table')
    const pagination = screen.getByTestId('pagination')

    expect(table).toBeInTheDocument()
    expect(pagination).toBeInTheDocument()
  })

  it('should render table action buttons', async () => {
    const editButton = await screen.findByTestId('common.edit')
    const deleteButton = await screen.findByText('common.delete')
    const duplicateButton = await screen.findByText('common.duplicate')

    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
    expect(duplicateButton).toBeInTheDocument()
  })

  it('should run onDelete action', async () => {
    const deleteButton = await screen.findByText('common.delete')

    fireEvent.click(deleteButton)

    const modal = await screen.findByTestId('confirmModal')

    expect(modal).toBeInTheDocument()
  })
})
