export const styles = {
  container: {
    minHeight: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  autocomplete: {
    width: '100%',
    maxWidth: { md: '370px' },
    mr: '30px',
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    },
    position: 'relative',
    '& .MuiFormHelperText-root': {
      fontSize: '14px',
      position: 'absolute',
      top: '-33px',
      left: '-14px'
    }
  },
  drowlevel: {
    width: '370px',
    position: 'relative'
  },
  drowstyle: {
    fontSize: '14px',
    position: 'absolute',
    top: '-33px',
    left: '-14px'
  },
  searchToolbar: {
    borderRadius: '70px'
  },
  otherToolbar: {
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'backgroundColor;',
    boxShadow: 'none'
  },
  menuProps: {
    PaperProps: {
      style: {
        maxHeight: '224px',
        width: '250px'
      }
    }
  }
}
