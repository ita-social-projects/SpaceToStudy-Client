import CreateCourse from '~/pages/create-course/CreateCourse'
import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'

describe('CreateCourse', () => {
  beforeEach(() => {
    renderWithProviders(<CreateCourse />)
  })

  it('should render page and find "New course" title', () => {
    const newCourseBreadcrumb = screen.getByText('New course')
    expect(newCourseBreadcrumb).toBeInTheDocument()
  })
})
