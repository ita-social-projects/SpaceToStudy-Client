import io, { Socket } from 'socket.io-client'

export const socketService = {
  connectUser: () => {
    const socket = io('https://s2s-back-stage.azurewebsites.net/', {
      withCredentials: true
    })
    socket.emit('connectUser')
    return socket
  },

  disconnectUser: (socket: Socket) => {
    socket.disconnect()
  }
}
