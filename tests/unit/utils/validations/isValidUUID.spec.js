import { isValidUUID } from '~/utils/validations/isValidUUID'

describe('isValidUUID', () => {
  test('returns true for valid UUID v4', () => {
    expect(isValidUUID('3b17ccb0-ea8b-4685-b576-0b5de7b3f0ef')).toBe(true)
    expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
  })

  test('returns false for invalid UUIDs', () => {
    expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400')).toBe(false)
    expect(isValidUUID('123e4567-e89b-12d3-a456-4266141740000')).toBe(false)
    expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400z')).toBe(false)
    expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400G')).toBe(false)
    expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400-')).toBe(false)
    expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400')).toBe(false)
    expect(isValidUUID('550e8400-e29b-41d4-a716-44665544000')).toBe(false)
    expect(isValidUUID('550e8400-e29b-41d4-a716-4466554400000')).toBe(false)
  })

  test('returns false for non-UUID strings', () => {
    expect(isValidUUID('')).toBe(false)
    expect(isValidUUID(null)).toBe(false)
    expect(isValidUUID(undefined)).toBe(false)
    expect(isValidUUID('not-a-uuid')).toBe(false)
    expect(isValidUUID('12345678-1234-1234-1234-123456789012')).toBe(false)
  })
})
