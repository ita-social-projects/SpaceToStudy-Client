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
    userSelect:'none',
    cursor:'pointer'
  },
  icon:{
    color:'primary.700',
    mr:'7px',
    cursor:'pointer'
  },
  chosenFiltersQty :{
    borderRadius: '50%',
    width: '24px',
    height: '25px',
    backgroundColor: 'primary.400',
    color:'white',
    fontWeight:'500',
    textAlign: 'center',
    fontSize: '14px',
    userSelect:'none'
  }
}
