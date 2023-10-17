import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import MyCourses from '~/pages/my-courses/MyCourses'

describe('tests for MyCourses page', () => {
  beforeEach(() => {
    renderWithProviders(<MyCourses />)
  })

  it('should render page title', () => {
    const myCoursesTitle = screen.getByText('myCoursesPage.title')
    expect(myCoursesTitle).toBeInTheDocument()
  })
})
