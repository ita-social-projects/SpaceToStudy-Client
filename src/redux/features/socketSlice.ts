import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sliceNames } from '~/redux/redux.constants'

interface SocketState {
  isConnected: boolean
  usersOnline: string[]
}

const initialState: SocketState = {
  isConnected: false,
  usersOnline: []
}

const socketSlice = createSlice({
  name: sliceNames.socket,
  initialState,
  reducers: {
    connectSocket: (state) => {
      state.isConnected = true
    },
    disconnectSocket: () => {
      return initialState
    },
    setUsersOnline: (state, action: PayloadAction<string[]>) => {
      state.usersOnline = action.payload
    }
  }
})

const { actions, reducer } = socketSlice

export const { connectSocket, disconnectSocket, setUsersOnline } = actions

export default reducer
