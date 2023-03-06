import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import AppSelect from '~/components/app-select/AppSelect'

import { sortByFields } from '~/constants'

const mockedSortingFields = [
  { value: sortByFields.newest, title: 'Newest' },
  { value: sortByFields.popularity, title: 'Popularity' },
  { value: sortByFields.tutorRating, title: 'Tutor rating' },
]

const selectId = 'app-select'
const mockedSetSortedValue = vi.fn()

describe('AppSelect component', () => {
  it('should sort by newest if props sortBy state is newest', () => {
    render(
      <AppSelect
        selectTitle={ 'Sort by' }
        setSortedValue={ mockedSetSortedValue }  
        sortedValue={ sortByFields.newest }
        sortingFields={ mockedSortingFields }
      />)
<<<<<<< HEAD

    const mockedSelect = screen.getByTestId(selectId)
    expect(mockedSelect.value).toBe(sortByFields.newest)

    fireEvent.change(mockedSelect, { target: { value: sortByFields.popularity } })
    
=======
    const mockedSelect = screen.getByTestId(selectId)
    expect(mockedSelect.value).toBe(sortByFields.newest)
    fireEvent.change(mockedSelect, { target: { value: sortByFields.popularity } })
>>>>>>> b2a9a38 (changed unit test and updated vars name)
    expect(mockedSetSortedValue).toBeCalledWith(sortByFields.popularity)
  })
})
