import { fireEvent, screen } from '@testing-library/react'
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

  beforeEach(() => {
    renderWithProviders(
      <ChatMenu
        anchorEl={anchorEl}
        currentChat={currentChat}
        onClose={onClose}
        updateChats={updateChats}
      />
    )
  })

  it('renders without errors', () => {
    expect(screen.getByText('chatPage.clearHistory')).toBeInTheDocument()
    expect(screen.getByText('chatPage.deleteChat')).toBeInTheDocument()
  })

  it('handles Clear History button click', () => {
    const clearHistoryButton = screen.getByText('chatPage.clearHistory')

    fireEvent.click(clearHistoryButton)

    expect(onClose).toHaveBeenCalled()
  })

  it('handles Delete button click (mark as deleted)', () => {
    const deleteButton = screen.getByText('chatPage.deleteChat')
    const modalTitle = 'chatPage.markingAsDeletedTitle'
    const modalDescription = 'chatPage.markingAsDeletedWarning'

    fireEvent.click(deleteButton)

    expect(onClose).toHaveBeenCalled()
    expect(modalTitle).toBe(mockOpenDialog.mock.calls[0][0].title)
    expect(modalDescription).toBe(mockOpenDialog.mock.calls[0][0].message)
  })

  it('handles Delete button click (fully deleting)', async () => {
    const deleteButton = screen.getByText('chatPage.deleteChat')
    const modalTitle = 'chatPage.fullDeleteTitle'
    const modalDescription = 'chatPage.fullDeleteWarning'
    currentChat.deletedFor = ['user1']

    fireEvent.click(deleteButton)

    expect(onClose).toHaveBeenCalled()
    expect(modalTitle).toBe(mockOpenDialog.mock.calls[1][0].title)
    expect(modalDescription).toBe(mockOpenDialog.mock.calls[1][0].message)
  })
})
