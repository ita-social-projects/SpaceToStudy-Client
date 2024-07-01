import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import CoursesFilters from '~/containers/find-course/courses-filters/CoursesFilters'

const filtersMocked = {
  category: 'Music',
  subject: '',
  proficiencyLevel: ['Beginner', 'Advanced']
}
const onCategoryChangeMocked = vi.fn()
const onSubjectChangeMocked = vi.fn()
const onLevelChangeMocked = vi.fn()
const resetFiltersMocked = vi.fn()

describe('CoursesFilters component', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <CoursesFilters
          filters={filtersMocked}
          onCategoryChange={onCategoryChangeMocked}
          onLevelChange={onLevelChangeMocked}
          onSubjectChange={onSubjectChangeMocked}
          resetFilters={resetFiltersMocked}
        />
      )
    })
  })

  it('should render courses filters', () => {
    const filtersInputs = screen.getAllByRole('combobox')
    expect(filtersInputs.length).toBe(3)
  })

  it('should render button and clear filters', () => {
    const clearBtn = screen.getByText('common.clear')

    fireEvent.click(clearBtn)

    expect(resetFiltersMocked).toHaveBeenCalled()
  })

  it('should display all chosen proficiency levels', () => {
    const chosenLevels = screen.getByText(
      filtersMocked.proficiencyLevel.join(', ')
    )

    expect(chosenLevels).toBeInTheDocument()
  })
})
