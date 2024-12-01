import { expect } from 'vitest'

import { areAllValuesEmptyStrings } from '~/utils/are-all-values-empty-strings'

describe('areAllValuesEmptyStrings', () => {
  it('should return true if all values are empty strings', () => {
    const obj = { a: '', b: '', c: '' }
    expect(areAllValuesEmptyStrings(obj)).toBe(true)
  })

  it('should return false if any value is not an empty string', () => {
    const obj = { a: '', b: 'hello', c: '' }
    expect(areAllValuesEmptyStrings(obj)).toBe(false)
  })
})
