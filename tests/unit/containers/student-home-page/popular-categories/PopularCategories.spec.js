import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import PopularCategories from '~/containers/student-home-page/popular-categories/PopularCategories'
import useShowMore from '~/hooks/use-show-more'
import { mockCategories } from '~tests/unit/hooks/mock-categories'

jest.mock('~/hooks/use-show-more')

describe('PopularCategories component', () => {
  it('should expand list of items after click on View More', () => {
    useShowMore.mockReturnValueOnce({
      items: mockCategories.slice(0, 3),
      expandable: true,
      showMore: jest.fn()
    }).mockReturnValueOnce({
      items: mockCategories,
      expandable: false,
      showMore: jest.fn()
    })

    const { rerender } = renderWithProviders(<PopularCategories />)
    const btn = screen.getByText(/studentHomePage.popularCategories.viewMore/)

    fireEvent.click(btn)

    rerender(<PopularCategories />)

    const categories = screen.getAllByTestId('service-card')

    expect(categories).toHaveLength(mockCategories.length)
  })
})
