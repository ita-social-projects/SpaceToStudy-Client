import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    p: { sm: '40px 36px', md: '40px 72px' }
  },
  input: {
    style: {
      padding: 0
    }
  },
  descriptionLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.Body1, top: -21 }
  },
  divider: {
    color: 'primary.300'
  },
  titleInput: (isDirty: boolean) => ({
    disableUnderline: true,
    style: {
      fontSize: '35px',
      fontWeight: 500,
      marginTop: 0,
      maxHeight: isDirty ? 'unset' : '35px'
    }
  }),
  descriptionInput: (isDirty: boolean) => ({
    disableUnderline: true,
    style: {
      fontSize: '16px',
      padding: '0',
      marginTop: 0,
      maxHeight: isDirty ? 'unset' : '16px'
    }
  }),
  titleLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.H4, top: -23 }
  },
  buttons: {
    alignSelf: { xs: 'center', sm: 'end' },
    display: 'flex',
    gap: { xs: '24px', sm: '30px' },
    justifyContent: 'space-between'
  },
  attachmentList: {
    container: {
      background: palette.basic.grey,
      borderRadius: '5px',
      p: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  addIcon: { width: { xs: '18px', sm: '22px' }, ml: '5px' },
  addAttachments: {
    width: 'fit-content'
  },
  button: { width: '250px' },
  newAttachmentIcon: {
    fontSize: '25px',
    marginLeft: '13px',
    fontWeight: '400'
  },
  addAttachmentBtn: { width: 'fit-content' },
  addAttachmentIcon: { ml: '5px', width: { xs: '18px', sm: '22px' } }
}
