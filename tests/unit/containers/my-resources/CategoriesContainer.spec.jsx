import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import CategoriesContainer from '~/containers/my-resources/categories-container/CategoriesContainer'

const categoriesMock = {
  _id: 's0Me1D',
  name: 'Conversational English',
  author: 's0MeAuth0r1D',
  createdAt: '2023-10-02T17:39:52.373Z',
  updatedAt: '2023-10-03T17:39:52.373Z'
}

const responseCategoriesItemsMock = Array(5)
  .fill('')
  .map((_, index) => ({
    ...categoriesMock,
    _id: categoriesMock._id + index,
    name: index + categoriesMock.name
  }))

const responseCategoriesMock = {
  count: 5,
  items: responseCategoriesItemsMock
}

describe('CategoriesContainer test', () => {
  beforeEach(async () => {
    mockAxiosClient
      .onGet(URLs.resources.resourcesCategories.get)
      .reply(200, responseCategoriesMock)
    renderWithProviders(<CategoriesContainer />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render "New category" button', () => {
    const newCategoryBtn = screen.getByText('myResourcesPage.categories.addBtn')
    expect(newCategoryBtn).toBeInTheDocument()
  })

  it('should render table with category items', () => {
    const categoryItemTitle = screen.getByText(
      responseCategoriesMock.items[0].name
    )
    const tableLastUpdatesText = screen.getByText(
      'myResourcesPage.categories.updated'
    )

    expect(categoryItemTitle).toBeInTheDocument()
    expect(tableLastUpdatesText).toBeInTheDocument()
  })
})
