import { screen, waitFor } from '@testing-library/react'
import AddResources from '~/containers/add-resources/AddResources'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { ResourcesTabsEnum } from '~/types'
import {
  columns,
  removeColumnRules
} from '~/containers/add-resources/AddAttachments.constants'

const attachmentDataMock = {
  _id: '64cd12f1fad091e0ee719830',
  author: '6494128829631adbaf5cf615',
  fileName: 'spanish.pdf',
  link: 'link',
  category: { id: '64fb2c33eba89699411d22bb', name: 'History' },
  description: 'Mock description for attachments',
  size: 100,
  createdAt: '2023-07-25T13:12:12.998Z',
  updatedAt: '2023-07-25T13:12:12.998Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...attachmentDataMock,
    _id: `${index}`,
    fileName: index + attachmentDataMock.fileName
  }))

const attachmentMockData = {
  count: 10,
  items: responseItemsMock
}

const mockRequestService = vi.fn(() =>
  Promise.resolve({
    data: { items: responseItemsMock, count: responseItemsMock.length }
  })
)
const mockOnAddResources = () => {}

describe('Tests for AddResources container', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.attachments.get)
        .reply(200, attachmentMockData)
      renderWithProviders(
        <AddResources
          columns={columns}
          onAddResources={mockOnAddResources}
          removeColumnRules={removeColumnRules}
          requestService={mockRequestService}
          resourceTab={ResourcesTabsEnum.Attachments}
          resources={responseItemsMock}
        />
      )
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should display list of all attachments with category', () => {
    const displayedAttachments = screen.getAllByText(
      attachmentDataMock.category.name
    )
    expect(displayedAttachments.length).toBe(10)
  })
})
