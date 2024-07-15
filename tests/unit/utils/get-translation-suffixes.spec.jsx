import { getSuffixes } from '~/utils/get-translation-suffixes'

describe('Test "getSuffixes" utility function', () => {
  it('should return "у" for feminine word in Ukrainian', () => {
    const result = getSuffixes('категорію', 'uk')
    expect(result).toEqual({ suffix: 'у' })
  })

  it('should return "ий" for masculine word in Ukrainian', () => {
    const result = getSuffixes('предмет', 'uk')
    expect(result).toEqual({ suffix: 'ий' })
  })

  it('should return an empty suffix for unknown words in Ukrainian', () => {
    const result = getSuffixes('невідомий', 'uk')
    expect(result).toEqual({ suffix: '' })
  })

  it('should return an empty suffix for unsupported languages', () => {
    const result = getSuffixes('категорію', 'en')
    expect(result).toEqual({ suffix: '' })
  })

  it('should return an empty suffix when name is not specified', () => {
    const result = getSuffixes('', 'uk')
    expect(result).toEqual({ suffix: '' })
  })

  it('should return an empty suffix when language is not specified', () => {
    const result = getSuffixes('категорію', '')
    expect(result).toEqual({ suffix: '' })
  })
})
