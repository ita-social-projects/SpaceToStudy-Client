import { useCallback, useEffect, useState, useRef, FC } from 'react'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import Box from '@mui/material/Box'
import MessageIcon from '@mui/icons-material/Message'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ChatDate from '~/containers/chat/chat-date/ChatDate'
import ChatTextArea from '~/containers/chat/chat-text-area/ChatTextArea'
import { useChatContext } from '~/context/chat-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import useAxios from '~/hooks/use-axios'
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
  MessageInterface
} from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow.styles'
import { questions } from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow.constants'

interface ChatDialogWindow {
  chatInfo: ChatInfo
}

const ChatDialogWindow: FC<ChatDialogWindow> = ({ chatInfo }) => {
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [isInitSended, setIsInitSended] = useState<boolean>(false)
  const [isRedirected, setIsRedirected] = useState<boolean>(false)
  const { setAlert } = useSnackBarContext()
  const { t } = useTranslation()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { setChatInfo } = useChatContext()

  const handleErrorResponse = useCallback(
    (errorResponse: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: errorResponse ? `${errorResponse.message}` : ''
      })
    },
    [setAlert]
  )

  const getMessages = useCallback(
    () => messageService.getMessages({ chatId: chatInfo.chatId as string }),
    [chatInfo.chatId]
  )

  const sendMessage = useCallback(
    () =>
      messageService.sendMessage({
        chatId: chatInfo.chatId.toString(),
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

  const {
    response: messages,
    loading: messagesLoad,
    fetchData
  } = useAxios<MessageInterface[]>({
    service: getMessages,
    defaultResponse: defaultResponses.array,
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

  const closeChatWindow = () => setChatInfo(null)

  const openChatInNewTab = (chatId: Pick<ChatResponse, '_id'> | string) => {
    localStorage.setItem('currentChatId', chatId as string)
    window.open(authRoutes.chat.path, '_blank', 'noopener noreferrer')
  }

  const handleRedirectToChat = async () => {
    if (!chatInfo.chatId) {
      setIsRedirected(true)
      await createNewChat()
    } else openChatInNewTab(chatInfo.chatId)
    closeChatWindow()
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
    chatInfo.chatId && void fetchData()
  }, [chatInfo.chatId, fetchData])

  useEffect(() => {
    if (chatInfo.chatId && !messagesLoad) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    }
  }, [chatInfo.chatId, messagesLoad])

  useEffect(() => {
    if (createdChat?._id && createdChat?._id !== chatInfo.chatId) {
      chatInfo.updateInfo()
      setChatInfo({
        ...chatInfo,
        chatId: createdChat?._id
      })
      isRedirected && openChatInNewTab(createdChat?._id)
    }
  }, [createdChat, isRedirected, chatInfo, setChatInfo])

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

  const groupedMessages = getGroupedByDate(messages, getIsNewDay)

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
      </Box>
    </Box>
  )
}

export default ChatDialogWindow
