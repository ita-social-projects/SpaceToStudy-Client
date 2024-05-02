import { expect } from 'vitest'

import { updateCheckBoxState } from '~/utils/checkbox-list'

const mockedItems = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Test Preparation',
  'Professional'
]
const mockedValueforsingleSelect = ['Advanced']
const mockedValueforfillRange = ['Intermediate', 'Advanced']

describe('updateCheckBoxState', () => {
  it('Should return updated checkboxes', () => {
    const updatedCheckboxes = updateCheckBoxState(
      mockedItems,
      mockedValueforfillRange,
      'Test Preparation'
    )
    expect(updatedCheckboxes).toEqual([
      'Intermediate',
      'Advanced',
      'Test Preparation'
    ])
  })

  it('Should return updated checkboxes with singleSelect', () => {
    const updatedCheckboxes = updateCheckBoxState(
      mockedItems,
      mockedValueforsingleSelect,
      'Beginner',
      false,
      true
    )
    expect(updatedCheckboxes).toEqual(['Beginner'])
  })

  it('Should return updated checkboxes with fillRange', () => {
    const updatedCheckboxes = updateCheckBoxState(
      mockedItems,
      mockedValueforfillRange,
      'Professional',
      true,
      false
    )
    expect(updatedCheckboxes).toEqual([
      'Intermediate',
      'Advanced',
      'Test Preparation',
      'Professional'
    ])
  })

  it('Should return updated checkboxes when checkbox is already selected', () => {
    const updatedCheckboxes = updateCheckBoxState(
      mockedItems,
      mockedValueforfillRange,
      'Advanced'
    )
    expect(updatedCheckboxes).toEqual(['Intermediate'])
  })
})
