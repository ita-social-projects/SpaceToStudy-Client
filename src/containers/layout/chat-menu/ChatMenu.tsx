import { FC, MouseEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'
import MenuItem from '@mui/material/MenuItem'
import UpdateDisabledIcon from '@mui/icons-material/UpdateDisabled'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import AppMenu from '~/components/app-menu/AppMenu'
import useConfirm from '~/hooks/use-confirm'
import useAxios from '~/hooks/use-axios'
import { useSnackBarContext } from '~/context/snackbar-context'
import { chatService } from '~/services/chat-service'
import { messageService } from '~/services/message-service'

import { styles } from '~/containers/layout/chat-menu/ChatMenu.styles'
import { ChatResponse, ComponentEnum, ErrorResponse } from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'

interface ChatMenuProps {
  anchorEl: Element | null
  currentChat: ChatResponse
  onClose: () => void
  updateChats: () => Promise<void>
}

const ChatMenu: FC<ChatMenuProps> = ({
  anchorEl,
  currentChat,
  onClose,
  updateChats
}) => {
  const { t } = useTranslation()
  const { openDialog } = useConfirm()
  const { setAlert } = useSnackBarContext()

  const onResponse = useCallback(() => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'chatPage.deleteSuccess'
    })
  }, [setAlert])

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
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

  const onClearHistory = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClose()
  }

  const onDelete = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    onClose()
    const deletingFully = currentChat.deletedFor.length > 0

    openDialog({
      message: deletingFully
        ? 'chatPage.fullDeleteWarning'
        : 'chatPage.markingAsDeletedWarning',
      sendConfirm: (isConfirmed: boolean) =>
        void handleDeletion(id, isConfirmed, deletingFully),
      title: deletingFully
        ? 'chatPage.fullDeleteTitle'
        : 'chatPage.markingAsDeletedTitle'
    })
  }

  const menuButtons = [
    {
      _id: 1,
      icon: <UpdateDisabledIcon />,
      name: t('chatPage.clearHistory'),
      handleOnClick: (e: MouseEvent<HTMLButtonElement>) => onClearHistory(e)
    },
    {
      _id: 2,
      icon: <DeleteOutlineIcon />,
      name: t('chatPage.deleteChat'),
      handleOnClick: (e: MouseEvent<HTMLButtonElement>) =>
        onDelete(e, currentChat._id),
      isDangerous: true
    }
  ]

  const menuItems = menuButtons.map((item) => (
    <MenuItem
      component={ComponentEnum.Button}
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
