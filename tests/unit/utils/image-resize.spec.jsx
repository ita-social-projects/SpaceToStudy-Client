import { imageResize, calculatePhotoCut } from '~/utils/image-resize'
import { vi } from 'vitest'

describe('calculatePhotoCut', () => {
  it('shoud resize picture with width > height', () => {
    const originalSizes = { width: 1920, height: 1080 }
    const newSizes = { width: 600, height: 600 }
    const calculatedSizes = calculatePhotoCut(
      originalSizes.width,
      originalSizes.height,
      newSizes.width,
      newSizes.height
    )
    const result = { cutInHeight: 1080, cutInWidth: 1080, newX: 420, newY: 0 }
    expect(calculatedSizes).toMatchObject(result)
  })
  it('shoud resize picture with height > width', () => {
    const originalSizes = { width: 1080, height: 1920 }
    const newSizes = { width: 600, height: 600 }
    const calculatedSizes = calculatePhotoCut(
      originalSizes.width,
      originalSizes.height,
      newSizes.width,
      newSizes.height
    )
    const result = { cutInHeight: 1080, cutInWidth: 1080, newX: 0, newY: 420 }
    expect(calculatedSizes).toMatchObject(result)
  })
})

describe('imageResize', () => {
  HTMLCanvasElement.prototype.toDataURL = vi.fn()
  HTMLCanvasElement.prototype.getContext = () => {
    return {
      drawImage: vi.fn()
    }
  }
  let onloadRef
  beforeAll(() => {
    Object.defineProperty(Image.prototype, 'onload', {
      get() {
        return this._onload
      },
      set(onload) {
        onloadRef = onload
        this._onload = onload
      }
    })
  })
  it('should handle onload event and return url for new image', () => {
    vi.useFakeTimers('legacy')
    const newImageUrl = 'test.image.png'
    HTMLCanvasElement.prototype.toDataURL.mockReturnValue(newImageUrl)
    const newImage = imageResize('image-for-test.jpeg', 600, 600)
    onloadRef()
    newImage.then((result) => expect(result).toBe(newImageUrl)).then()
  })
})
