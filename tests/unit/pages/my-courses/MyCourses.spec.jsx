import { screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import MyCourses from '~/pages/my-courses/MyCourses'
import { mockCourse } from '~tests/unit/pages/my-courses/MyCourses.spec.constans'

const mockCoursesData = {
  items: [mockCourse],
  count: 0
}

mockAxiosClient.onGet(`${URLs.offers.get}`).reply(200, mockCoursesData)

describe('tests for MyCourses page', () => {
  beforeEach(() => {
    renderWithProviders(<MyCourses />)
  })

  it('should render page title', async () => {
    const myCoursesTitle = await screen.findByText('myCoursesPage.title')

    expect(myCoursesTitle).toBeInTheDocument()
  })

  it('should render loader', () => {
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})
