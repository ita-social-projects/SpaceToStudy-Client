import { FC, MouseEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'
import MenuItem from '@mui/material/MenuItem'
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import AppMenu from '~/components/app-menu/AppMenu'
import useConfirm from '~/hooks/use-confirm'
import useAxios from '~/hooks/use-axios'
import { chatService } from '~/services/chat-service'
import { messageService } from '~/services/message-service'

import { styles } from '~/containers/layout/chat-menu/ChatMenu.styles'
import { ChatResponse, ComponentEnum, ErrorResponse } from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface ChatMenuProps {
  anchorEl: Element | null
  currentChat: ChatResponse
  messagesLength: number
  onClose: () => void
  updateChats: () => Promise<void>
  updateMessages: () => Promise<void>
}

const ChatMenu: FC<ChatMenuProps> = ({
  anchorEl,
  currentChat,
  messagesLength,
  onClose,
  updateChats,
  updateMessages
}) => {
  const { t } = useTranslation()
  const { openDialog } = useConfirm()
  const dispatch = useAppDispatch()

  const onResponse = useCallback(
    (isDeleting = true) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.success,
          message: isDeleting
            ? 'chatPage.chatMenu.deleteSuccess'
            : 'chatPage.chatMenu.historyClearSuccess'
        })
      )
    },
    [dispatch]
  )

  const onResponseError = useCallback(
    (error?: ErrorResponse) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    },
    [dispatch]
  )

  const markAsDeletedService = useCallback(
    (id?: string): Promise<AxiosResponse> =>
      chatService.markChatAsDeleted(id ?? ''),
    []
  )

  const deleteChatService = useCallback(
    (id?: string): Promise<AxiosResponse> => chatService.deleteChat(id ?? ''),
    []
  )

  const deleteMessagesService = useCallback(
    (id?: string): Promise<AxiosResponse> =>
      messageService.deleteMessagesFromChat(id ?? ''),
    []
  )

  const clearHistoryService = useCallback(
    (id?: string): Promise<AxiosResponse> =>
      messageService.clearChatHistory(id ?? ''),
    []
  )

  const { fetchData: markAsDeleted } = useAxios({
    service: markAsDeletedService,
    defaultResponse: defaultResponses.object,
    onResponse,
    onResponseError,
    fetchOnMount: false
  })

  const { fetchData: deleteChat } = useAxios({
    service: deleteChatService,
    defaultResponse: null,
    onResponse,
    onResponseError,
    fetchOnMount: false
  })

  const { fetchData: deleteMessages } = useAxios({
    service: deleteMessagesService,
    defaultResponse: null,
    onResponse,
    onResponseError,
    fetchOnMount: false
  })

  const { fetchData: clearHistory } = useAxios({
    service: clearHistoryService,
    defaultResponse: defaultResponses.object,
    onResponse: () => onResponse(false),
    onResponseError,
    fetchOnMount: false
  })

  const handleDeletion = async (
    id: string,
    isConfirmed: boolean,
    deletingFully: boolean
  ) => {
    if (isConfirmed) {
      if (deletingFully) {
        await deleteMessages(id)
        await deleteChat(id)
      } else await markAsDeleted(id)

      await updateChats()
    }
  }

  const handleClearChat = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await clearHistory(id)
      await updateMessages()
    }
  }

  const onClearHistory = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    onClose()

    openDialog({
      message: 'chatPage.chatMenu.clearHistoryWarning',
      sendConfirm: (isConfirmed: boolean) =>
        void handleClearChat(id, isConfirmed),
      title: 'chatPage.chatMenu.clearHistoryTitle'
    })
  }

  const onDelete = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
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

  const menuButtons = [
    {
      _id: 1,
      icon: <UpdateDisabledIcon />,
      isAvailable: !!messagesLength,
      name: t('chatPage.chatMenu.clearHistory'),
      handleOnClick: (e: MouseEvent<HTMLButtonElement>) =>
        onClearHistory(e, currentChat._id)
    },
    {
      _id: 2,
      icon: <DeleteOutlineIcon />,
      isAvailable: !!currentChat,
      name: t('chatPage.chatMenu.deleteChat'),
      handleOnClick: (e: MouseEvent<HTMLButtonElement>) =>
        onDelete(e, currentChat._id),
      isDangerous: true
    }
  ]

  const menuItems = menuButtons.map((item) => (
    <MenuItem
      component={ComponentEnum.Button}
      disabled={!item.isAvailable}
      key={item._id}
      onClick={item.handleOnClick}
      sx={styles.menuItem(!!item.isDangerous)}
    >
      {item.icon}
      {item.name}
    </MenuItem>
  ))

  return (
    <AppMenu
      anchorEl={anchorEl}
      menuList={menuItems}
      onClose={onClose}
      open={Boolean(anchorEl)}
    />
  )
}

export default ChatMenu
