import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: { p: '32px', width: '481px' },
  title: { typography: TypographyVariantEnum.H6 },
  form: { py: '24px' },
  inputTitle: {
    typography: TypographyVariantEnum.Body2,
    my: '3px'
  },
  buttons: { display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  saveBtn: { minWidth: '87px' }
}
