import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: (currentUser: boolean, isPrivate: boolean) => ({
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    p: '20px',
    mt: '24px',
    borderRadius: '2px 2px 6px 6px',
    borderTop: `4px solid ${
      isPrivate ? palette.basic.blueGray : palette.basic.turquoise
    }`,
    background: currentUser
      ? isPrivate
        ? palette.basic.grey
        : palette.basic.white
      : palette.basic.turquoiseLight,
    '&:hover': {
      boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.56)'
    }
  }),
  descriptionInput: {
    style: {
      marginTop: 0
    },
    disableUnderline: true
  },
  descriptionLabel: {
    sx: { typography: TypographyVariantEnum.Body1, top: -14 },
    shrink: false
  },
  input: {
    style: { padding: 0, margin: 0 }
  },
  textfield: {
    pointerEvents: 'none',
    '& .css-mz8ttg-MuiFormHelperText-root': {
      display: 'none'
    }
  },
  header: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lockIcon: {
    color: 'primary.300'
  },
  menuBlock: {
    alignSelf: 'flex-end'
  },
  date: {
    color: 'primary.400'
  }
}
