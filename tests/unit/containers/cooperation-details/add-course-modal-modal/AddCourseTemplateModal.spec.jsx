import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'

import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { mockCourse } from '~tests/unit/pages/my-courses/MyCourses.spec.constans'

const closeModalMock = vi.fn()

global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn()
}))

const responseItemsMock = Array(5)
  .fill()
  .map((_, index) => ({
    ...mockCourse,
    _id: `${index}`,
    title: index + mockCourse.title
  }))

const mockCoursesData = { count: 5, items: responseItemsMock }
const inputTestValue = 'hello'

describe('AddCourseTemplateModal test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient.onGet(URLs.courses.get).reply(200, mockCoursesData)
      renderWithProviders(
        <AddCourseTemplateModal closeModal={closeModalMock} />
      )
    })
  })

  it('should render AddCourseTemplateModal component', () => {
    const title = screen.getByText(
      'cooperationDetailsPage.addCourseModal.title'
    )

    expect(title).toBeInTheDocument()
  })

  it('should change and clear search input value', () => {
    const searchInput = screen.getByPlaceholderText('common.search')

    fireEvent.click(searchInput)
    fireEvent.change(searchInput, { target: { value: inputTestValue } })

    expect(searchInput.value).toBe(inputTestValue)

    const button = screen.getByTestId('clearIcon')

    waitFor(() => fireEvent.click(button))

    expect(searchInput.value).not.toBe(inputTestValue)
  })

  it('should render not found and click on add new course button', () => {
    const searchInput = screen.getByPlaceholderText('common.search')

    fireEvent.click(searchInput)
    fireEvent.change(searchInput, { target: { value: inputTestValue } })

    expect(searchInput.value).toBe(inputTestValue)

    const button = screen.getByText('myCoursesPage.buttonLabel +')

    waitFor(() => fireEvent.click(button))

    expect(closeModalMock).toHaveBeenCalled()
  })

  it('should render filters button and show additional filters on click', () => {
    const filtersBtn = screen.getByTestId('toggle-button')

    fireEvent.click(filtersBtn)

    const clearBtn = screen.getByText('common.clear')

    expect(clearBtn).toBeInTheDocument()
  })

  it('should select course and click on add button', () => {
    const course = screen.getByText(1 + mockCourse.title)

    fireEvent.click(course)

    const addBtn = screen.getByText('common.add')

    fireEvent.click(addBtn)

    expect(closeModalMock).toHaveBeenCalled()
  })
})
