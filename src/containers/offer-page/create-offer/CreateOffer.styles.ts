const column={
  display: 'flex',
  flexDirection: 'column'
}

export const styles = {
  root: { 
    maxWidth:{ xs:'250px', sm:'450px', md:'650px' },
    px:{ sm:'16px', md:'32px' },
    color: 'primary.700',
    gap:'12px',
    boxSizing:'border-box',
    ...column
  },
  specialization:{
    ...column,
    pl: { sm: '32px' },
    gap:'10px'
  },
  inputBlock:{
    ...column,
    gap:'12px'
  },
  title : { 
    display:'flex',
    alignItems:'center',
    mb: '14px',
    gap:'10px',
    typography: { xs:'midTitle', sm:'h5' },
    pt: { xs: '5px', sm: 0 },
    width:'100%' ,
    whiteSpace: 'nowrap'
  },
  icon: { 
    width:{ xs:'16px', sm: '20px' } 
  },
  description: { 
    typography: { xs:'body2', sm:'body1' } 
  },
  currencyIcon: { width:'10px' },
  buttonBox: { 
    display: 'flex',
    flexDirection:{ xs:'column', sm: 'row' },
    gap: '30px' ,
    mt:'20px'
  },
  category:{
    mb: '12px'
  },
  inputs:{
    mb: '6px'
  } ,
  specializationWrap:{
    mt:'20px'
  }
}
