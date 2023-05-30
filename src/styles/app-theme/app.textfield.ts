import palette from './app.pallete'
import { textfieldScrollbar } from '~/styles/app-theme/custom-scrollbar'

export const textField = {
  styleOverrides: {
    root: {
      ...textfieldScrollbar,
      '& label': {
        lineHeight: 'inherit',
        '&.Mui-focused': {
          color: palette.primary[900]
        },
        '&.Mui-error': {
          color: palette.error[500]
        },
        color: palette.primary[500]
      },
      '& .MuiAutocomplete-inputRoot.MuiOutlinedInput-root ': {
        padding: '5px'
      },
      '& .MuiInputBase-input': {
        padding: '12.5px 14px',
        '&.MuiInputBase-inputMultiline': {
          padding: 0
        },
        '& fieldset': {
          borderColor: palette.primary[500]
        },
        '&.Mui-focused ': {
          '&.Mui-error fieldset': {
            borderColor: palette.error[500]
          },
          '& fieldset': {
            borderColor: palette.primary[900]
          }
        }
      },
      '& .MuiInput-root:before ': {
        borderColor: palette.primary[500]
      }
    }
  }
}
