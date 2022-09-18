export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: '100px',
    border: 'dashed',
    borderColor: 'primary.200',
    borderRadius: '4px',
    overflow: 'auto'
  },
  rootDrag: {
    borderColor: 'primary.900',
    backgroundColor: 'basic.grey'
  },
  icon: {
    my: 'auto',
    mr: 1,
    color: 'primary.700'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    p: 0
  },
  fileName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    ml: 1
  },
  close: {
    color: 'primary.700',
    fontSize: '20px'
  },
  uploadBtn: {
    textAlign: 'center'
  }
}
