export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    m: '50px 52px 0 28px'
  },
  tablePagination: {
    '& p': {
      typography: 'subtitle2',
      color: 'basic.black'
    },
    '& .MuiTablePagination-select': {
      color: 'basic.black',
      fontSize: '16px',
      minHeight: '0',
      '& ~ svg': {
        color: 'black'
      }
    },
    '& .MuiTablePagination-displayedRows': {
      ml: '120px'
    },
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: 'primary.900',
      color: 'primary.50',
      '&:hover': {
        backgroundColor: 'primary.900',
        color: 'primary.50'
      }
    }
  },
  pageInputBox: {
    display: 'flex',
    alignItems: 'center',
    width: '230px',
    justifyContent: 'space-between'
  },
  pageInput: {
    width: '60px',
    '& .MuiOutlinedInput-root fieldset': {
      borderColor: 'primary.100'
    },
    '& input[type=number]': {
      MozAppearance: 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
      {
        WebkitAppearance: 'none',
        margin: 0
      }
  },
  btn: {
    borderColor: 'primary.100',
    typography: 'body2',
    color: 'basic.black'
  }
}
