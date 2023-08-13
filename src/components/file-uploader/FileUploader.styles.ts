import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    border: '1px solid',
    borderColor: 'primary.200',
    borderRadius: '5px',
    maxWidth: '270px',
    overflow: 'auto'
  },
  rootDrag: {
    borderColor: 'primary.900',
    backgroundColor: 'basic.grey'
  },
  icon: {
    my: 'auto',
    mr: 1,
    color: 'primary.700'
  },
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
  uploadBtn: {
    textAlign: 'center'
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
