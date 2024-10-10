import reducer, {
  connectSocket,
  disconnectSocket,
  setUsersOnline
} from '~/redux/features/socketSlice'

const initialState = {
  isConnected: false,
  usersOnline: []
}

const createState = (overrides) => ({
  ...initialState,
  ...overrides
})

describe('socketSlice test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set isConnected to true', () => {
    const expectedState = createState({ isConnected: true })

    expect(reducer(initialState, connectSocket())).toEqual(expectedState)
  })

  it('should return the initial state on disconnect', () => {
    const previousState = createState({
      isConnected: true,
      usersOnline: ['user1', 'user2']
    })

    expect(reducer(previousState, disconnectSocket())).toEqual(initialState)
  })

  it('should set usersOnline correctly', () => {
    const previousState = createState({
      isConnected: true,
      usersOnline: []
    })
    const expectedState = createState({
      isConnected: true,
      usersOnline: ['user1', 'user2']
    })

    expect(reducer(previousState, setUsersOnline(['user1', 'user2']))).toEqual(
      expectedState
    )
  })
})
