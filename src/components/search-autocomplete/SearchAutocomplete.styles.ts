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
    color: palette.primary[300]
  },
  searchBtn: {
    minWidth: { xs: '44px' },
    p: { xs: '7px 12px', sm: '12px 24px' },
    ml: { xs: '5px', sm: '25px' }
  }
}
