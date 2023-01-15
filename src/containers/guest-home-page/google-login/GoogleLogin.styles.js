export const styles = {
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
  underlineText: {
    fontWeight: '500',
    color: 'primary.900',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  haveAccount: {
    display: 'flex',
    color: 'primary.700'
  }
}
