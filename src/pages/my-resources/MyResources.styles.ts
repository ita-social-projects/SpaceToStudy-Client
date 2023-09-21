import { TypographyVariantEnum } from '~/types'

export const styles = {
  title: {
    typography: TypographyVariantEnum.H4,
    mb: '40px'
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid',
    borderColor: 'primary.100',
    mb: '24px',
    '& > button:last-child': {
      borderLeft: '1px solid',
      borderColor: 'primary.100'
    }
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '& > svg': {
      width: '16px',
      height: '16px'
    }
  }
}
