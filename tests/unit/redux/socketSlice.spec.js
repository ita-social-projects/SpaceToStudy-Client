import reducer, {
  connectSocket,
  disconnectSocket,
  setUsersOnline,
  addIsTyping,
  removeIsTyping,
  sendTyping
} from '~/redux/features/socketSlice'

const initialState = {
  isConnected: false,
  usersOnline: [],
  isTypingChats: []
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

  it('should add new chatId to isTypingChats', () => {
    const expectedState = createState({
      isTypingChats: ['chat1']
    })

    expect(reducer(undefined, addIsTyping('chat1'))).toEqual(expectedState)
  })

  it('should not add new chatId to isTypingChats', () => {
    const previousState = createState({
      isTypingChats: ['chat1']
    })

    expect(reducer(previousState, addIsTyping('chat1'))).toEqual(previousState)
  })

  it('should remove chatId from isTypingChats', () => {
    const previousState = createState({
      isTypingChats: ['chat1']
    })
    const expectedState = createState({
      isTypingChats: []
    })

    expect(reducer(previousState, removeIsTyping('chat1'))).toEqual(
      expectedState
    )
  })

  it('should send correct payload in sendTyping', () => {
    expect(
      reducer(
        initialState,
        sendTyping({
          chatId: 'chat1',
          receiverId: 'receiver1'
        })
      )
    ).toEqual(initialState)
  })
})
