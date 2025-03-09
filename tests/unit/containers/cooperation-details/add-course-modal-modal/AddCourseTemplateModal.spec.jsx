import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import AddCourseTemplateModal from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { mockCourse } from '~tests/unit/pages/my-courses/MyCourses.spec.constans'
import { vi } from 'vitest'

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
  beforeEach(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.courses.get))
      .reply(200, mockCoursesData)
    mockAxiosClient
      .onGet(new RegExp(URLs.users.getUserById.replace(':id', '')))
      .reply(200, null)

    renderWithProviders(<AddCourseTemplateModal closeModal={closeModalMock} />)
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

    fireEvent.click(button)

    expect(searchInput.value).not.toBe(inputTestValue)
  })

  it('should render not found and click on add new course button', async () => {
    const searchInput = screen.getByPlaceholderText('common.search')

    fireEvent.click(searchInput)
    fireEvent.change(searchInput, { target: { value: inputTestValue } })

    expect(searchInput.value).toBe(inputTestValue)

    const button = await screen.findByText('myCoursesPage.buttonLabel +')

    fireEvent.click(button)

    expect(closeModalMock).toHaveBeenCalled()
  })

  it('should render filters button and show additional filters on click', () => {
    const filtersBtn = screen.getByTestId('toggle-button')

    fireEvent.click(filtersBtn)

    const clearBtn = screen.getByText('common.clear')

    expect(clearBtn).toBeInTheDocument()
  })

  it('should select course and click on add button', async () => {
    const course = await screen.findByText(`1${mockCourse.title}`)
    fireEvent.click(course)

    const addBtn = await screen.findByText('common.add')

    fireEvent.click(addBtn)

    expect(closeModalMock).toHaveBeenCalled()
  })

  it('should apply filters and update course list', async () => {
    const searchInput = screen.getByPlaceholderText('common.search')
    fireEvent.change(searchInput, { target: { value: '2' } })

    const filteredCourse = await screen.findByText('2' + mockCourse.title)

    expect(filteredCourse).toBeInTheDocument()
  })

  it('should handle cancel button click', () => {
    const cancelBtn = screen.getByText('common.cancel')
    fireEvent.click(cancelBtn)

    expect(closeModalMock).toHaveBeenCalled()
  })

  it('should show "No results found" if search value does not match any course', async () => {
    const searchInput = screen.getByPlaceholderText('common.search')

    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

    const noResults = await screen.findByText(
      'myCoursesPage.notFound.largeDescription'
    )
    expect(noResults).toBeInTheDocument()
  })
  it('should disable "Add" button when no course is selected', async () => {
    const addBtn = await screen.findByRole('button', { name: 'common.add' })
    expect(addBtn).toBeDisabled()
  })
})
