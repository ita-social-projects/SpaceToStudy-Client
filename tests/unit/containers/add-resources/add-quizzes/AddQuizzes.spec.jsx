import { screen, waitFor } from '@testing-library/react'
import AddResources from '~/containers/add-resources/AddResources'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { ResourcesTabsEnum } from '~/types'
import {
  columns,
  removeColumnRules
} from '~/containers/add-resources/AddQuizzes.constants'

const quizMock = {
  _id: '64fb2c33eba89699411d22bb',
  title: 'Quiz',
  description: '',
  items: [],
  author: '648afee884936e09a37deaaa',
  category: { id: '64fb2c33eba89699411d22bb', name: 'Music' },
  createdAt: '2023-09-08T14:14:11.373Z',
  updatedAt: '2023-09-08T14:14:11.373Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...quizMock,
    _id: `${index}`,
    title: index + quizMock.title
  }))

const quizResponseMock = {
  count: 10,
  items: responseItemsMock
}

const mockRequestService = vi.fn(() =>
  Promise.resolve({
    data: { items: responseItemsMock, count: responseItemsMock.length }
  })
)

const mockOnAddResources = () => {}

describe('AddQuizzes', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient.onGet(URLs.quizzes.get).reply(200, quizResponseMock)
      renderWithProviders(
        <AddResources
          columns={columns}
          onAddResources={mockOnAddResources}
          removeColumnRules={removeColumnRules}
          requestService={mockRequestService}
          resourceTab={ResourcesTabsEnum.Quizzes}
          resources={responseItemsMock}
        />
      )
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render title and question', async () => {
    const displayedQuizzes = await screen.findAllByText(quizMock.category.name)

    expect(displayedQuizzes.length).toBe(10)
  })
})
