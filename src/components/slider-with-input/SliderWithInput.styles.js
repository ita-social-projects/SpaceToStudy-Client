export const styles = {
  root: { width: '100%' },
  title: {
    color: 'primary.500',
    typography: 'body2'
  },
  slider: {
    display: 'block',
    width: '100%',
    p: '20px 30px',
    border: '1px solid',
    borderColor: 'primary.200',
    borderRadius: '5px',
    boxSizing: 'border-box',
    my: '8px',

    '& .MuiSlider-rail': {
      background: 'primary.100',
      opacity: 1,
      height: '1px',
      borderRadius: '7px',
      overflow: 'hidden'
    },
    '& .MuiSlider-mark': {
      height: '10px',
      width: '10px',
      borderRadius: '50%',
      backgroundColor: 'primary.100',
      transform: 'translate(-50%, -50%)'
    },
    '& .MuiSlider-track': {
      height: '7px',
      borderRadius: '7px',
      overflow: 'hidden'
    },
    '& .MuiSlider-thumb': {
      height: '10px',
      width: '10px',
      background: 'primary.700'
    }
  },
  totalPrice: {
    display: 'flex',
    flexDirection: 'column',
    p: '20px',
    border: '1px solid',
    borderColor: 'primary.200',
    borderRadius: '5px'
  },
  currencyIcon: { width: '10px' }
}
