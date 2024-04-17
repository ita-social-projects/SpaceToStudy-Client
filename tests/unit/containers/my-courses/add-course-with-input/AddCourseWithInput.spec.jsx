import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AddCourseWithInput from '~/containers/my-courses/add-course-with-input/AddCourseWithInput'

const mockedFilterActions = {
  updateFiltersInQuery: vi.fn()
}

const mockedFilters = {
  title: ''
}

describe('AddCourseWithInput test', () => {
  beforeEach(() => {
    renderWithProviders(
      <AddCourseWithInput
        filterActions={mockedFilterActions}
        filters={mockedFilters}
      />
    )
  })

  it('should render "New course" button', () => {
    const addBtn = screen.getByText('myCoursesPage.buttonLabel')

    expect(addBtn).toBeInTheDocument()
  })

  it('should change input value', async () => {
    const input = screen.getByRole('textbox')

    expect(input.value).toBe('')

    fireEvent.change(input, { target: { value: 'new value' } })

    expect(mockedFilterActions.updateFiltersInQuery).toHaveBeenCalled()
  })
})
