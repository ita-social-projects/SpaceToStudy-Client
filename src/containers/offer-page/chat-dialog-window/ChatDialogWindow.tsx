import { useCallback, useEffect, useState, useRef, FC } from 'react'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import Box from '@mui/material/Box'
import MessageIcon from '@mui/icons-material/Message'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'

import ChatDate from '~/containers/chat/chat-date/ChatDate'
import ChatTextArea from '~/containers/chat/chat-text-area/ChatTextArea'
import { useChatContext } from '~/context/chat-context'
import { useAppDispatch } from '~/hooks/use-redux'
import useAxios from '~/hooks/use-axios'
import AppChip from '~/components/app-chip/AppChip'
import Message from '~/components/message/Message'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import Loader from '~/components/loader/Loader'
import { messageService } from '~/services/message-service'
import { chatService } from '~/services/chat-service'
import { getGroupedByDate, getIsNewDay } from '~/utils/helper-functions'

import {
  ChatInfo,
  ChatResponse,
  ErrorResponse,
  GetMessagesResponse,
  MessageInterface
} from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow.styles'
import { questions } from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow.constants'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { getErrorMessage } from '~/utils/error-with-message'

interface ChatDialogWindow {
  chatInfo: ChatInfo
}

const ChatDialogWindow: FC<ChatDialogWindow> = ({ chatInfo }) => {
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [isChatDeleted, setIsChatDeleted] = useState<boolean>(false)
  const [isInitSended, setIsInitSended] = useState<boolean>(false)
  const [isRedirected, setIsRedirected] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { setChatInfo } = useChatContext()

  const handleErrorResponse = useCallback(
    (error?: ErrorResponse) => {
      const errorKey = getErrorKey(error)

      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: error
            ? {
                text: errorKey,
                options: {
                  message: getErrorMessage(error.message)
                }
              }
            : errorKey
        })
      )
    },
    [dispatch]
  )

  const onResponse = useCallback(
    (response: ChatResponse | undefined) => {
      setChatInfo({ ...chatInfo, chatId: response?._id ?? '' })
    },
    [chatInfo, setChatInfo]
  )

  const getChats = useCallback(() => chatService.getChats(), [])

  const getMessages = useCallback(
    () => messageService.getMessages({ chatId: chatInfo.chatId as string }),
    [chatInfo.chatId]
  )

  const sendMessage = useCallback(
    () =>
      messageService.sendMessage({
        chatId: String(chatInfo.chatId),
        text: textAreaValue
      }),
    [chatInfo.chatId, textAreaValue]
  )

  const createChat = useCallback(
    () =>
      chatService.createChat({
        member: chatInfo.author._id,
        memberRole: chatInfo.authorRole
      }),
    [chatInfo.author._id, chatInfo.authorRole]
  )

  const { response: listOfChats, loading: isChatsLoading } = useAxios({
    service: getChats,
    defaultResponse: defaultResponses.array
  })

  const {
    response: { items: messages },
    loading: messagesLoad,
    fetchData
  } = useAxios<GetMessagesResponse>({
    service: getMessages,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: false
  })

  const {
    loading: chatIsCreating,
    fetchData: createNewChat,
    response: createdChat
  } = useAxios<ChatResponse | undefined>({
    service: createChat,
    fetchOnMount: false,
    defaultResponse: undefined,
    onResponse,
    onResponseError: handleErrorResponse
  })

  const { loading: isMessageSending, fetchData: handleSendMessage } = useAxios<
    MessageInterface[]
  >({
    service: sendMessage,
    defaultResponse: defaultResponses.array,
    fetchOnMount: false,
    onResponseError: handleErrorResponse
  })

  const closeChatWindow = useCallback(() => setChatInfo(null), [setChatInfo])

  const openChatInNewTab = (chatId: Pick<ChatResponse, '_id'> | string) => {
    localStorage.setItem('currentChatId', chatId as string)
    window.open(authRoutes.chat.path, '_blank', 'noopener noreferrer')
  }

  const handleRedirectToChat = async () => {
    if (!chatInfo.chatId) {
      setIsRedirected(true)
      await createNewChat()
    } else {
      openChatInNewTab(chatInfo.chatId)
      closeChatWindow()
    }
  }

  const sendQuestion = async (question: string) => {
    setTextAreaValue(question)
    await onMessageSend()
  }

  const onMessageSend = useCallback(async () => {
    if (!chatInfo.chatId) {
      await createNewChat()
    } else {
      setTextAreaValue('')
      setIsInitSended(true)
      await handleSendMessage()
      await fetchData()
    }
  }, [chatInfo.chatId, createNewChat, fetchData, handleSendMessage])

  useEffect(() => {
    if (!isChatsLoading && !messagesLoad) {
      const thisChat: ChatResponse | undefined = listOfChats.find(
        (chat: ChatResponse) => chat._id === chatInfo.chatId
      ) as unknown as ChatResponse

      if (thisChat) {
        const isChatDeleted = thisChat.deletedFor.length > 0
        setIsChatDeleted(isChatDeleted)
      }
    }
  }, [chatInfo.chatId, isChatsLoading, listOfChats, messages, messagesLoad])

  useEffect(() => {
    chatInfo.chatId && !isChatDeleted && void fetchData()
  }, [chatInfo.chatId, fetchData, isChatDeleted])

  useEffect(() => {
    if (chatInfo.chatId && !messagesLoad) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    }
  }, [chatInfo.chatId, messagesLoad])

  useEffect(() => {
    if (isRedirected && chatInfo.chatId) {
      openChatInNewTab(chatInfo.chatId)
      closeChatWindow()
      chatInfo.updateInfo()
    }
  }, [isRedirected, chatInfo, closeChatWindow])

  useEffect(() => {
    !chatIsCreating &&
      createdChat?._id &&
      !isInitSended &&
      !isRedirected &&
      void onMessageSend()
  }, [
    chatIsCreating,
    createdChat?._id,
    isInitSended,
    isRedirected,
    onMessageSend
  ])

  const groupedMessages = getGroupedByDate(messages || [], getIsNewDay)

  const messagesListWithDate = groupedMessages.map((group) => (
    <Box key={group.date} sx={styles.messagesWithDate}>
      <ChatDate date={group.date} />
      {group.items.map((item, index) => (
        <Message
          filteredIndex={0}
          key={item._id}
          message={item}
          prevMessage={index ? group.items[index - 1] : null}
        />
      ))}
    </Box>
  ))

  const statusLoader = (textToShow: string) => {
    return (
      <Box sx={styles.chatCreateBox}>
        <Loader size={20} />
        <Typography sx={styles.question}>{textToShow}</Typography>
      </Box>
    )
  }

  const chatTextArea = isChatDeleted ? (
    <AppChip labelSx={styles.warningLabel} sx={styles.warningChip}>
      <WarningAmberRoundedIcon />
      {t('chatPage.deleted')}
    </AppChip>
  ) : (
    <ChatTextArea
      emojiPickerProps={{ perLine: 6 }}
      label={
        isMessageSending
          ? statusLoader(t('chatPage.chat.sendingMessage'))
          : t('chatPage.chat.inputLabel')
      }
      maxRows={3}
      onClick={() => void onMessageSend()}
      setValue={setTextAreaValue}
      sx={styles.textArea}
      value={textAreaValue}
    />
  )

  const scrollableContent =
    messagesLoad && !isInitSended ? (
      <Loader pageLoad size={50} sx={styles.loader} />
    ) : (
      messagesListWithDate
    )

  const questionsList = chatIsCreating
    ? statusLoader(t('chatPage.creating'))
    : questions.map((el) => (
        <Typography
          key={el.question}
          onClick={() => void sendQuestion(t(el.question))}
          sx={styles.question}
        >
          {t(el.question)}
        </Typography>
      ))

  return (
    <Box sx={styles.root}>
      <Box sx={styles.chatContent}>
        <Box sx={styles.header}>
          <UserProfileInfo
            _id={chatInfo.author._id}
            firstName={chatInfo.author.firstName}
            lastName={chatInfo.author.lastName}
            onlineBadge
            photo={chatInfo.author.photo}
            role={chatInfo.authorRole}
            sx={styles.userProfileInfo}
          />
          <Box>
            <IconButton
              disabled={isChatDeleted}
              onClick={() => void handleRedirectToChat()}
              sx={styles.icons}
            >
              <MessageIcon />
            </IconButton>
            <IconButton onClick={closeChatWindow} sx={styles.icons}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {chatInfo.chatId ? (
          <SimpleBar
            scrollableNodeProps={{ ref: scrollRef }}
            style={styles.scrollableContent}
          >
            {scrollableContent}
          </SimpleBar>
        ) : (
          <Box sx={styles.firstQuestions}>
            <Typography sx={styles.subtitle}>
              {!chatIsCreating && t('chatPage.youCanAsk')}
            </Typography>
            {questionsList}
          </Box>
        )}
        {chatTextArea}
      </Box>
    </Box>
  )
}

export default ChatDialogWindow
