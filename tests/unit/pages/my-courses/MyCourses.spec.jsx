import { fireEvent, screen, waitFor, act } from '@testing-library/react'
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
  beforeEach(async () => {
    mockAxiosClient.onGet(URLs.courses.get).reply(200, mockCoursesData)
    mockAxiosClient.onPost(URLs.courses.create).reply(200, null)
    await waitFor(() => renderWithProviders(<MyCourses />))
  })

  it('should render page title', async () => {
    const myCoursesTitle = await screen.findByText('myCoursesPage.title')

    expect(myCoursesTitle).toBeInTheDocument()
  })

  it('should click delete button', async () => {
    const menu = await screen.findAllByTestId('MoreVertIcon')

    fireEvent.click(menu[0])

    const deleteBtn = await screen.findByText('common.delete')

    fireEvent.click(deleteBtn)

    const title = screen.getByText(
      'myCoursesPage.modalMessages.confirmDeletionMessage'
    )

    expect(title).toBeInTheDocument()
  })

  it('should click duplicate button', async () => {
    const menu = await screen.findAllByTestId('MoreVertIcon')

    await act(() => fireEvent.click(menu[1]))

    const duplicateBtn = screen.getByText('common.duplicate')

    await act(() => fireEvent.click(duplicateBtn))

    const title = screen.getByText(
      '1Advanced Lineal Math: Theoretical Concepts'
    )

    expect(title).toBeInTheDocument()
  })
})
