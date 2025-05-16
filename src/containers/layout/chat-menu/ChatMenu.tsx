import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import AppMenu from '~/components/app-menu/AppMenu'
import useConfirm from '~/hooks/use-confirm'
import { chatService } from '~/services/chat-service'
import { messageService } from '~/services/message-service'

import { styles } from '~/containers/layout/chat-menu/ChatMenu.styles'
import { ChatResponse } from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { useAppDispatch } from '~/hooks/use-redux'
import { snackbarVariants } from '~/constants'
import { MenuItemColorVariant } from '~/design-system/components/menu-item/MenuItem.constants'

interface ChatMenuProps {
  anchorEl: HTMLElement | null
  currentChat: ChatResponse
  messagesLength: number
  onClose: () => void
  updateChats: () => Promise<void>
  updateMessages: () => Promise<void>
  setIsHistoryCleared: (value: boolean) => void
}

const ChatMenu: FC<ChatMenuProps> = ({
  anchorEl,
  currentChat,
  messagesLength,
  onClose,
  updateChats,
  updateMessages,
  setIsHistoryCleared
}) => {
  const { t } = useTranslation()
  const { openDialog } = useConfirm()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsHistoryCleared(messagesLength === 0)
  }, [messagesLength, setIsHistoryCleared])

  const handleClearChat = async (id: string, isConfirmed: boolean) => {
    if (!isConfirmed) return
    try {
      await messageService.clearChatHistory(id)
      await updateMessages()
      await updateChats()
      setIsHistoryCleared(true)
    } catch (error) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: `${t('Error during deletion:')} ${String(error)}`
        })
      )
    } finally {
      onClose()
    }
  }

  const handleDeletion = async (
    id: string,
    isConfirmed: boolean,
    deletingFully: boolean
  ) => {
    if (!isConfirmed) return
    try {
      if (deletingFully) {
        await messageService.deleteMessagesFromChat(id)
        await chatService.deleteChat(id)
      } else {
        await chatService.markChatAsDeleted(id)
      }
      await updateChats()
    } catch (error) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: `${t('Error during deletion:')} ${String(error)}`
        })
      )
    } finally {
      onClose()
    }
  }

  const onClearHistory = (id: string) => {
    openDialog({
      message: 'chatPage.chatMenu.clearHistoryWarning',
      sendConfirm: (isConfirmed: boolean) =>
        void handleClearChat(id, isConfirmed),
      title: 'chatPage.chatMenu.clearHistoryTitle'
    })
  }

  const onDelete = (id: string) => {
    onClose()
    const deletingFully = currentChat.deletedFor.length > 0
    openDialog({
      message: deletingFully
        ? 'chatPage.chatMenu.fullDeleteWarning'
        : 'chatPage.chatMenu.markingAsDeletedWarning',
      sendConfirm: (isConfirmed: boolean) =>
        void handleDeletion(id, isConfirmed, deletingFully),
      title: deletingFully
        ? 'chatPage.chatMenu.fullDeleteTitle'
        : 'chatPage.chatMenu.markingAsDeletedTitle'
    })
  }

  const menuList = [
    {
      title: t('chatPage.chatMenu.clearHistory'),
      onClick: () => onClearHistory(currentChat._id),
      graphics: <UpdateDisabledIcon />,
      sx: styles.menuItem(false),
      isDisabled: messagesLength === 0,
      density: 2 as const
    },
    {
      title: t('chatPage.chatMenu.deleteChat'),
      onClick: () => onDelete(currentChat._id),
      graphics: <DeleteOutlineIcon />,
      sx: styles.menuItem(true),
      isDisabled: false,
      density: 2 as const,
      colorVariant: 'danger' as MenuItemColorVariant
    }
  ]

  return (
    <AppMenu
      anchorEl={anchorEl}
      key={messagesLength}
      menuList={menuList}
      onClose={onClose}
    />
  )
}

export default ChatMenu
