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
  searchIcon: {
    color: 'primary.700',
    mr: '15px'
  },
  input: {
    bottom: '8px',
    flex: 1
  },
  inputLabel: {
    color: palette.primary[300],
    left: '5px'
  },
  searchBtn: {
    ml: '25px'
  }
}
