import { getValidatedHexColor } from '~/utils/get-validated-hex-color'
import palette from '~/styles/app-theme/app.pallete'

describe('getValidatedHexColor', () => {
  it('should return the color if it is a valid 6-digit hex', () => {
    const color = '#FFFFFF'
    expect(getValidatedHexColor(color)).toBe(color)
  })

  it('should return the color if it is a valid 3-digit hex', () => {
    const color = '#FFF'
    expect(getValidatedHexColor(color)).toBe(color)
  })

  it('should return the fallback color if the input is not a valid hex color', () => {
    const invalidColor = '#WWWWWW'
    expect(getValidatedHexColor(invalidColor)).toBe(palette.success[500])
  })

  it('should return the fallback color if the input is an empty string', () => {
    const invalidColor = ''
    expect(getValidatedHexColor(invalidColor)).toBe(palette.success[500])
  })

  it('should return the custom fallback color if the input is not a valid hex color', () => {
    const invalidColor = '#WWWWWW'
    const customFallbackColor = '#FF5733'
    expect(getValidatedHexColor(invalidColor, customFallbackColor)).toBe(
      customFallbackColor
    )
  })
})
