export const styles = {
  container: {
    minHeight: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  autocomplete: {
    width: '100%',
    maxWidth: { md: '180px', lg: '220px' },
    mr: { sm: '20px', lg: '30px' },
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    }
  },
  searchToolbar: {
    borderRadius: '70px'
  }
}
