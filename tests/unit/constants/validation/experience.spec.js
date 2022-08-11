import { experienceField } from '~/constants/validation/experience'

describe('experienceField validation test', () => {
  it('should validate empty field', () => {
    expect(experienceField('')).toBeFalsy()
  })

  it('should validate text', () => {
    expect(experienceField('Some experience'.repeat(20))).toBeFalsy()
  })

  it('should not validate short text', () => {
    expect(experienceField('Some experience')).toBe('common.errorMessages.shortText')
  })

  it('should not validate long text', () => {
    expect(experienceField('Some experience'.repeat(100))).toBe('common.errorMessages.longText')
  })
})
