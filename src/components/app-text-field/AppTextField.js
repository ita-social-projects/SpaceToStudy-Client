import { TextField, Tooltip, Typography } from '@mui/material'

import { style } from './app-text-field.styles'

const AppTextField = ({ errorMsg, ...props }) => {
  const helperText = errorMsg ? (
    <Tooltip title={ errorMsg }>
      <Typography variant="caption">
        { errorMsg }
      </Typography>
    </Tooltip>
  ) : (
    ' '
  )

  return (
    <TextField
      FormHelperTextProps={ { sx: style.helperText } }
      error={ Boolean(errorMsg) }
      helperText={ helperText }
      { ...props }
    />
  )
}

export default AppTextField