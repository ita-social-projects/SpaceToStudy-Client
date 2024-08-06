import { vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import Categories from '~/pages/categories/Categories'
import useLoadMore from '~/hooks/use-load-more'

const resetDataMock = vi.fn()
const loadMoreMock = vi.fn()

vi.mock('~/hooks/use-categories-names', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: [
      { _id: '1', name: 'Languages' },
      { _id: '2', name: 'Music' }
    ]
  })
}))

vi.mock('~/hooks/use-load-more')

describe('Categories page', () => {
  beforeAll(() => {
    useLoadMore.mockImplementation(() => ({
      loading: false,
      data: [
        {
          _id: '1',
          name: 'Languages',
          totalOffers: 0,
          description: 'offers',
          appearance: {
            icon: 'Languages.svg',
            color: '#FF0000'
          }
        },
        {
          _id: '2',
          name: 'Music',
          totalOffers: 0,
          description: 'offers',
          appearance: {
            icon: 'Music.svg',
            color: '#440fff'
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
  beforeEach(() => {
    renderWithProviders(<Categories />)
  })

  it('should render title with description', () => {
    const title = screen.getByText(/categoriesPage.title/)
    const description = screen.getByText(/categoriesPage.description/)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should change autocomplete and fetch categories', () => {
    const autocomplete = screen.getByLabelText('categoriesPage.searchLabel')

    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: 'Music' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe('Music')

    const categoryName = screen.getByText(/Music/)

    expect(categoryName).toBeInTheDocument()
  })

  it('should clear autocomplete', () => {
    const autocomplete = screen.getByLabelText('categoriesPage.searchLabel')

    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, { target: { value: '' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe('')
  })
})

describe('Categories page with empty data', () => {
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
  beforeEach(() => {
    renderWithProviders(<Categories />)
  })

  it('should render not found results when no categories are found', () => {
    const newNotFound = screen.getByText('errorMessages.resultsNotFound')
    expect(newNotFound).toBeInTheDocument()
  })

  it('should render offer count descriptions for categories', async () => {
    await waitFor(() => {
      const noOffers = screen.queryByText(/offers/)
      expect(noOffers).not.toBeInTheDocument()
    })
  })
})
