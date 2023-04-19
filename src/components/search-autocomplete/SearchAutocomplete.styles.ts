import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    width: '100%',
    maxHeight: '48px',
    backgroundColor: 'basic.white',
    borderRadius: '70px',
    display: 'flex',
    alignItems: 'center'
  },
  autocomplete: {
    flex: 1
  },
  listBox: {
    maxHeight: 250
  },
  searchIcon: {
    color: 'primary.700',
    mr: '15px'
  },
  input: {
    bottom: '8px'
  },
  inputLabel: {
    color: palette.primary[300],
    left: '5px',
    top: '8px'
  },
  searchBtn: {
    ml: '25px'
  }
}
