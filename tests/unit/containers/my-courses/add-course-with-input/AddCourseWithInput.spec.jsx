import { fireEvent, screen, act } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AddCourseWithInput from '~/containers/my-courses/add-course-with-input/AddCourseWithInput'

const mockedFilterActions = {
  updateFiltersInQuery: vi.fn()
}

const mockedFilters = {
  title: 'value'
}

describe('AddCourseWithInput test', () => {
  beforeEach(() => {
    renderWithProviders(
      <AddCourseWithInput
        filterActions={mockedFilterActions}
        filters={mockedFilters}
        sort=""
      />
    )
  })

  it('should render "New course" button', () => {
    const addBtn = screen.getByText('myCoursesPage.buttonLabel')

    expect(addBtn).toBeInTheDocument()
  })

  it('should change and clear input value', () => {
    const input = screen.getByRole('textbox')

    expect(input.value).toBe('value')

    fireEvent.change(input, { target: { value: 'new value' } })

    expect(mockedFilterActions.updateFiltersInQuery).toHaveBeenCalled()

    const clearButton = screen.getByTestId('ClearRoundedIcon')

    fireEvent.click(clearButton)

    expect(mockedFilterActions.updateFiltersInQuery).toHaveBeenCalled()
  })

  it('should render filters', async () => {
    const filters = screen.getByText('filters.filtersListTitle')

    expect(filters).toBeInTheDocument()
    await act(() => fireEvent.click(filters))
    const filtersModal = screen.getByRole('presentation')
    expect(filtersModal).toBeInTheDocument()
  })
})
