export const defaultStyles = {
  stack: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: '16px'
  },
  colorActive: {
    color: 'primary.500'
  },
  switch: {
    width: '50px',
    height: '24px',
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: '4px',
      '&.Mui-checked': {
        transform: 'translateX(26px)',
        color: 'basic.white',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: 'basic.white'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      width: '16px',
      height: '16px',
      backgroundColor: 'primary.900'
    },
    '& .MuiSwitch-track': {
      borderRadius: '28px',
      opacity: 1,
      border: '2px solid',
      borderColor: 'primary.100',
      backgroundColor: 'basic.white',
      boxSizing: 'border-box'
    }
  }
}
