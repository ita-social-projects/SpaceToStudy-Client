import socketMiddleware from '~/redux/middleware/socket-middleware'
import { connectSocket, setUsersOnline } from '~/redux/features/socketSlice'
import SocketFactory from '~/redux/socket-factory'
import { setUser } from '~/redux/reducer'

vi.mock('~/redux/socket-factory')
const mockAccessToken = 'accessToken'

describe('socketMiddleware', () => {
  let store
  let next
  let mockSocket

  beforeEach(() => {
    next = vi.fn()
    store = {
      dispatch: vi.fn()
    }
    mockSocket = {
      socket: {
        connect: vi.fn(),
        disconnect: vi.fn(),
        on: vi.fn(),
        emit: vi.fn()
      }
    }

    SocketFactory.create.mockReturnValue(mockSocket)
  })

  it('should connect socket and set up events on setUser', () => {
    socketMiddleware(store)(next)(setUser(mockAccessToken))

    expect(SocketFactory.create).toHaveBeenCalled()
    expect(mockSocket.socket.connect).not.toHaveBeenCalled()
    expect(mockSocket.socket.on).toHaveBeenCalledWith(
      'connect',
      expect.any(Function)
    )

    const connectCallback = mockSocket.socket.on.mock.calls.find(
      (call) => call[0] === 'connect'
    )[1]
    connectCallback()

    expect(mockSocket.socket.emit).toHaveBeenCalledWith('connectUser')
    expect(store.dispatch).toHaveBeenCalledWith(connectSocket())
  })

  it('should dispatch setUsersOnline on receiving usersOnline event', () => {
    socketMiddleware(store)(next)(setUser(mockAccessToken))

    const users = ['user1', 'user2']
    const usersOnlineCallback = mockSocket.socket.on.mock.calls.find(
      (call) => call[0] === 'usersOnline'
    )[1]
    usersOnlineCallback(users)

    expect(store.dispatch).toHaveBeenCalledWith(setUsersOnline(users))
  })

  it('should pass action to next middleware', () => {
    socketMiddleware(store)(next)(setUser(mockAccessToken))

    expect(next).toHaveBeenCalledWith(setUser(mockAccessToken))
  })
})
