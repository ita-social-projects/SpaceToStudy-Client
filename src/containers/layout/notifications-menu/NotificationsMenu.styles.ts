import { TypographyVariantEnum } from '~/types'

const item = {
  minWidth: '300px',
  pl: 5,
  pr: 2,
  py: 1,
  typography: TypographyVariantEnum.MidTitle
}

export const styles = {
  menuItem: {
    ...item,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    borderBottom: '1px solid',
    borderColor: 'primary.100'
  },
  menuWrapper: {
    typography: TypographyVariantEnum.MidTitle,
    pl: 1,
    maxHeight: '264px',
    minWidth: '340px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    color: 'primary.700',
    textDecoration: 'none'
  },
  empty: {
    ...item,
    py: 2
  },
  closeIcon: {
    color: 'primary.900'
  },
  clearButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
