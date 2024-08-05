import { fireEvent, screen, waitFor } from '@testing-library/react'
import AddResources from '~/containers/add-resources/AddResources'
import { URLs } from '~/constants/request'
import { ResourcesTabsEnum } from '~/types'
import {
  columns,
  removeColumnRules
} from '~/containers/add-resources/AddLessons.constants'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'

const lessonDataMock = {
  _id: '1',
  title: 'Lesson',
  author: 'some author',
  content: 'Content',
  description: 'Description',
  attachments: [],
  category: { id: '64fb2c33eba89699411d22bb', name: 'History' },
  createdAt: '2023-09-25T13:12:12.998Z',
  updatedAt: '2023-09-25T13:12:12.998Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...lessonDataMock,
    _id: `${index}`,
    title: `${lessonDataMock.title}${index}`
  }))

const resourcesMockData = {
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
        .onGet(URLs.resources.lessons.get)
        .reply(200, resourcesMockData)

      renderWithProviders(
        <AddResources
          columns={columns}
          onAddResources={mockOnAddResources}
          removeColumnRules={removeColumnRules}
          requestService={mockRequestService}
          resourceTab={ResourcesTabsEnum.Lessons}
          resources={responseItemsMock}
        />
      )
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should display list of all resources with category', async () => {
    const displayedLessons = screen.getAllByText(
      lessonDataMock.category.name
    ).length
    expect(displayedLessons).toBe(10)
  })

  it('should filter resources', () => {
    const placeholder = screen.getByPlaceholderText('common.search')

    expect(placeholder).toBeInTheDocument()

    fireEvent.click(placeholder)
    fireEvent.change(placeholder, { target: { value: 'Lesson2' } })

    const filteredAttachmentCount = screen.getAllByRole('row').length - 2

    expect(filteredAttachmentCount).toBe(1)
  })

  it('handles row click and selection', () => {
    const resourceRow = screen.getByText('Lesson1')

    fireEvent.click(resourceRow)

    const rowCheckbox = screen.getAllByRole('row')[2]

    expect(rowCheckbox).toHaveClass('Mui-selected')
  })
})
