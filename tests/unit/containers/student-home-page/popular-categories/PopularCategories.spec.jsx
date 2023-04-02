import { screen, render } from '@testing-library/react'
import { vi } from 'vitest'

import PopularCategories from '~/containers/student-home-page/popular-categories/PopularCategories'

vi.mock('~/hooks/use-show-more')

describe('PopularCategories component', () => {
  beforeEach(() => {
    render(<PopularCategories />)
  })

  it('should render title', () => {
    const title = screen.getByText(/studentHomePage.popularCategories.title/)

    expect(title).toBeInTheDocument()
  })

  it('should render showMore button', () => {
    const btn = screen.getByText(/studentHomePage.popularCategories.viewMore/)

    expect(btn).toBeInTheDocument()
  })
})
