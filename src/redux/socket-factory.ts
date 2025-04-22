import { io, Socket } from 'socket.io-client'

export interface SocketInterface {
  socket: Socket
}

const url = import.meta.env.VITE_SOCKET_URL as string | undefined

class SocketConnection implements SocketInterface {
  public socket: Socket

  constructor() {
    this.socket = io(url, {
      withCredentials: true,
      transports: ['websocket']
    })
  }
}

let socketConnection: SocketConnection | undefined

class SocketFactory {
  public static create(): SocketConnection {
    if (!socketConnection) {
      socketConnection = new SocketConnection()
    }
    return socketConnection
  }
}

export default SocketFactory
