import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material/Alert'
import { sliceNames } from '~/redux/redux.constants'
import { RootState } from '~/redux/store'
import { TOptions } from 'i18next/typescript/options'

interface ExtendedSnackbarMessage {
  text: string
  options: Draft<TOptions>
}

type SnackbarMessage = string | ExtendedSnackbarMessage

interface SnackbarState {
  isOpened: boolean
  severity: AlertColor
  message: SnackbarMessage
  duration: number
  isExtended?: boolean
}

interface SnackbarOpenParams {
  severity: AlertColor
  message: SnackbarMessage
  duration?: number
  isExtended?: boolean
}

type OpenSnackbarAction = PayloadAction<SnackbarOpenParams>

const initialState: SnackbarState = {
  isOpened: false,
  severity: 'info',
  message: '',
  duration: 0,
  isExtended: false
}

const snackbarSlice = createSlice({
  name: sliceNames.snackbar,
  initialState,
  reducers: {
    openAlert: (state, action: OpenSnackbarAction) => {
      state.isOpened = true
      state.severity = action.payload.severity
      state.message = action.payload.message
      state.duration = action.payload.duration || 4000
      state.isExtended = action.payload.isExtended || false
    },
    closeAlert: (state) => {
      state.isOpened = false
    },
    openSnackBar: () => {}
  }
})

export const snackbarSelector = (state: RootState) => state.snackbar

export const { openAlert, closeAlert, openSnackBar } = snackbarSlice.actions
export default snackbarSlice.reducer
