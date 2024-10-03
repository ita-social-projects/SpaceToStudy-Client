import io, { Socket } from 'socket.io-client'

export const socketService = {
  connectUser: (setUsersOnline: (usersOnline: Set<string>) => void) => {
    const socket = io({
      withCredentials: true
    })
    socket.emit('connectUser')
    socket.on('usersOnline', (users: string[]) =>
      setUsersOnline(new Set(users))
    )
    return socket
  },

  disconnectUser: (socket: Socket) => {
    socket.disconnect()
  }
}
