export const style = {
  linesBox: {
    margin: '23px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:after, &:before': {
      content: '""',
      width: '100%',
      height: '2px',
      backgroundColor: 'primary.100'
    }
  },
  continue: {
    whiteSpace: 'nowrap',
    margin: '0 10px'
  },
  google: {
    marginBottom: '16px',
    width: '100%',
    padding: { xs: '15px 63.5px', sm: '15px 78px' }
  },
  underlineText: {
    fontWeight: '500',
    color: 'primary.900',
    textDecoration: 'underline'
  },
  haveAccount: {
    display: 'flex',
    color: 'primary.700'
  }
}
