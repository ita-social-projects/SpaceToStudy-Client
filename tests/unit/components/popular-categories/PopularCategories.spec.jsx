import { screen, waitFor } from '@testing-library/react'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import { URLs } from '~/constants/request'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'

const items = [
  {
    _id: '1',
    name: 'Math',
    totalOffers: 10,
    appearance: {
      icon: 'math.svg',
      color: '#FF0000'
    }
  },
  {
    _id: '2',
    name: 'Science',
    totalOffers: 20,
    appearance: {
      icon: 'science.svg',
      color: '#22ff33'
    }
  }
]

const mockResponse = { count: items.length, items }

const title = 'common.popularCategories'
const description = 'studentHomePage.popularCategories.description'

describe('PopularCategories', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient.onGet(URLs.categories.get).reply(200, mockResponse)

      renderWithProviders(
        <PopularCategories description={description} title={title} />
      )
    })
  })

  it('renders the component with the correct title', () => {
    const title = screen.getByText('common.popularCategories')

    expect(title).toBeInTheDocument()
  })

  it('render card correctly', async () => {
    const card = await screen.findByText('Math')

    expect(card).toBeInTheDocument()
  })

  it('should render offer count descriptions for popularCategories', async () => {
    await waitFor(() => {
      const noOffers = screen.queryByText(/offers/)
      expect(noOffers).not.toBeInTheDocument()
    })
  })
})
