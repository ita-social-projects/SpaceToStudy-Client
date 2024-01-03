import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CoursesFilterBar from '~/containers/find-course/courses-filter-bar/CoursesFilterBar'

const onChangeValueMock = vi.fn()
const selectValueMock = { default: 'updatedAt desc', updated: 'updatedAt asc' }

describe('tests for Courses filter ber menu', () => {
  beforeEach(() => {
    renderWithProviders(
      <CoursesFilterBar
        onValueChange={onChangeValueMock}
        value={selectValueMock.default}
      />
    )
  })

  it('should render courses filter bar menu', () => {
    const myCoursesSortBy = screen.getByText('filters.sortBy.sortByTitle')
    expect(myCoursesSortBy).toBeInTheDocument()
  })

  it('should change sort', () => {
    const select = screen.getByTestId('app-select')

    expect(select.value).toBe(selectValueMock.default)

    fireEvent.change(select, { target: { value: selectValueMock.updated } })

    expect(onChangeValueMock).toHaveBeenCalled()
  })
})
