import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  iconTitleDescription: {
    container: { display: 'flex', columnGap: '16px', alignItems: 'center' },
    icon: {
      svg: { width: '16px', height: '16px', color: 'primary.600' }
    },
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
    }
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'basic.grey',
    borderRadius: '4px',
    p: '8px'
  },
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
  date: {
    color: 'primary.400',
    typography: TypographyVariantEnum.Caption
  }
}
