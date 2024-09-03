import { fireEvent, screen, waitFor } from '@testing-library/react'

import CoursesFiltersDrawer from '~/containers/my-courses/courses-filters-drawer/CoursesFiltersDrawer'

import { renderWithProviders } from '~tests/test-utils'
import { mockAxiosClient, selectOption } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const mockUpdateFiltersInQuery = vi.fn()
const mockResetFilters = vi.fn()
const mockOnClose = vi.fn()

const defaultFilters = {
  category: '',
  subject: '',
  proficiencyLevel: [],
  title: ''
}
const filterWithCategory = {
  category: '1',
  subject: '',
  proficiencyLevel: [],
  title: ''
}

const filterActions = {
  updateFiltersInQuery: mockUpdateFiltersInQuery,
  resetFilters: mockResetFilters
}

const mockCategories = [
  { _id: '1', name: 'Mathematics' },
  { _id: '2', name: 'Science' }
]

const mockSubjects = [{ _id: '1', name: 'Algebra' }]

const setup = async (filters) => {
  mockAxiosClient.onGet(URLs.categories.getNames).reply(200, mockCategories)
  mockAxiosClient
    .onGet(`${URLs.categories.get}/1${URLs.subjects.getNames}`)
    .reply(200, mockSubjects)

  await waitFor(() => {
    renderWithProviders(
      <CoursesFiltersDrawer
        additionalParams={{}}
        filterActions={filterActions}
        filters={filters}
        isOpen
        onClose={mockOnClose}
      />
    )
  })
}

describe('CoursesFiltersDrawer', () => {
  describe('with default filters', () => {
    beforeEach(() => {
      setup(defaultFilters)
    })

    it('renders filter titles correctly', async () => {
      const coursesFilterLabel = screen.getByText(
        /myCoursesPage.coursesFilter.coursesFilterLabel/
      )
      const categoryLabel = screen.getByText(
        /myCoursesPage.coursesFilter.category:/
      )

      expect(coursesFilterLabel).toBeInTheDocument()
      expect(categoryLabel).toBeInTheDocument()
    })

    it('calls updateFiltersInQuery when category is changed', async () => {
      const autoComplete = screen.getByLabelText(
        'myCoursesPage.coursesFilter.categoryLabel'
      )
      await selectOption(autoComplete, 'Mathematics')
      expect(mockUpdateFiltersInQuery).toHaveBeenCalledWith({
        category: '1',
        subject: ''
      })
    })

    it('calls updateFiltersInQuery when search input is changed', () => {
      const input = screen.getByPlaceholderText('common.search')
      fireEvent.change(input, { target: { value: 'test input' } })
      expect(mockUpdateFiltersInQuery).toHaveBeenCalledWith({
        title: 'test input'
      })
    })

    it('calls resetFilters when clear filters button is clicked', () => {
      const clearButton = screen.getByText('button.clearFilters')
      fireEvent.click(clearButton)
      expect(mockResetFilters).toHaveBeenCalled()
    })

    it('calls updateFiltersInQuery and onClose when apply filters button is clicked', () => {
      const applyButton = screen.getByText('button.applyFilters')
      fireEvent.click(applyButton)
      expect(mockUpdateFiltersInQuery).toHaveBeenCalled()
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe('with category filter', () => {
    beforeEach(() => {
      setup(filterWithCategory)
    })

    it('calls updateFiltersInQuery when subject is changed', async () => {
      const categoryAutoComplete = screen.getByLabelText(
        'myCoursesPage.coursesFilter.categoryLabel'
      )
      await selectOption(categoryAutoComplete, mockCategories[0].name)

      const subjectAutoComplete = screen.getByLabelText(
        'myCoursesPage.coursesFilter.subjectLabel'
      )
      await selectOption(subjectAutoComplete, 'Algebra')
      expect(mockUpdateFiltersInQuery).toHaveBeenCalledWith({ subject: '1' })
    })
  })
})
