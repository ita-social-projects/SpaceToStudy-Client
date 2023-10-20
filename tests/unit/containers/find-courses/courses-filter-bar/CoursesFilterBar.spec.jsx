import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CoursesFilterBar from '~/containers/find-course/courses-filter-bar/CoursesFilterBar'

describe('tests for Courses filter ber menu', () => {
  beforeEach(() => {
    renderWithProviders(<CoursesFilterBar />)
  })

  it('should render courses filter bar menu', () => {
    const myCoursesSortBy = screen.getByText('filters.sortBy.sortByTitle')
    expect(myCoursesSortBy).toBeInTheDocument()
  })
})
