import MockAdapter from 'axios-mock-adapter'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import PopularCategories from '~/components/popular-categories/PopularCategories'

const mockAxiosClient = new MockAdapter(axiosClient)

const mockCategories = [
  {
    _id: '1',
    name: 'Math',
    totalOffers: 10
  },
  {
    _id: '2',
    name: 'Science',
    totalOffers: 20
  }
]
const title = 'common.popularCategories'

describe('PopularCategories', () => {
  beforeEach(async () => {
    mockAxiosClient.onGet(URLs.categories.get).reply(200, mockCategories)

    render(
      <BrowserRouter location={history.location} navigator={history}>
        <PopularCategories items={mockCategories} title={title} />
      </BrowserRouter>
    )
  })

  it('renders the component with the correct title', () => {
    const title = screen.getByText('common.popularCategories')
    expect(title).toBeInTheDocument()
  })

  it('navigates to the correct category when a card is clicked', async () => {
    const card = screen.getByText('Math')
    fireEvent.click(card)
    await waitFor(() => {
      expect(`${window.location.pathname}${window.location.search}`).toBe(
        '/categories/subjects?categoryId=1'
      )
    })
  })

  it('navigates to the categories page when the view all button is clicked', async () => {
    const button = screen.getByText('common.viewAllName', { exact: false })
    fireEvent.click(button)
    await waitFor(() => {
      expect(window.location.pathname).toBe('/categories')
    })
  })
})
