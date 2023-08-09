import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    width: '65vw',
    p: '20px'
  },
  title: {
    mb: '32px',
    typography: TypographyVariantEnum.H4
  },
  searchIcon: {
    color: 'primary.700'
  },
  input: {
    maxWidth: '480px',
    border: '1px solid',
    borderColor: 'primary.500',
    borderRadius: '6px'
  },
  tableWrapper: {
    height: '50vh',
    overflow: 'auto',
    my: '16px'
  },
  table: {
    '& td,th': {
      '&:first-of-type': {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        width: '60%'
      },
      '&:last-of-type': {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px'
      },
      '&:nth-of-type(2)': {
        width: '20%'
      }
    }
  },
  buttonsArea: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  addButton: {
    mr: '16px'
  }
}
