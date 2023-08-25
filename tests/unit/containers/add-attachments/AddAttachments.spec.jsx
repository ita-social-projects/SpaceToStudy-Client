import { fireEvent, screen } from '@testing-library/react'
import AddAttachments from '~/containers/add-attachments/AddAttachments'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

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

describe('AddAttachments', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.resources.attachments.get)
      .reply(200, attachmentMockData)
    renderWithProviders(<AddAttachments />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the component', () => {
    const addAttachments = screen.getByText(
      'myResourcesPage.attachments.addFromAttachments'
    )

    expect(addAttachments).toBeInTheDocument()
  }),
    it('should filter attachments', async () => {
      const placeholder = screen.getByPlaceholderText('common.search')

      expect(placeholder).toBeInTheDocument()

      fireEvent.click(placeholder)
      fireEvent.change(placeholder, { target: { value: '2spanish' } })

      const filteredAttachmentCount = screen.getAllByRole('row').length - 2

      expect(filteredAttachmentCount).toBe(1)
    })
})
