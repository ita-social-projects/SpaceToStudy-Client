import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    p: { sm: '0' }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    p: '0'
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
  },
  functionalButtons: {
    display: 'flex',
    gap: { xs: '24px', sm: '30px' },
    '& button': {
      gap: '12px',
      width: '100%'
    }
  }
}
