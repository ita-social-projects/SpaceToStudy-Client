import { fireEvent, screen, waitFor } from '@testing-library/react'
import AttachmentsContainer from '~/containers/my-resources/attachments-container/AttachmentsContainer'
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
  '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal',
  () => ({
    default: () => <div data-testid='editModal' />
  })
)

vi.mock(
  '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal',
  () => ({
    default: () => <div data-testid='confirmModal' />
  })
)

const attachmentDataMock = {
  _id: '64cd12f1fad091e0ee719830',
  author: '6494128829631adbaf5cf615',
  fileName: 'spanish.pdf',
  link: 'link',
  description: 'Mock description for attachments',
  size: 100,
  createdAt: '2023-07-25T13:12:12.998Z',
  updatedAt: '2023-07-25T13:12:12.998Z'
}

const responseItemsMock = Array(20)
  .fill()
  .map((_, index) => ({
    ...attachmentDataMock,
    _id: `${index}`,
    fileName: index + attachmentDataMock.fileName
  }))

const attachmentMockData = {
  count: 20,
  items: responseItemsMock
}

describe('AttachmentContainer renders correct data', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.attachments.get)
        .reply(200, attachmentMockData)
      renderWithProviders(<AttachmentsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render "New attachment" button', () => {
    const addBtn = screen.getByText('myResourcesPage.attachments.addBtn')

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
