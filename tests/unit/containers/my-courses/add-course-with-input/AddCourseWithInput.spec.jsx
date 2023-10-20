import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AddCourseWithInput from '~/containers/my-courses/add-course-with-input/AddCourseWithInput'

describe('AddCourseWithInput test', () => {
  beforeEach(() => {
    renderWithProviders(<AddCourseWithInput />)
  })

  it('should render "New course" button', () => {
    const addBtn = screen.getByText('myCoursesPage.buttonLabel')

    expect(addBtn).toBeInTheDocument()
  })
})
