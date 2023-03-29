const container = {
  display:'flex',
  alignItems:'center'
}

export const styles = {
  container,
  cursorContainer:{ ...container, cursor:'pointer' },
  title:{
    color:'primary.700',
    mr:'7px',
    userSelect:'none'
  },
  icon:{
    color:'primary.700',
    mr:'7px'
  },
  chosenFiltersQty :{
    borderRadius: '50%',
    width: '24px',
    backgroundColor: 'primary.400',
    color:'white',
    p:'2.5px 0',
    textAlign: 'center',
    userSelect:'none'
  }
}
