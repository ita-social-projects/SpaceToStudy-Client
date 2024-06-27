import { TypographyVariantEnum } from '~/types'

export const styles = {
  selectField: {
    height: '46px',
    minWidth: '115px'
  },
  selectContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.200'
    }
  },
  selectTitle: {
    typography: TypographyVariantEnum.Body1,
    color: 'primary.500',
    mr: '8px',
    minWidth: 'fit-content'
  },
  formControl: {
    '& label': {
      lineHeight: 'inherit',
      color: 'primary.500'
    }
  }
}
