import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { TextFieldProps } from '@mui/material/TextField'

import AppTextField from '~/components/app-text-field/AppTextField'

import { styles } from '~/components/app-text-area/AppTextArea.styles'

interface AppTextAreaProps extends Omit<TextFieldProps, 'error'|'helperText'> {
    maxLength?: number
    errorMsg?:string
    value: string
}

const AppTextArea:FC<AppTextAreaProps> = ({ minRows = 4, maxRows = 4, maxLength = 1000, value, ...props }) => {
  return (
    <Box sx={ styles.root }>
      <AppTextField
        inputProps={ { maxLength } }
        maxRows={ minRows }
        minRows={ maxRows }
        multiline
        value={ value }
        { ...props }
      />
      { maxLength  &&  (
        <Typography
          color={ value.length === maxLength ? 'error' : 'text' }
          sx={ styles.textLength }
          variant='caption'
        >
          { `${value.length}/${maxLength}` }
        </Typography>
      ) }
    </Box>
  )
}

export default AppTextArea
