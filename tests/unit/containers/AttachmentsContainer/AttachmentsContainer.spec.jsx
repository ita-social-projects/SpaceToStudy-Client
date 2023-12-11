import { fireEvent, screen, waitFor } from '@testing-library/react'
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

const responseItemsMockCategory = Array(20)
  .fill()
  .map((_, index) => ({
    ...attachmentDataMock,
    category: { id: '64fb2c33eba89699411d22bb', name: 'New Category' },
    _id: `${index}`,
    fileName: index + attachmentDataMock.fileName
  }))

const attachmentMockDataCategory = {
  count: 20,
  items: responseItemsMockCategory
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

  it('should render table', async () => {
    const title = await screen.findByText(
      'myResourcesPage.attachments.attachmentName'
    )

    expect(title).toBeInTheDocument()
  })

  it('should correctly shows filename of attachment', async () => {
    const fileName = await screen.findByText('1spanish.pdf')

    expect(fileName).toBeInTheDocument()
  })

  it('should show pagination', async () => {
    const secondButton = await screen.findByLabelText('Go to page 2')

    expect(secondButton).not.toHaveAttribute('aria-current')

    waitFor(() => {
      fireEvent.click(secondButton)
    })

    expect(secondButton).toHaveAttribute('aria-current', 'true')
  })
})

describe('QuestionsContainer test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.attachments.get)
        .reply(200, attachmentMockDataCategory)
      renderWithProviders(<AttachmentsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render correct category', async () => {
    const category = await screen.findByText(
      'myResourcesPage.categories.category'
    )

    expect(category).toBeInTheDocument()
  })
})
