import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import { URLs } from '~/constants/request'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, options) => options?.defaultValue || key.split('.').pop()
  })
}))
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
  beforeEach(() => {
    mockAxiosClient.onGet(URLs.categories.get).reply(200, mockResponse)

    renderWithProviders(
      <PopularCategories description={description} title={title} />
    )
  })

  it('renders the component with the correct title', () => {
    const title = screen.getByText('common.popularCategories')

    expect(title).toBeInTheDocument()
  })

  it('should render offer count descriptions for popularCategories', () => {
    const noOffers = screen.queryByText(/offers/)
    expect(noOffers).not.toBeInTheDocument()
  })
})
