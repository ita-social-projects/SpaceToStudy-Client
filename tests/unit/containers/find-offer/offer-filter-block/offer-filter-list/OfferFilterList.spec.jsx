import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import OfferFilterList from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList'

import { ProficiencyLevelEnum, UserRoleEnum } from '~/types'
import { selectOption, renderWithProviders } from '~tests/test-utils'

const mockUpdateFiltersInQuery = vi.fn()
const mockInnerFn = vi.fn()
const mockUpdateFilterByKey = vi.fn().mockImplementation(() => mockInnerFn)

const defaultFilters = {
  language: null,
  native: 'false',
  proficiencyLevel: [],
  price: [0, 100],
  rating: 0,
  search: ''
}

const priceRange = { minPrice: 0, maxPrice: 100 }

const preloadedTutorState = {
  appMain: {
    userRole: UserRoleEnum.Tutor
  }
}
const preloadedStudentState = {
  appMain: {
    userRole: UserRoleEnum.Student
  }
}

const setupWithRole = (preloadedState) => {
  renderWithProviders(
    <OfferFilterList
      filters={defaultFilters}
      price={priceRange}
      updateFilterByKey={mockUpdateFilterByKey}
      updateFiltersInQuery={mockUpdateFiltersInQuery}
    />,
    { preloadedState }
  )
}

describe('OfferFilterList for Tutor', () => {
  beforeEach(() => {
    setupWithRole(preloadedTutorState)
  })

  it('renders filter titles correctly', () => {
    const filterTitle = screen.getByText('findOffers.filterTitles.level')
    expect(filterTitle).toBeInTheDocument()
  })

  it('calls updateFiltersInQuery when language is changed', async () => {
    const autoComplete = screen.getByRole('combobox')
    await selectOption(autoComplete, 'English')
    expect(mockUpdateFiltersInQuery).toHaveBeenCalledWith({
      language: 'English'
    })
  })

  it('calls updateFiltersInQuery when native speaker checkbox is changed', () => {
    const nativeCheckbox = screen.getByLabelText(
      'findOffers.filterTitles.nativeSpeaker'
    )
    fireEvent.click(nativeCheckbox)
    expect(mockUpdateFiltersInQuery).toHaveBeenCalledWith({ native: 'true' })
  })

  it('calls updateFilterByKey when proficiency level is changed', () => {
    const checkbox = screen.getByLabelText(ProficiencyLevelEnum.Beginner)
    fireEvent.click(checkbox)

    expect(mockUpdateFilterByKey).toHaveBeenCalledWith('proficiencyLevel')
    expect(mockInnerFn).toHaveBeenCalledWith([ProficiencyLevelEnum.Beginner])
  })

  it('calls updateFilterByKey when price range is changed', () => {
    const [leftInput] = screen.getAllByRole('textbox')
    const inputValue = 10
    fireEvent.change(leftInput, { target: { value: inputValue } })
    expect(mockUpdateFilterByKey).toHaveBeenCalledWith('price')
  })

  it('calls updateFilterByKey when rating is changed', () => {
    const ratingRadio = screen.getByLabelText('findOffers.radioFilter.5stars')
    fireEvent.click(ratingRadio)
    expect(mockUpdateFilterByKey).toHaveBeenCalledWith('rating')
  })
})

describe('OfferFilterList for Student', () => {
  beforeEach(() => {
    setupWithRole(preloadedStudentState)
  })

  it('calls updateFilterByKey when proficiency level is changed', () => {
    const proficiencyCheckbox = screen.getByLabelText(
      ProficiencyLevelEnum.Beginner
    )
    fireEvent.click(proficiencyCheckbox)
    expect(mockUpdateFilterByKey).toHaveBeenCalledWith('proficiencyLevel')
  })
})
