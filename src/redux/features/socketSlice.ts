import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sliceNames } from '~/redux/redux.constants'

interface SocketState {
  isConnected: boolean
  usersOnline: string[]
  isTypingChats: string[]
}

const initialState: SocketState = {
  isConnected: false,
  usersOnline: [],
  isTypingChats: []
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
    },
    addIsTyping: (state, action: PayloadAction<string>) => {
      if (!state.isTypingChats.includes(action.payload)) {
        state.isTypingChats.push(action.payload)
      }
    },
    removeIsTyping: (state, action: PayloadAction<string>) => {
      state.isTypingChats = state.isTypingChats.filter(
        (chatId) => chatId !== action.payload
      )
    },
    joinChat: () => {},
    leaveChat: () => {},
    sendTyping: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{ chatId: string; receiverId: string }>
    ) => {}
  }
})

const { actions, reducer } = socketSlice

export const {
  connectSocket,
  disconnectSocket,
  setUsersOnline,
  addIsTyping,
  removeIsTyping,
  joinChat,
  leaveChat,
  sendTyping
} = actions

export default reducer
