import { screen, render, fireEvent } from '@testing-library/react'

import OfferFilterList from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList'

import { useAppSelector } from '~/hooks/use-redux'
import { ProficiencyLevelEnum, UserRoleEnum } from '~/types'
import { selectOption } from '~tests/test-utils'

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn()
}))

const mockUpdateFilterByKey = vi.fn()
const mockUpdateFiltersInQuery = vi.fn()

const defaultFilters = {
  language: null,
  native: 'false',
  proficiencyLevel: [],
  price: [0, 100],
  rating: 0,
  search: ''
}

const priceRange = { minPrice: 0, maxPrice: 100 }

const setupWithRole = (userRole) => {
  useAppSelector.mockImplementation(() => ({ userRole }))
  render(
    <OfferFilterList
      filters={defaultFilters}
      price={priceRange}
      updateFilterByKey={mockUpdateFilterByKey}
      updateFiltersInQuery={mockUpdateFiltersInQuery}
    />
  )
}

describe('OfferFilterList for Tutor', () => {
  beforeEach(() => {
    setupWithRole(UserRoleEnum.Tutor)
  })

  it('renders filter titles correctly', () => {
    expect(
      screen.getByText('findOffers.filterTitles.level')
    ).toBeInTheDocument()
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
    const proficiencyCheckbox = screen.getByLabelText(
      ProficiencyLevelEnum.Beginner
    )
    fireEvent.click(proficiencyCheckbox)
    expect(mockUpdateFilterByKey).toHaveBeenCalledWith('proficiencyLevel')
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
    setupWithRole(UserRoleEnum.Student)
  })

  it('calls updateFilterByKey when proficiency level is changed', () => {
    const proficiencyCheckbox = screen.getByLabelText(
      ProficiencyLevelEnum.Beginner
    )
    fireEvent.click(proficiencyCheckbox)
    expect(mockUpdateFilterByKey).toHaveBeenCalledWith('proficiencyLevel')
  })
})
