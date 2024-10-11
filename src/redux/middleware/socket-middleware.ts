import { Middleware } from 'redux'
import { Action } from '@reduxjs/toolkit'
import SocketFactory, { SocketInterface } from '~/redux/socket-factory'
import {
  connectSocket,
  disconnectSocket,
  setUsersOnline
} from '~/redux/features/socketSlice'
import { logout, setUser } from '~/redux/reducer'
import { debounce } from '~/utils/debounce'

enum SocketEvent {
  Connect = 'connect',
  ConnectUser = 'connectUser',
  UsersOnline = 'usersOnline'
}

const socketMiddleware: Middleware = (store) => {
  let socket: SocketInterface

  const debouncedSetUsersOnline = debounce((users: string[]) => {
    store.dispatch(setUsersOnline(users))
  }, 1000)

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

    next(action)
  }
}

export default socketMiddleware
