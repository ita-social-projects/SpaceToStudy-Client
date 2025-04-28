import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { vi } from 'vitest'
import ChatMenu from '~/containers/layout/chat-menu/ChatMenu'
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

describe('ChatMenu Component', () => {
  const mockOnClose = vi.fn()
  const mockUpdateChats = vi.fn(() => Promise.resolve())
  const mockUpdateMessages = vi.fn(() => Promise.resolve())
  const mockSetIsHistoryCleared = vi.fn()
  const mockOpenDialog = vi.fn()

  const currentChat = {
    _id: 'chatId',
    deletedFor: []
  }

  const renderComponent = (messagesLength = 5) => {
    vi.mocked(useConfirm).mockReturnValue({ openDialog: mockOpenDialog })

    render(
      <ChatMenu
        anchorEl={document.createElement('div')}
        currentChat={currentChat}
        messagesLength={messagesLength}
        onClose={mockOnClose}
        setIsHistoryCleared={mockSetIsHistoryCleared}
        updateChats={mockUpdateChats}
        updateMessages={mockUpdateMessages}
      />
    )
  }

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders menu items correctly', () => {
    renderComponent()

    expect(
      screen.getByText('chatPage.chatMenu.clearHistory')
    ).toBeInTheDocument()
    expect(screen.getByText('chatPage.chatMenu.deleteChat')).toBeInTheDocument()
  })

  it('calls openDialog when Clear History is clicked', () => {
    renderComponent()

    const clearHistoryButton = screen.getByText(
      'chatPage.chatMenu.clearHistory'
    )
    fireEvent.click(clearHistoryButton)

    expect(mockOpenDialog).toHaveBeenCalledWith({
      message: 'chatPage.chatMenu.clearHistoryWarning',
      sendConfirm: expect.any(Function),
      title: 'chatPage.chatMenu.clearHistoryTitle'
    })
  })

  it('marks chat as deleted and updates state on soft deletion', async () => {
    currentChat.deletedFor = []
    renderComponent()

    const deleteChatButton = screen.getByText('chatPage.chatMenu.deleteChat')
    fireEvent.click(deleteChatButton)

    const sendConfirm = mockOpenDialog.mock.calls[0][0].sendConfirm
    await sendConfirm(true)

    expect(chatService.markChatAsDeleted).toHaveBeenCalledWith('chatId')
    expect(mockUpdateChats).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('closes the menu when Close button is clicked', () => {
    const closeMenuMock = vi.fn()
    const setIsHistoryClearedMock = vi.fn()
    const messagesLength = 5
    const currentChat = { _id: '123', deletedFor: [] }
    const updateChatsMock = vi.fn()
    const updateMessagesMock = vi.fn()

    render(
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
    )

    const clearHistoryButton = screen.getByText(
      /chatPage.chatMenu.clearHistory/i
    )

    fireEvent.click(clearHistoryButton)

    expect(closeMenuMock).toHaveBeenCalled()
    expect(setIsHistoryClearedMock).toHaveBeenCalledWith(messagesLength === 0)
  })
})
