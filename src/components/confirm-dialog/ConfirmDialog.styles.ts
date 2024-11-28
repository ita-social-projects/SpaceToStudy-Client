import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    minWidth: { xs: '280px', sm: '400px' },
    maxWidth: '600px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    px: '16px'
  },
  icon: {
    color: 'primary.600',
    p: 0,
    mt: '20px',
    alignSelf: 'start'
  },
  title: {
    color: 'primary.700',
    typography: TypographyVariantEnum.H5,
    p: '20px 15px 15px 14px'
  },
  content: {
    color: 'primary.600',
    p: '0 30px',
    whiteSpace: 'pre-line'
  },
  typographyContent: {
    typography: TypographyVariantEnum.Body1
  },
  actions: (revertButtons: boolean) => ({
    p: '24px 30px',
    flexDirection: revertButtons ? 'row-reverse' : 'row',
    justifyContent: revertButtons ? 'flex-start' : 'flex-end',
    '& > :last-child': {
      m: revertButtons ? '0 8px 0 0' : '0 0 0 8px'
    }
  })
}
