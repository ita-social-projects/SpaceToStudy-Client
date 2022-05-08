import { Button, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

const style = {
  button: {
    color: '#fff',
    background: blueGrey[900],
    boxShadow: '0px 5px 6px -3px rgba(144, 164, 174, 0.2), 0px 9px 12px 1px rgba(144, 164, 174,' +
      ' 0.14), 0px 3px 16px 2px rgba(144, 164, 174, 0.12)',
    borderRadius: '4px',
    '&:hover': {
      background: blueGrey[900]
    }
  }
}

const PrimaryButton = ({ sx, text }) => {
  const primaryBtnStyle = {
    ...style.button,
    ...sx
  }
  return (
    <Button sx={ primaryBtnStyle } >
      <Typography variant={ 'button' } >
        { text }
      </Typography >
    </Button >
  )
}

export default PrimaryButton
