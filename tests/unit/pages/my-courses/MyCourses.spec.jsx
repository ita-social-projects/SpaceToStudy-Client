import { fireEvent, screen, waitFor } from '@testing-library/react'
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
    mockAxiosClient.onPost(URLs.courses.create).reply(200, null)
    renderWithProviders(<MyCourses />)
  })

  it('should render page title', async () => {
    const myCoursesTitle = await screen.findByText('myCoursesPage.title')

    expect(myCoursesTitle).toBeInTheDocument()
  })

  it('should click duplicate button', async () => {
    const menu = screen.getAllByTestId('MoreVertIcon')[0].parentElement

    fireEvent.click(menu)

    const duplicateBtn = await screen.findByText('common.duplicate')

    waitFor(() => {
      fireEvent.click(duplicateBtn)
    })

    const title = screen.getByText(
      '0Advanced Lineal Math: Theoretical Concepts'
    )

    waitFor(() => expect(title).toBeInTheDocument())
  })
})
