import { hasPhotoChanges } from '~/utils/has-photo-changes'

describe('hasPhotoChanges', () => {
  it('should return true if initialPhoto is not empty and currentPhoto is empty', () => {
    const initialPhoto = 'initialPhoto'
    const currentPhoto = ''
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(true)
  })

  it('should return true if initialPhoto is a string and currentPhoto is an UpdatedPhoto with a different name', () => {
    const initialPhoto = 'initialPhoto'
    const currentPhoto = { src: 'src', name: 'newName' }
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(true)
  })

  it('should return true if initialPhoto is null and currentPhoto is an UpdatedPhoto with all values empty strings', () => {
    const initialPhoto = null
    const currentPhoto = { src: '', name: '' }
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(true)
  })

  it('should return true if both initialPhoto and currentPhoto are UpdatedPhotos with different names', () => {
    const initialPhoto = { src: 'src1', name: 'name1' }
    const currentPhoto = { src: 'src2', name: 'name2' }
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(true)
  })

  it('should return false if there are no changes', () => {
    const initialPhoto = { src: 'src', name: 'name' }
    const currentPhoto = { src: 'src', name: 'name' }
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(false)
  })

  it('should return false if both initialPhoto and currentPhoto are empty strings', () => {
    const initialPhoto = ''
    const currentPhoto = ''
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(false)
  })

  it('should return false if both initialPhoto and currentPhoto are null', () => {
    const initialPhoto = null
    const currentPhoto = null
    expect(hasPhotoChanges(initialPhoto, currentPhoto)).toBe(false)
  })
})
