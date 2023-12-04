import { screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import MyCourses from '~/pages/my-courses/MyCourses'
import { mockCourse } from '~tests/unit/pages/my-courses/MyCourses.spec.constans'

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...mockCourse,
    _id: `${index}`,
    title: index + mockCourse.title
  }))

const mockCoursesData = {
  count: 10,
  items: responseItemsMock
}

describe('tests for MyCourses page', () => {
  beforeEach(() => {
    mockAxiosClient.onGet(URLs.courses.get).reply(200, mockCoursesData)
    renderWithProviders(<MyCourses />)
  })

  it('should render page title', async () => {
    const myCoursesTitle = await screen.findByText('myCoursesPage.title')

    expect(myCoursesTitle).toBeInTheDocument()
  })
})
