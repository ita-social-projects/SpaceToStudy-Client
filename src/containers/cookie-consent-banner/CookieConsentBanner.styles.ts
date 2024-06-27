import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    borderRadius: { xl: '4px', xs: '0px' },
    position: 'fixed',
    maxWidth: { xl: '1350px', xs: '100%' },
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
    padding: '25px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: { sm: 'row', xs: 'column' },
    gap: { sm: '45px', xs: '20px' },
    backgroundColor: 'primary.900'
  },
  notice: {
    typography: TypographyVariantEnum.Body1,
    fontWeight: '300',
    color: 'basic.grey'
  },
  link: {
    textDecoration: 'underline',
    fontWeight: '500',
    color: 'basic.grey'
  },
  button: {
    minWidth: '210px',
    color: 'primary.900',
    '&:hover': {
      backgroundColor: 'basic.gray'
    }
  }
}
