export const styles = {
  linesBox: {
    m: '22px 0',
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
    m: '0 10px'
  },
  underlineText: {
    fontWeight: '500',
    color: 'primary.900',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  underlineTextUa: {
    mt: '6px'
  },
  haveAccount: {
    display: 'flex',
    color: 'primary.700'
  },
  haveAccountUa: {
    flexDirection: 'column'
  },
  googleForm: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '330px'
  }
}
