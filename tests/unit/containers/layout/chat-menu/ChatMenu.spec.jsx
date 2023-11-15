import { fireEvent, screen, cleanup } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'
import ChatMenu from '~/containers/layout/chat-menu/ChatMenu'

const mockOpenDialog = vi.fn()
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
      setAlert: vi.fn()
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
  const onClose = vi.fn()
  const updateChats = vi.fn()
  const updateMessages = vi.fn()

  beforeEach(() => {
    renderWithProviders(
      <ChatMenu
        anchorEl={anchorEl}
        currentChat={currentChat}
        messagesLength={0}
        onClose={onClose}
        updateChats={updateChats}
        updateMessages={updateMessages}
      />
    )
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

  it('handles Clear History button click', () => {
    cleanup()
    renderWithProviders(
      <ChatMenu
        anchorEl={anchorEl}
        currentChat={currentChat}
        messagesLength={5}
        onClose={onClose}
        updateChats={updateChats}
        updateMessages={updateMessages}
      />
    )

    const clearHistoryButton = screen.getByText(
      'chatPage.chatMenu.clearHistory'
    )
    const modalTitle = 'chatPage.chatMenu.clearHistoryTitle'
    const modalDescription = 'chatPage.chatMenu.clearHistoryWarning'

    fireEvent.click(clearHistoryButton)

    expect(onClose).toHaveBeenCalled()
    expect(modalTitle).toBe(mockOpenDialog.mock.calls[0][0].title)
    expect(modalDescription).toBe(mockOpenDialog.mock.calls[0][0].message)
  })

  it('handles Delete button click (mark as deleted)', () => {
    const deleteButton = screen.getByText('chatPage.chatMenu.deleteChat')
    const modalTitle = 'chatPage.chatMenu.markingAsDeletedTitle'
    const modalDescription = 'chatPage.chatMenu.markingAsDeletedWarning'

    fireEvent.click(deleteButton)

    expect(onClose).toHaveBeenCalled()
    expect(modalTitle).toBe(mockOpenDialog.mock.calls[1][0].title)
    expect(modalDescription).toBe(mockOpenDialog.mock.calls[1][0].message)
  })

  it('handles Delete button click (fully deleting)', async () => {
    const deleteButton = screen.getByText('chatPage.chatMenu.deleteChat')
    const modalTitle = 'chatPage.chatMenu.fullDeleteTitle'
    const modalDescription = 'chatPage.chatMenu.fullDeleteWarning'
    currentChat.deletedFor = ['user1']

    fireEvent.click(deleteButton)

    expect(onClose).toHaveBeenCalled()
    expect(modalTitle).toBe(mockOpenDialog.mock.calls[2][0].title)
    expect(modalDescription).toBe(mockOpenDialog.mock.calls[2][0].message)
  })
})
