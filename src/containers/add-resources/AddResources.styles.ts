import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  titleWithDescription: {
    wrapper: { display: 'flex', flexDirection: 'column', rowGap: '3px' },
    title: {
      typography: TypographyVariantEnum.Subtitle2,
      color: 'primary.900'
    },
    description: {
      typography: TypographyVariantEnum.Caption,
      color: 'primary.400'
    }
  },
  questionTitle: { display: 'flex', alignItems: 'center', columnGap: '8px' },
  questionIcon: { width: '16px', height: '16px', color: 'primary.600' },
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
