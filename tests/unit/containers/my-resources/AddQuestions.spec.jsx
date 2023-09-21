import { fireEvent, screen } from '@testing-library/react'

import AddQuestions from '~/containers/my-resources/add-questions/AddQuestions'

import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

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

describe('AddQuestions', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.resources.questions.get)
      .reply(200, questionResponseMock)
    renderWithProviders(<AddQuestions />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render title', () => {
    const title = screen.getByText('myResourcesPage.questions.add')

    expect(title).toBeInTheDocument()
  }),
    it('should filter questions', async () => {
      const placeholder = screen.getByPlaceholderText('common.search')

      expect(placeholder).toBeInTheDocument()

      fireEvent.click(placeholder)
      fireEvent.change(placeholder, {
        target: { value: responseItemsMock[1].title }
      })

      const filteredQuestionsCount = screen.getAllByRole('row').length - 2

      expect(filteredQuestionsCount).toBe(1)
    })
})
