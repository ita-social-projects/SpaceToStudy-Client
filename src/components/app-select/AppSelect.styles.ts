export const styles = {
  selectField: {
    minWidth:'115px',
    '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':{
      borderColor:'primary.200'
    },
    '.MuiSelect-icon': {
      color: 'primary.500'
    },
    '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.500'
    }
  },
  selectContainer:{
    display:'flex',
    alignItems:'center'
  },
  selectTitle:{ color:'primary.500', mr:'8px' }
}
