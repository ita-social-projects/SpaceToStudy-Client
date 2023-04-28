import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { renderWithProviders } from '~tests/test-utils'
import Categories from '~/pages/categories/Categories'

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

vi.mock('~/hooks/use-load-more', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    data: [
      { _id: '1', name: 'Languages', totalOffers: 0 },
      { _id: '2', name: 'Music', totalOffers: 0 }
    ],
    resetData: resetDataMock,
    loadMore: loadMoreMock,
    isExpandable: true
  })
}))

describe('Categories page', () => {
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
