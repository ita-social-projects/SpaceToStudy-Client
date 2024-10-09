import { io, Socket } from 'socket.io-client'

export interface SocketInterface {
  socket: Socket
}

class SocketConnection implements SocketInterface {
  public socket: Socket

  constructor() {
    this.socket = io({ withCredentials: true })
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
