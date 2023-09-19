import { TypographyVariantEnum, VisibilityEnum } from '~/types'

export const styles = {
  container: {
    p: { sm: '0' }
  },
  root: {
    display: 'flex',
    gap: '24px',
    flexDirection: 'column',
    p: '0'
  },
  input: {
    style: {
      padding: 0,
      margin: 0
    }
  },
  titleInput: {
    disableUnderline: true,
    style: {
      fontSize: '35px',
      maxHeight: '35px',
      fontWeight: 500,
      marginTop: 0
    }
  },
  descriptionInput: {
    style: { fontSize: '16px', maxHeight: '16px', marginTop: 0 },
    disableUnderline: true
  },
  titleLabel: (title: string) => ({
    style: {
      visibility: title ? VisibilityEnum.Hidden : VisibilityEnum.Visible
    },
    shrink: false,
    sx: { typography: TypographyVariantEnum.H4, top: -23 }
  }),
  descriptionLabel: (description: string) => ({
    style: {
      visibility: description ? VisibilityEnum.Hidden : VisibilityEnum.Visible
    },
    sx: { typography: TypographyVariantEnum.Body1, top: -20 },
    shrink: false
  }),
  divider: {
    color: 'primary.300'
  },
  buttons: {
    display: 'flex',
    gap: { xs: '24px', sm: '30px' },
    justifyContent: 'space-between',
    alignSelf: { xs: 'center', sm: 'end' }
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
