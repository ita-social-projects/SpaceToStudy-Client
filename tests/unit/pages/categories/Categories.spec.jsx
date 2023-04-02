import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'

import { renderWithProviders } from '~tests/test-utils'
import { axiosClient } from '~/plugins/axiosClient'
import Categories from '~/pages/categories/Categories'
import { URLs } from '~/constants/request'

const mockAxiosClient = new MockAdapter(axiosClient)

const fetchCategoriesMock = vi.fn()

vi.mock('~/hooks/use-show-more', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    responseData: [
      { _id: '1', name: 'Languages', totalOffers: 0 },
      {  _id: '2', name: 'Music', totalOffers: 0 }
    ],
    fetchData: fetchCategoriesMock
  })
}))

const categoriesNamesMock = [{ _id: '1', name: 'Languages' }, { _id: '2', name: 'Music' }]


describe('Categories page', () => {
  beforeEach(() => {
    mockAxiosClient.onGet(URLs.categories.getNames).reply(200, categoriesNamesMock)

    renderWithProviders(
      <Categories />
    )
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

    expect(fetchCategoriesMock).toHaveBeenCalled()
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
