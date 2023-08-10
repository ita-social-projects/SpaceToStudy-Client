export const styles = {
  root: {
    width: '65vw',
    padding: '20px'
  },
  title: {
    mb: '32px',
    fontSize: '32px',
    lineHeight: '48px'
  },
  searchIcon: {
    color: 'primary.700'
  },
  input: {
    maxWidth: '400px',
    border: '1px solid',
    borderColor: 'primary.500',
    borderRadius: '6px'
  },
  tableWrapper: {
    height: '50vh',
    overflow: 'auto',
    my: '16px'
  },
  table: {
    '& td,th': {
      '&:first-of-type': {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        width: '60%'
      },
      '&:last-of-type': {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px'
      },
      '&:nth-of-type(2)': {
        width: { md: '40%', lg: '20%' }
      }
    }
  },
  buttonsArea: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  addBtn: {
    mr: '16px'
  }
}
