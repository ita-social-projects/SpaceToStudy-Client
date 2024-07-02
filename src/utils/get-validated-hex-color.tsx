import palette from '~/styles/app-theme/app.pallete'

const HEX_COLOR_PATTERN = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i

export const getValidatedHexColor = (
  color: string,
  fallbackColor: string = palette.success[500]
): string => {
  const isValidHex = HEX_COLOR_PATTERN.test(color)
  return isValidHex ? color : fallbackColor
}
