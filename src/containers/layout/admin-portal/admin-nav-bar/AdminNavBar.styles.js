export const styles = {
  navBar: {
    boxSizing: 'border-box',
    width: '90px',
    backgroundColor: 'primary.50',
    paddingTop: 5,
    transition: '.5s',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  expanded: {
    width: '250px'
  },
  divider: {
    width: '80%',
    margin: '0 auto'
  },
  listItem: {
    marginBottom: 2,
    flexGrow: 0
  },
  openButton: {
    justifyContent: 'flex-end',
    '& > div': {
      justifyContent: 'center'
    }
  }
}
