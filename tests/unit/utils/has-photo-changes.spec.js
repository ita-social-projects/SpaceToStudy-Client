import { describe, it, expect, vi, beforeEach } from 'vitest'
import { hasPhotoChanges } from '~/utils/has-photo-changes'
import { isUpdatedPhoto } from '~/utils/is-updated-photo'
import { areAllValuesEmptyStrings } from '~/utils/are-all-values-empty-strings'

vi.mock('~/utils/is-updated-photo', () => ({
  isUpdatedPhoto: vi.fn()
}))

vi.mock('~/utils/are-all-values-empty-strings', () => ({
  areAllValuesEmptyStrings: vi.fn()
}))

describe('hasPhotoChanges', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return true if initialPhoto is not empty and currentPhoto is empty', () => {
    const initialPhoto = 'initialPhoto'
    const currentPhoto = ''
    isUpdatedPhoto.mockReturnValue(false)
    areAllValuesEmptyStrings.mockReturnValue(false)
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(true)
  })

  it('should return true if initialPhoto is a string and currentPhoto is an UpdatedPhoto with a different name', () => {
    const initialPhoto = 'initialPhoto'
    const currentPhoto = { src: 'src', name: 'newName' }
    isUpdatedPhoto.mockReturnValue(true)
    areAllValuesEmptyStrings.mockReturnValue(false)
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(true)
  })

  it('should return true if initialPhoto is null and currentPhoto is an UpdatedPhoto with all values empty strings', () => {
    const initialPhoto = null
    const currentPhoto = { src: '', name: '' }
    isUpdatedPhoto.mockReturnValue(true)
    areAllValuesEmptyStrings.mockReturnValue(true)
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(true)
  })

  it('should return true if both initialPhoto and currentPhoto are UpdatedPhotos with different names', () => {
    const initialPhoto = { src: 'src1', name: 'name1' }
    const currentPhoto = { src: 'src2', name: 'name2' }
    isUpdatedPhoto.mockReturnValue(true)
    areAllValuesEmptyStrings.mockReturnValue(false)
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(true)
  })

  it('should return false if there are no changes', () => {
    const initialPhoto = { src: 'src', name: 'name' }
    const currentPhoto = { src: 'src', name: 'name' }
    isUpdatedPhoto.mockReturnValue(true)
    areAllValuesEmptyStrings.mockReturnValue(false)
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(false)
  })

  it('should return false if both initialPhoto and currentPhoto are empty strings', () => {
    const initialPhoto = ''
    const currentPhoto = ''
    isUpdatedPhoto.mockReturnValue(false)
    areAllValuesEmptyStrings.mockReturnValue(false)
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(false)
  })

  it('should return false if both initialPhoto and currentPhoto are null', () => {
    const initialPhoto = null
    const currentPhoto = null
    isUpdatedPhoto.mockReturnValue(false)
    areAllValuesEmptyStrings.mockReturnValue(false)
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(false)
  })
})
