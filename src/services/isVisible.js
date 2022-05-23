import { IconButton, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export const toggleInputType = (e, showPass) => {
  const input = e.currentTarget.parentElement.previousSibling
  if (input.type === 'password') {
    input.type = 'text'
    showPass(false)
  } else {
    input.type = 'password'
    showPass(true)
  }
}

export const endAdornment = ( isVisible, setShowPass ) => {
  return {
    endAdornment: (
      <InputAdornment position='end'>
        <IconButton
          aria-label='toggle password visibility'
          onClick={ (e) => toggleInputType(e, setShowPass) }
        >
          { isVisible ? <VisibilityOff /> : <Visibility /> }
        </IconButton>
      </InputAdornment>
    )
  }
}
