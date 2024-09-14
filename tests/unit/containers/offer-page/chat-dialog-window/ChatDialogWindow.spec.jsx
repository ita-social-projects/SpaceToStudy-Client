import { screen, waitFor } from '@testing-library/react'
import ChatDialogWindow from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { messagesMock } from '~tests/unit/pages/chat/ChatsMock.spec.constants'

global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn()
}))

const mockRef = { current: { scrollTo: vi.fn(), scrollHeight: 100 } }

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useRef: () => vi.fn().mockReturnValue(mockRef)
  }
})

const chatInfoMock = {
  author: {
    _id: '64944409a3a368915f9663f9',
    firstName: 'Elizabeth',
    lastName: 'Smith'
  },
  authorRole: 'student',
  chatId: '64c299aa147fefbb6e00fe6c'
}

const chatInfoEmptyIdMock = {
  ...chatInfoMock,
  chatId: null
}

const chat = createUrlPath(URLs.chats.get, chatInfoMock.chatId)

describe('ChatDialogWindow Component with ChatId', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(`${chat}${URLs.messages.get}`)
        .reply(200, messagesMock)
      renderWithProviders(<ChatDialogWindow chatInfo={chatInfoMock} />)
    })
  })

  it('should render user profile info', () => {
    const userProfileInfoElement = screen.getByText('Elizabeth Smith')
    expect(userProfileInfoElement).toBeInTheDocument()
  })

  it('should render messages', async () => {
    const message = await screen.findByText(messagesMock.items[0].text)
    expect(message).toBeInTheDocument()
  })
})

describe('ChatDialogWindow Component without ChatId', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<ChatDialogWindow chatInfo={chatInfoEmptyIdMock} />)
    })
  })

  it('should render default message when there is no chatId', () => {
    const userProfileInfoElement = screen.getByText('chatPage.youCanAsk')
    expect(userProfileInfoElement).toBeInTheDocument()
  })
})
