import { fireEvent, screen } from '@testing-library/react'
import AttachmentsContainer from '~/containers/my-resources/attachments-container/AttachmentsContainer'
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
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.resources.attachments.get)
      .reply(200, attachmentMockData)
    renderWithProviders(<AttachmentsContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render table', () => {
    const title = screen.getByText('myResourcesPage.attachments.file')
    expect(title).toBeInTheDocument()
  })
  it('should correctly shows filename of attachment', () => {
    const fileName = screen.getByText('1spanish.pdf')
    expect(fileName).toBeInTheDocument()
  })
  it('should show pagination', () => {
    const secondButton = screen.getByLabelText('Go to page 2')

    expect(secondButton).not.toHaveAttribute('aria-current')

    fireEvent.click(secondButton)

    expect(secondButton).toHaveAttribute('aria-current', 'true')
  })
})
