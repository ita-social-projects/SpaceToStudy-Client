import { useState, useCallback, useEffect, useRef, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Allotment } from 'allotment'
import SimpleBar from 'simplebar-react'
import Box from '@mui/material/Box'

import { chatService } from '~/services/chat-service'
import { messageService } from '~/services/message-service'
import { useDrawer } from '~/hooks/use-drawer'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppChip from '~/components/app-chip/AppChip'
import Message from '~/components/message/Message'
import Loader from '~/components/loader/Loader'
import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'
import ChatHeader from '~/containers/chat/chat-header/ChatHeader'
import ChatDate from '~/containers/chat/chat-date/ChatDate'
import ChatTextArea from '~/containers/chat/chat-text-area/ChatTextArea'

import { getGroupedMessages } from '~/utils/helper-functions'
import { defaultResponses } from '~/constants'
import { styles } from '~/pages/chat/Chat.styles'
import { ChatResponse, MessageInterface, PositionEnum } from '~/types'

const Chat = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const [selectedChat, setSelectedChat] = useState<ChatResponse | null>(null)
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const groupedMessages = getGroupedMessages(messages)

  const openChatsHandler = () => {
    openDrawer()
  }

  const onTextAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextAreaValue(e.target.value)
  }

  const onMessagesResponse = useCallback(
    (response: MessageInterface[]) => setMessages(response),
    [setMessages]
  )

  const getChats = useCallback(() => chatService.getChats(), [])

  const sendMessage = useCallback(
    () =>
      messageService.sendMessage({
        chatId: selectedChat?._id ?? '',
        text: textAreaValue
      }),
    [selectedChat?._id, textAreaValue]
  )

  const getMessages = useCallback(
    () => messageService.getMessages({ chatId: selectedChat?._id ?? '' }),
    [selectedChat?._id]
  )

  const { response: listOfChats, loading } = useAxios({
    service: getChats,
    defaultResponse: defaultResponses.array
  })

  const { fetchData } = useAxios({
    service: getMessages,
    onResponse: onMessagesResponse,
    defaultResponse: defaultResponses.array,
    fetchOnMount: false
  })

  const onMessageSend = async () => {
    setTextAreaValue('')
    await sendMessage()
    await fetchData()
  }

  useEffect(() => {
    setMessages([])
    selectedChat && void fetchData()
  }, [selectedChat, fetchData])

  useEffect(() => {
    if (selectedChat && messages.length) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    }
  }, [selectedChat, messages.length])

  if (loading) {
    return <Loader size={100} />
  }

  const messagesListWithDate = groupedMessages.map((group) => (
    <Box key={group.date} sx={styles.messagesWithDate}>
      <ChatDate date={group.date} />
      {group.messages.map((message, index) => (
        <Message
          key={message._id}
          message={message}
          prevMessage={index ? group.messages[index - 1] : null}
        />
      ))}
    </Box>
  ))

  const selectChatChip = (
    <AppChip labelSx={styles.chipLabel(false)} sx={styles.chip}>
      {t('chatPage.chat.chipLabel')}
    </AppChip>
  )

  const scrollableContent = messages.length ? (
    messagesListWithDate
  ) : (
    <AppChip labelSx={styles.chipLabel(true)} sx={styles.chip}>
      {t('chatPage.chat.loading')}
    </AppChip>
  )

  return (
    <PageWrapper sx={styles.root}>
      {isMobile && (
        <AppDrawer
          anchor={PositionEnum.Left}
          onClose={closeDrawer}
          open={isOpen}
        >
          <ListOfUsersWithSearch
            closeDrawer={closeDrawer}
            listOfChats={listOfChats}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </AppDrawer>
      )}
      <Allotment defaultSizes={isMobile ? [1] : [25, 75]}>
        {!isMobile && (
          <Allotment.Pane minSize={250} preferredSize={350}>
            <ListOfUsersWithSearch
              listOfChats={listOfChats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          </Allotment.Pane>
        )}
        <Allotment.Pane minSize={350}>
          <Box sx={styles.chatContent(!!selectedChat, messages.length)}>
            {!selectedChat ? (
              selectChatChip
            ) : (
              <>
                <ChatHeader
                  onClick={openChatsHandler}
                  user={selectedChat.members[0].user}
                />
                <SimpleBar
                  scrollableNodeProps={{ ref: scrollRef }}
                  style={styles.scrollableContent}
                >
                  {scrollableContent}
                </SimpleBar>
                <ChatTextArea
                  label={t('chatPage.chat.inputLabel')}
                  onChange={onTextAreaChange}
                  onClick={() => void onMessageSend()}
                  value={textAreaValue}
                />
              </>
            )}
          </Box>
        </Allotment.Pane>
      </Allotment>
    </PageWrapper>
  )
}

export default Chat
