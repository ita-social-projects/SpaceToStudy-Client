import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  boldText: {
    fontWeight: 500
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    mb: '8px'
  },
  inputField: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    height: '50px'
  },
  input: {
    flex: 1
  },
  textGray: {
    color: palette.basic.darkGray
  }
}
