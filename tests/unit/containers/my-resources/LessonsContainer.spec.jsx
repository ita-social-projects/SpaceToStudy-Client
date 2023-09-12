import { screen } from '@testing-library/react'

import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'

import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

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

const lessonResponseMock = {
  count: 10,
  items: responseItemsMock
}

describe('LessonContainer test', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.resources.lessons.get)
      .reply(200, lessonResponseMock)
    renderWithProviders(<LessonsContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render "New lesson" button', () => {
    const addBtn = screen.getByText('myResourcesPage.lessons.addBtn')

    expect(addBtn).toBeInTheDocument()
  })
  it('should render table with lessons', () => {
    const columnLabel = screen.getByText('myResourcesPage.lessons.title')
    const lessonTitle = screen.getByText(responseItemsMock[5].title)

    expect(columnLabel).toBeInTheDocument()
    expect(lessonTitle).toBeInTheDocument()
  })
})
