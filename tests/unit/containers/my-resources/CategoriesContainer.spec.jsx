import { fireEvent, screen, waitFor } from '@testing-library/react'
import { expect, vi } from 'vitest'

import CategoriesContainer from '~/containers/my-resources/categories-container/CategoriesContainer'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

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
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.resourcesCategories.get)
        .reply(200, responseCategoriesMock)

      renderWithProviders(<CategoriesContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render "New category" button', () => {
    const newCategoryBtn = screen.getByText('myResourcesPage.categories.addBtn')

    expect(newCategoryBtn).toBeInTheDocument()
  })

  it('should render table with category items', async () => {
    const categoryItemTitle = await screen.findByText(
      responseCategoriesMock.items[0].name
    )
    const tableLastUpdatesText = await screen.findByText(
      'myResourcesPage.categories.updated'
    )

    expect(categoryItemTitle).toBeInTheDocument()
    expect(tableLastUpdatesText).toBeInTheDocument()
  })

  it('should open new category modal after button click', async () => {
    const addCategoryBtn = await screen.findByText(
      'myResourcesPage.categories.addBtn',
      { selector: 'button' }
    )

    waitFor(() => {
      fireEvent.click(addCategoryBtn)
    })

    const addCategoryPopover = screen.getByTestId('popupContent')

    expect(addCategoryPopover).toBeInTheDocument()
  })

  it('should display category menu', () => {
    const categoryMenuBtn = screen.getAllByTestId('menu-icon')[0]

    waitFor(() => {
      fireEvent.click(categoryMenuBtn)
    })

    const categoryMenu = screen.getByRole('menu')

    expect(categoryMenu).toBeInTheDocument()
  })
})
