import palette from './app.pallete'
import { textfieldScrollbar } from '~/styles/app-theme/custom-scrollbar'

export const textField = {
  styleOverrides: {
    root: {
      ...textfieldScrollbar,
      '& label': {
        '&.Mui-focused': {
          color: palette.primary[900]
        },
        '&.Mui-error': {
          color: palette.error[500]
        },
        color: palette.primary[500]
      },
      '& .MuiOutlinedInput-root': {
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
