import { expect } from 'vitest'

import { isUpdatedPhoto } from '~/utils/is-updated-photo'

describe('isUpdatedPhoto', () => {
  it('should return true if the photo has structure of UpdatedPhoto', () => {
    const photo = { name: 'photo-name', src: 'photo-src' }

    expect(isUpdatedPhoto(photo)).toBe(true)
  })

  it('should return false if the photo is null', () => {
    const photo = null

    expect(isUpdatedPhoto(photo)).toBe(false)
  })

  it('should return false if the photo is a string', () => {
    const photo = 'not-an-object'

    expect(isUpdatedPhoto(photo)).toBe(false)
  })

  it('should return false if the photo does not have a name property', () => {
    const photo = { src: 'photo-src' }

    expect(isUpdatedPhoto(photo)).toBe(false)
  })
})
