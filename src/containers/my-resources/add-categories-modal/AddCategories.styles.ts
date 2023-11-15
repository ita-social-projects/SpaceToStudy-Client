import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: { p: '32px', width: '481px' },
  title: { typography: TypographyVariantEnum.H6 },
  form: { pt: '24px' },
  textField: {
    '.MuiInputLabel-asterisk': {
      display: 'none'
    }
  },
  buttons: { display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  saveBtn: { minWidth: '103px' }
}
