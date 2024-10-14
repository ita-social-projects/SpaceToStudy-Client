import { Middleware } from 'redux'
import { Action } from '@reduxjs/toolkit'
import SocketFactory, { SocketInterface } from '~/redux/socket-factory'
import {
  addIsTyping,
  connectSocket,
  disconnectSocket,
  joinChat,
  leaveChat,
  removeIsTyping,
  sendTyping,
  setUsersOnline
} from '~/redux/features/socketSlice'
import { logout, setUser } from '~/redux/reducer'
import { debounce } from '~/utils/debounce'

enum SocketEvent {
  Connect = 'connect',
  ConnectUser = 'connectUser',
  UsersOnline = 'usersOnline',
  TypingStatus = 'typingStatus',
  SendTypingStatus = 'sendTypingStatus'
}

const socketMiddleware: Middleware = (store) => {
  let socket: SocketInterface
  const typingTimers: Map<string, NodeJS.Timeout> = new Map()

  const debouncedSetUsersOnline = debounce((users: string[]) => {
    store.dispatch(setUsersOnline(users))
  }, 1000)

  const typingStatusListener = (chatId: string) => {
    store.dispatch(addIsTyping(chatId))

    if (typingTimers.has(chatId)) {
      clearTimeout(typingTimers.get(chatId))
    }

    const timeoutId = setTimeout(() => {
      store.dispatch(removeIsTyping(chatId))
      typingTimers.delete(chatId)
    }, 1000)

    typingTimers.set(chatId, timeoutId)
  }

  return (next) => (action: Action) => {
    if (setUser.match(action)) {
      if (socket) {
        socket.socket.connect()
      } else {
        socket = SocketFactory.create()

        socket.socket.on(SocketEvent.Connect, () => {
          socket.socket.emit(SocketEvent.ConnectUser)
          store.dispatch(connectSocket())
        })

        socket.socket.on(SocketEvent.UsersOnline, (users: string[]) => {
          debouncedSetUsersOnline(users)
        })
      }
    }

    if (logout.match(action)) {
      if (socket) {
        socket.socket.disconnect()
        store.dispatch(disconnectSocket())
      }
    }

    if (joinChat.match(action)) {
      socket.socket.on(SocketEvent.TypingStatus, typingStatusListener)
    }

    if (leaveChat.match(action)) {
      socket.socket.off(SocketEvent.TypingStatus, typingStatusListener)
    }

    if (sendTyping.match(action)) {
      socket.socket.emit(SocketEvent.SendTypingStatus, action.payload)
    }

    next(action)
  }
}

export default socketMiddleware
