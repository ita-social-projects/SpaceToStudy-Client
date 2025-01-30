import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sliceNames } from '~/redux/redux.constants'
import { RootState } from '~/redux/store'
import { SnackbarMessage } from '~/types'

import { type AlertColor } from '~/design-system/components/alert/Alert'

interface SnackbarState {
  isOpened: boolean
  severity: AlertColor
  message: SnackbarMessage
  duration: number
  isExtended?: boolean
  route?: string
}

interface SnackbarOpenParams {
  severity: AlertColor
  message: SnackbarMessage
  duration?: number
  isExtended?: boolean
  route?: string
}

type OpenSnackbarAction = PayloadAction<SnackbarOpenParams>

const initialState: SnackbarState = {
  isOpened: false,
  severity: 'info',
  message: '',
  duration: 0,
  isExtended: false,
  route: ''
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
      state.isExtended = action.payload.isExtended ?? false
      state.route = action.payload.route ?? ''
    },
    closeAlert: (state) => {
      state.isOpened = false
    }
  }
})

export const snackbarSelector = (state: RootState) => state.snackbar

export const { openAlert, closeAlert } = snackbarSlice.actions
export default snackbarSlice.reducer
