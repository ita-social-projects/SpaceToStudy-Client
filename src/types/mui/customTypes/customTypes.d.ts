import { TextFieldProps } from '@mui/material/TextField'

declare module '@mui/x-date-pickers/DesktopDatePicker' {
  interface DesktopDatePickerProps {
    inputProps?: TextFieldProps['inputProps']
  }
}
