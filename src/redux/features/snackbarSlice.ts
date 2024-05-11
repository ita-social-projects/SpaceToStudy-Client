import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material/Alert'
import { sliceNames } from '~/redux/redux.constants'
import { RootState } from '~/redux/store'

interface SnackbarState {
  isOpened: boolean
  severity: AlertColor
  message: string
  duration: number
}

interface SnackbarOpenParams {
  severity: AlertColor
  message: string
  duration?: number
}

type OpenSnackbarAction = PayloadAction<SnackbarOpenParams>

const initialState: SnackbarState = {
  isOpened: false,
  severity: 'info',
  message: '',
  duration: 0
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
    },
    closeAlert: (state) => {
      state.isOpened = false
    }
  }
})

export const snackbarSelector = (state: RootState) => state.snackbar

export const { openAlert, closeAlert } = snackbarSlice.actions
export default snackbarSlice.reducer
