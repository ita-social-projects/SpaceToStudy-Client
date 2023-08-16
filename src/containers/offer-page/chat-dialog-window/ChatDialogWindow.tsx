import {
  useCallback,
  useEffect,
  ChangeEvent,
  useState,
  useRef,
  FC
} from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import SimpleBar from 'simplebar-react'

import Box from '@mui/material/Box'
import MessageIcon from '@mui/icons-material/Message'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ChatDate from '~/containers/chat/chat-date/ChatDate'
import ChatTextArea from '~/containers/chat/chat-text-area/ChatTextArea'
import Message from '~/components/message/Message'
import useAxios from '~/hooks/use-axios'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import Loader from '~/components/loader/Loader'
import { messageService } from '~/services/message-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { useChatContext } from '~/context/chat-context'

import { MessageInterface, Offer } from '~/types'
import { defaultResponses } from '~/constants'
import { styles } from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow.styles'
import { createUrlPath } from '~/utils/helper-functions'
import { questions } from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow.constants'

interface ChatDialogWindow {
  chatInfo: Pick<Offer, 'author' | 'authorRole' | 'chatId'>
}

const ChatDialogWindow: FC<ChatDialogWindow> = ({ chatInfo }) => {
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const { t } = useTranslation()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { setChatInfo } = useChatContext()
  const navigate = useNavigate()

  const onTextAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextAreaValue(e.target.value)
  }

  const getMessages = useCallback(
    () => messageService.getMessages({ chatId: chatInfo.chatId }),
    [chatInfo.chatId]
  )

  const {
    response: messages,
    loading: messagesLoad,
    fetchData
  } = useAxios({
    service: getMessages,
    defaultResponse: defaultResponses.array,
    fetchOnMount: false
  })

  useEffect(() => {
    chatInfo?.chatId && void fetchData({ chatId: chatInfo?.chatId })
  }, [chatInfo?.chatId, fetchData])

  useEffect(() => {
    if (chatInfo?.chatId && !messagesLoad) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    }
  }, [chatInfo.chatId, messagesLoad])

  const messagesList = messages.map((message: MessageInterface) => (
    <Message key={message._id} message={message} sx={styles.message} />
  ))

  const scrollableContent = messagesLoad ? (
    <Loader pageLoad size={50} sx={styles.loader} />
  ) : (
    <SimpleBar
      scrollableNodeProps={{ ref: scrollRef }}
      style={styles.scrollableContent}
    >
      <ChatDate date={new Date()} />
      {messagesList}
    </SimpleBar>
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.chatContent}>
        <Box sx={styles.header}>
          <UserProfileInfo
            _id={chatInfo.author._id}
            firstName={chatInfo.author.firstName}
            isOnline
            lastName={chatInfo.author.lastName}
            photo={chatInfo.author.photo}
            role={chatInfo.authorRole}
            sx={styles.userProfileInfo}
          />
          <Box>
            {chatInfo.chatId && (
              <IconButton
                onClick={() =>
                  navigate(
                    createUrlPath(authRoutes.chat.route, chatInfo.author._id)
                  )
                }
                sx={styles.icons}
              >
                <MessageIcon />
              </IconButton>
            )}
            <IconButton onClick={() => setChatInfo(null)} sx={styles.icons}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {chatInfo.chatId ? (
          scrollableContent
        ) : (
          <Box sx={styles.firstQuestions}>
            <Typography sx={styles.subtitle}>
              {t('chatPage.youCanAsk')}
            </Typography>
            {questions.map((el) => (
              <Typography key={el.question} sx={styles.question}>
                {t(el.question)}
              </Typography>
            ))}
          </Box>
        )}
        <ChatTextArea
          label={t('chatPage.chat.inputLabel')}
          maxRows={3}
          onChange={onTextAreaChange}
          sx={styles.textArea}
          value={textAreaValue}
        />
      </Box>
    </Box>
  )
}

export default ChatDialogWindow
