import palette from '~/styles/app-theme/app.pallete'
import { VisibilityEnum } from '~/types'

const inputFontSize = {
  fontSize: '35px',
  fontWeight: 500,
  maxHeight: '35px',
  marginTop: 0
}

export const styles = {
  addButton: {
    justifyContent: 'flex-start',
    pl: '10px',
    gap: '5px'
  },
  divider: {
    my: '5px'
  },
  input: {
    style: { padding: 0 }
  },
  titleInput: {
    disableUnderline: true,
    style: { ...inputFontSize }
  },
  titleLabel: (value: string) => ({
    shrink: false,
    style: {
      visibility: value ? VisibilityEnum.Hidden : VisibilityEnum.Visible,
      color: palette.primary[300],
      top: -23,
      ...inputFontSize
    }
  }),
  labelCategory: {
    color: 'primary.600',
    maxWidth: '464px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  mainDivider: {
    borderColor: 'primary.200',
    m: '32px 0 24px'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '32px',
    mt: '32px'
  }
}
