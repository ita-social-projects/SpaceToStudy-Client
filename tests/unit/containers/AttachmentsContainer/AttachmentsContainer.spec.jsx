import { screen } from '@testing-library/react'
import AttachmentsContainer from '~/containers/my-resources/attachments-container/AttachmentsContainer'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const attachmentMockData = {
  count: 2,
  items: [
    {
      _id: '64cd12f1fad091e0ee719830',
      author: '6494128829631adbaf5cf615',
      fileName: 'spanish.pdf',
      link: 'link',
      description: 'fdfdfffgdffdfdddfffgdffdfdfffgdf',
      size: 100,
      createdAt: '2023-07-25T13:12:12.998Z',
      updatedAt: '2023-07-25T13:12:12.998Z'
    },
    {
      _id: '64cd1417fad091e0ee719833',
      author: '6494128829631adbaf5cf615',
      fileName: 'deutch.doc',
      link: 'link',
      description: 'fdfdfffgdffdfdddfffgdffdfdfffgdf',
      size: 10,
      createdAt: '2023-07-25T13:12:12.998Z',
      updatedAt: '2023-07-25T13:12:12.998Z'
    }
  ]
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
    const fileName = screen.getByText('spanish.pdf')
    expect(fileName).toBeInTheDocument()
  })
})
