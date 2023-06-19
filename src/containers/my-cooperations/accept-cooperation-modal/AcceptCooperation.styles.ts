import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: { sm: 'column', md: 'row' },
    p: { xs: '30px 16px', sm: '48px 36px' },
    gap: '60px',
    alignItems: 'center'
  },
  form: {
    minWidth: { xs: '280px', sm: '440px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    alignItems: 'start'
  },
  title: {
    typography: { xs: TypographyVariantEnum.H5, sm: TypographyVariantEnum.H4 }
  },
  card: { width: '360px' },
  titleDescription: {
    wrapper: { display: 'flex', alignItems: 'center' },
    title: { typography: TypographyVariantEnum.H6, mr: '20px' },
    description: { lineHeight: 'inherit' }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    width: '100%',
    gap: '36px',
    minHeight: '124px'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px'
  }
}
