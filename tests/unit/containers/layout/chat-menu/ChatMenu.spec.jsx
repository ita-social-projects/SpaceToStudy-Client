import { fireEvent, screen, cleanup, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'
import ChatMenu from '~/containers/layout/chat-menu/ChatMenu'

const mockOpenDialog = vi.fn()
const mockSetAlert = vi.fn()
vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({
      openDialog: mockOpenDialog,
      setNeedConfirmation: () => true
    })
  }
})

vi.mock('~/hooks/use-axios', async () => {
  const actual = await vi.importActual('~/hooks/use-axios')
  return {
    useAxios: vi.fn(() => ({
      fetchData: vi.fn()
    })),
    ...actual
  }
})

vi.mock('~/context/snackbar-context', async () => {
  const actual = await vi.importActual('~/context/snackbar-context')
  return {
    useSnackBarContext: vi.fn(() => ({
      setAlert: mockSetAlert
    })),
    ...actual
  }
})

vi.mock('~/services/chat-service', async () => {
  const actual = await vi.importActual('~/services/chat-service')
  return {
    chatService: {
      markChatAsDeleted: vi.fn(),
      deleteChat: vi.fn()
    },
    ...actual
  }
})

describe('ChatMenu Component', () => {
  const anchorEl = document.createElement('div')
  const currentChat = {
    _id: '1',
    deletedFor: []
  }
  const messages = {
    len: 0
  }
  const onClose = vi.fn()
  const updateChats = vi.fn()
  const updateMessages = vi.fn()

  const renderComponent = () =>
    renderWithProviders(
      <ChatMenu
        anchorEl={anchorEl}
        currentChat={currentChat}
        messagesLength={messages.len}
        onClose={onClose}
        updateChats={updateChats}
        updateMessages={updateMessages}
      />
    )

  beforeEach(() => {
    renderComponent()
  })

  it('renders without errors', () => {
    expect(
      screen.getByText('chatPage.chatMenu.clearHistory')
    ).toBeInTheDocument()
    expect(screen.getByText('chatPage.chatMenu.deleteChat')).toBeInTheDocument()
  })

  it('should disable Clear History button if there are no messages', () => {
    const clearHistoryButton = screen.getByText(
      'chatPage.chatMenu.clearHistory'
    )

    fireEvent.click(clearHistoryButton)

    expect(clearHistoryButton).toHaveAttribute('disabled')
    expect(onClose).not.toHaveBeenCalled()
    expect(updateMessages).not.toHaveBeenCalled()
  })

  it('handles Clear History button click', async () => {
    messages.len = 5
    cleanup()
    renderComponent()

    const clearHistoryButton = screen.getByText(
      'chatPage.chatMenu.clearHistory'
    )

    fireEvent.click(clearHistoryButton)
    const confirmFunction = mockOpenDialog.mock.calls[0][0].sendConfirm
    await confirmFunction(true)

    expect(onClose).toHaveBeenCalled()
    expect(mockOpenDialog).toHaveBeenCalledWith({
      message: 'chatPage.chatMenu.clearHistoryWarning',
      sendConfirm: expect.any(Function),
      title: 'chatPage.chatMenu.clearHistoryTitle'
    })
    waitFor(() => expect(updateMessages).toHaveBeenCalled())
  })

  it('handles Delete button click (mark as deleted)', async () => {
    const deleteButton = screen.getByText('chatPage.chatMenu.deleteChat')

    fireEvent.click(deleteButton)
    const confirmFunction = mockOpenDialog.mock.calls[1][0].sendConfirm
    await confirmFunction(true)

    expect(onClose).toHaveBeenCalled()
    expect(mockOpenDialog).toHaveBeenCalledWith({
      message: 'chatPage.chatMenu.markingAsDeletedWarning',
      sendConfirm: expect.any(Function),
      title: 'chatPage.chatMenu.markingAsDeletedTitle'
    })
    waitFor(() => expect(updateChats).toHaveBeenCalled())
  })

  it('handles Delete button click (fully deleting)', async () => {
    const deleteButton = screen.getByText('chatPage.chatMenu.deleteChat')
    currentChat.deletedFor = ['user1']

    fireEvent.click(deleteButton)
    const confirmFunction = mockOpenDialog.mock.calls[2][0].sendConfirm
    await confirmFunction(true)

    expect(onClose).toHaveBeenCalled()
    expect(mockOpenDialog).toHaveBeenCalledWith({
      message: 'chatPage.chatMenu.fullDeleteWarning',
      sendConfirm: expect.any(Function),
      title: 'chatPage.chatMenu.fullDeleteTitle'
    })
    waitFor(() => expect(updateChats).toHaveBeenCalled())
  })
})
