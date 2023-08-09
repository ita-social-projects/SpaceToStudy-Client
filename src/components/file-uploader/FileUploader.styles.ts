import { TypographyVariantEnum } from '~/types'

export const styles = {
  rootDrag: {
    borderColor: 'primary.900',
    backgroundColor: 'basic.grey'
  },
  icon: {
    my: 'auto',
    mr: 1,
    color: 'primary.700'
  },
  filesList: { width: '100%' },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    p: '0 10px'
  },
  fileName: {
    typography: TypographyVariantEnum.Body2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    ml: 1
  },
  close: {
    color: 'primary.700',
    fontSize: '20px'
  },
  fileSize: {
    mt: '10px',
    typography: TypographyVariantEnum.Body2
  },
  error: {
    color: 'error',
    ml: 1,
    typography: TypographyVariantEnum.Caption
  }
}
