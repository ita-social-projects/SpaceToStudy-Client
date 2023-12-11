import { screen, waitFor } from '@testing-library/react'
import AddResources from '~/containers/add-resources/AddResources'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import {
  columns,
  removeColumnRules
} from '~/containers/add-resources/AddQuestions.constants'

const questionMock = {
  _id: '64fb2c33eba89699411d22bb',
  title: 'First Question',
  answers: [
    { text: 'First answer', isCorrect: true },
    { text: 'Second answer', isCorrect: false }
  ],
  author: '648afee884936e09a37deaaa',
  category: { id: '64fb2c33eba89699411d22bb', name: 'New Category' },
  createdAt: '2023-09-08T14:14:11.373Z',
  updatedAt: '2023-09-08T14:14:11.373Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...questionMock,
    _id: `${index}`,
    title: index + questionMock.title
  }))

const questionResponseMock = {
  count: 10,
  items: responseItemsMock
}

const mockRequestService = vi.fn(() =>
  Promise.resolve({
    data: { items: responseItemsMock, count: responseItemsMock.length }
  })
)

const mockOnAddResources = () => {}

describe('AddQuestions', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.questions.get)
        .reply(200, questionResponseMock)
      renderWithProviders(
        <AddResources
          columns={columns}
          onAddResources={mockOnAddResources}
          removeColumnRules={removeColumnRules}
          requestService={mockRequestService}
          resourceType={'questions'}
          resources={responseItemsMock}
        />
      )
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render title and question', () => {
    const title = screen.getByText('myResourcesPage.questions.add')
    expect(title).toBeInTheDocument()

    const questions = screen.getByText('1First Question')
    expect(questions).toBeInTheDocument()
  })
})
