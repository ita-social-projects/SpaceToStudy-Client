import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  avatar: {
    height: '48px',
    width: '48px',
    '&:hover': {
      transform: 'scale(1.1)'
    },
    fontSize: {
      xs: '20px',
      md: '16px'
    }
  },
  active: {
    width: '12px',
    height: '12px',
    backgroundColor: 'basic.lime',
    border: '3px solid',
    borderColor: 'basic.white',
    borderRadius: '50%'
  },
  name: {
    color: 'primary.500',
    typography: TypographyVariantEnum.Button,
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: palette.primary[300]
    },
    ml: '3px'
  },
  rating: {
    backgroundColor: 'primary.50'
  },
  reviews: {
    typography: TypographyVariantEnum.Caption,
    color: 'primary.500'
  },
  date: {
    typography: TypographyVariantEnum.Body2,
    color: 'primary.400'
  },
  link: { textDecoration: 'none' },
  roleChip: {
    backgroundColor: 'inherit',
    border: `2px solid ${palette.basic.turquoiseDark}`,
    borderRadius: '50px',
    '& .MuiChip-label': { p: '0px 8px' },
    my: '1px',
    maxWidth: 'fit-content'
  },
  roleChipLabel: {
    typography: TypographyVariantEnum.Caption,
    fontWeight: 500,
    color: 'basic.turquoiseDark'
  }
}
