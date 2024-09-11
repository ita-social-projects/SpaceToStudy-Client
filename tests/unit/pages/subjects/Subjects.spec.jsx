import { vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import Subjects from '~/pages/subjects/Subjects'
import useLoadMore from '~/hooks/use-load-more'

const resetDataMock = vi.fn()
const loadMoreMock = vi.fn()

vi.mock('~/hooks/use-subjects-names', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: [{ name: 'Algebra' }, { name: 'Violin' }],
    fetchData: vi.fn()
  })
}))

vi.mock('~/hooks/use-load-more')

describe('Subjects page', () => {
  beforeAll(() => {
    useLoadMore.mockImplementation(() => ({
      loading: false,
      data: [
        {
          _id: '1',
          name: 'Algebra',
          totalOffers: { student: 13, teacher: 8 },
          description: '13 offers',
          category: {
            appearance: { icon: 'Algebra.svg', color: '#FF0000' }
          }
        },
        {
          _id: '2',
          name: 'Violin',
          totalOffers: { student: 6, teacher: 6 },
          description: '6 offers',
          category: {
            appearance: { icon: 'Violin.svg', color: '#440fff' }
          }
        }
      ],
      resetData: resetDataMock,
      loadMore: loadMoreMock,
      isExpandable: true
    }))
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<Subjects />))
  })

  it('should render title with description', () => {
    const title = screen.getByText(/subjectsPage.subjects.title/)
    const description = screen.getByText(/subjectsPage.subjects.description/)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should change autocomplete and fetch subjects', () => {
    const autocomplete = screen.getByLabelText(
      'subjectsPage.subjects.searchLabel'
    )

    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: 'Violin' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe('Violin')

    const subjectName = screen.getByText(/Violin/)

    expect(subjectName).toBeInTheDocument()
  })
})

describe('Subjects page with empty data', () => {
  beforeAll(() => {
    useLoadMore.mockImplementation(() => ({
      loading: false,
      data: [],
      resetData: resetDataMock,
      loadMore: loadMoreMock,
      isExpandable: true
    }))
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<Subjects />))
  })

  it('should render not found results when no subjects are found', () => {
    const newNotFound = screen.getByText('errorMessages.resultsNotFound')
    expect(newNotFound).toBeInTheDocument()
  })

  it('should render offer count descriptions for subjects', async () => {
    await waitFor(() => {
      const noOffers = screen.queryByText(/offers/)
      expect(noOffers).not.toBeInTheDocument()
    })
  })
})
