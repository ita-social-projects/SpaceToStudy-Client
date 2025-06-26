import { configureStore } from '@reduxjs/toolkit'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { vi } from 'vitest'
import ChatMenu from '~/containers/layout/chat-menu/ChatMenu'
import reducer from '~/redux/reducer'
import useConfirm from '~/hooks/use-confirm'
import { chatService } from '~/services/chat-service'
import { I18nextProvider } from 'react-i18next'

vi.mock('~/hooks/use-confirm', () => ({
  default: vi.fn(() => ({ openDialog: vi.fn() }))
}))

vi.mock('~/services/chat-service', () => ({
  chatService: {
    deleteChat: vi.fn(),
    markChatAsDeleted: vi.fn()
  }
}))

vi.mock('~/services/message-service', () => ({
  messageService: {
    clearChatHistory: vi.fn(),
    deleteMessagesFromChat: vi.fn()
  }
}))

vi.mock('react-i18next', () => ({
  I18nextProvider: ({ children }) => <div>{children}</div>,
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: vi.fn() }
  })
}))

const renderChatMenuWithStore = (preloadedState, messagesLength = 5) => {
  const store = configureStore({
    reducer: { appMain: reducer },
    preloadedState
  })

  render(
    <Provider store={store}>
      <I18nextProvider>
        <ChatMenu
          anchorEl={document.createElement('div')}
          currentChat={{ _id: 'chatId', deletedFor: [] }}
          messagesLength={messagesLength}
          onClose={vi.fn()}
          setIsHistoryCleared={vi.fn()}
          updateChats={vi.fn(() => Promise.resolve())}
          updateMessages={vi.fn(() => Promise.resolve())}
        />
      </I18nextProvider>
    </Provider>
  )
}

describe('ChatMenu Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders menu items correctly', () => {
    renderChatMenuWithStore({ appMain: {} })

    expect(
      screen.getByText('chatPage.chatMenu.clearHistory')
    ).toBeInTheDocument()
    expect(screen.getByText('chatPage.chatMenu.deleteChat')).toBeInTheDocument()
  })

  it('calls openDialog when Clear History is clicked', () => {
    renderChatMenuWithStore({ appMain: {} })

    const clearHistoryButton = screen.getByText(
      'chatPage.chatMenu.clearHistory'
    )
    fireEvent.click(clearHistoryButton)

    expect(
      vi.mocked(useConfirm).mock.results[0].value.openDialog
    ).toHaveBeenCalledWith({
      message: 'chatPage.chatMenu.clearHistoryWarning',
      sendConfirm: expect.any(Function),
      title: 'chatPage.chatMenu.clearHistoryTitle'
    })
  })

  it('marks chat as deleted and updates state on soft deletion', async () => {
    renderChatMenuWithStore({ appMain: {} })

    const deleteChatButton = screen.getByText('chatPage.chatMenu.deleteChat')
    fireEvent.click(deleteChatButton)

    const sendConfirm =
      vi.mocked(useConfirm).mock.results[0].value.openDialog.mock.calls[0][0]
        .sendConfirm
    await sendConfirm(true)

    expect(chatService.markChatAsDeleted).toHaveBeenCalledWith('chatId')
  })

  it('closes the menu when Close button is clicked', () => {
    const closeMenuMock = vi.fn()
    const setIsHistoryClearedMock = vi.fn()
    const messagesLength = 5
    const currentChat = { _id: '123', deletedFor: [] }
    const updateChatsMock = vi.fn()
    const updateMessagesMock = vi.fn()

    const store = configureStore({ reducer: { appMain: reducer } })

    render(
      <Provider store={store}>
        <I18nextProvider>
          <ChatMenu
            anchorEl={document.body}
            currentChat={currentChat}
            messagesLength={messagesLength}
            onClose={closeMenuMock}
            setIsHistoryCleared={setIsHistoryClearedMock}
            updateChats={updateChatsMock}
            updateMessages={updateMessagesMock}
          />
        </I18nextProvider>
      </Provider>
    )
    const clearHistoryButton = screen.getByText(
      /chatPage.chatMenu.clearHistory/i
    )
    fireEvent.click(clearHistoryButton)
    expect(closeMenuMock).toHaveBeenCalled()
    expect(setIsHistoryClearedMock).toHaveBeenCalledWith(messagesLength === 0)
  })

  it('calls openDialog with correct parameters when deleting a chat (soft delete)', () => {
    renderChatMenuWithStore({ appMain: {} }, 5)

    const deleteChatButton = screen.getByText('chatPage.chatMenu.deleteChat')
    fireEvent.click(deleteChatButton)

    expect(
      vi.mocked(useConfirm).mock.results[0].value.openDialog
    ).toHaveBeenCalledWith({
      message: 'chatPage.chatMenu.markingAsDeletedWarning',
      sendConfirm: expect.any(Function),
      title: 'chatPage.chatMenu.markingAsDeletedTitle'
    })
  })
})
