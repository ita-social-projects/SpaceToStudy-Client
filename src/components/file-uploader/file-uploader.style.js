export const style = {
  root: { 
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    mt: 5,
    maxWidth: '360px',
    minHeight: '150px',
    border: 'dashed',
    borderColor: 'primary.200',
    borderRadius: '4px'
  },
  rootDrag: { 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    mt: 5,
    minHeight: '150px',
    border: 'dashed',
    backgroundColor: 'primary.50',
    borderRadius: '4px'
  },
  icon: {
    m: 'auto',
    mr: 1,
    color: 'primary.700'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    p: 0
  },
  close: {
    color: 'primary.700',
    fontSize: '20px',
  }
}
