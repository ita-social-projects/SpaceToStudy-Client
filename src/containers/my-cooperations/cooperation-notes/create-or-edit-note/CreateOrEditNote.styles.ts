import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    p: '20px',
    mt: '24px',
    borderRadius: '2px 2px 6px 6px',
    borderTop: `4px solid ${palette.basic.turquoise}`,
    background: `${palette.basic.white}`,
    '&:hover': {
      boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.56)'
    }
  },
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
  settingsContainer: {
    mt: '0',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'primary.600'
  },
  noteBtn: {
    ml: '8px'
  },
  textfield: {
    '& .css-mz8ttg-MuiFormHelperText-root': {
      display: 'none'
    }
  },
  header: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  lockIcon: {
    mr: '4px'
  }
}
