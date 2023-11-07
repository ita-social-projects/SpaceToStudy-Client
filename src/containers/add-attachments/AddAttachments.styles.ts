import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  categoryChip: {
    backgroundColor: 'inherit',
    border: `2px solid ${palette.basic.turquoiseDark}`,
    borderRadius: '50px',
    '& .MuiChip-label': { p: '0px 8px' }
  },
  categoryChipLabel: {
    typography: TypographyVariantEnum.Caption,
    fontWeight: 500,
    color: 'basic.turquoiseDark'
  },
  date: { color: 'primary.400', typography: TypographyVariantEnum.Caption }
}
