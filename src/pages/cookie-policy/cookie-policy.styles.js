export const styles = {
  container: {
    color: '#263238'
  },
  sectionTitle: {
    '&:first-of-type': {
      background: '#ECEFF1',
      m: '30px 0 70px 0',
      py: '25px',
      borderRadius: '20px'
    }
  },
  itemsContainer: {
    m: '50px auto',
    maxWidth: '744px'
  },
  wrapper: {
    maxWidth: '1128px',
    m: '0 auto',
    mb: '32px',
    textAlign: 'left'
  },
  title: {
    mb: '30px'
  },
  textWithDot: {
    m: '20px 0 15px 0',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '""',
      background: '#607D8B',
      minWidth: '8px',
      height: '8px',
      borderRadius: '50%',
      mr: '20px'
    }
  }
}
