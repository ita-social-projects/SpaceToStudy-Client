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
  addAttachmentBtn: { width: 'fit-content' },
  addAttachmentIcon: { ml: '5px', width: { xs: '18px', sm: '22px' } },
  titleInput: {
    disableUnderline: true,
    style: {
      fontSize: '35px',
      fontWeight: 500,
      maxHeight: '35px',
      marginTop: 0
    }
  },
  descriptionInput: {
    disableUnderline: true,
    style: { fontSize: '16px', maxHeight: '16px', marginTop: 0 }
  },
  titleLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.H4, top: -23 }
  },
  buttons: {
    alignSelf: { xs: 'center', sm: 'end' },
    display: 'flex',
    gap: { xs: '24px', sm: '30px' },
    justifyContent: 'space-between'
  }
}
