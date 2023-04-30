import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import AppSelect from '~/components/app-select/AppSelect'

const sortByFields = {
  newest: 'newest',
  tutorRating: 'tutorRating',
  popularity: 'popularity'
}

const mockedSortingFields = [
  { value: sortByFields.newest, title: 'Newest' },
  { value: sortByFields.popularity, title: 'Popularity' },
  { value: sortByFields.tutorRating, title: 'Tutor rating' }
]

const titleId = 'select-title'
const selectId = 'app-select'
const mockedSetSortedValue = vi.fn()

describe('AppSelect component', () => {
  it('should sort by newest if props sortBy state is newest', () => {
    render(
      <AppSelect
        fields={mockedSortingFields}
        selectTitle={'Sort by'}
        setValue={mockedSetSortedValue}
        value={sortByFields.newest}
      />
    )

    const mockedSelect = screen.getByTestId(selectId)
    expect(mockedSelect.value).toBe(sortByFields.newest)

    fireEvent.change(mockedSelect, {
      target: { value: sortByFields.popularity }
    })

    expect(mockedSetSortedValue).toBeCalledWith(sortByFields.popularity)
  })
  it('should not render title element if title was not passed into component', () => {
    render(
      <AppSelect
        fields={mockedSortingFields}
        setValue={mockedSetSortedValue}
        value={sortByFields.newest}
      />
    )

    const title = screen.queryByLabelText(titleId)

    expect(title).toBeNull()
  })
})
