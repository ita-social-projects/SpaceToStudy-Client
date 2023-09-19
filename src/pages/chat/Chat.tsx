import {
  useState,
  useCallback,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent
} from 'react'
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
import AboutChatSidebar from '~/containers/about-chat-sidebar/AboutChatSidebar'

import { getGroupedByDate, getIsNewDay } from '~/utils/helper-functions'
import { defaultResponses } from '~/constants'
import { styles } from '~/pages/chat/Chat.styles'
import { mockFiles, mockLinks, mockMedia } from '~/pages/chat/Chat.constants'
import {
  ChatResponse,
  DrawerVariantEnum,
  MessageInterface,
  PositionEnum
} from '~/types'

const Chat = () => {
  const { t } = useTranslation()
  const { isMobile, isDesktop } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [selectedChat, setSelectedChat] = useState<ChatResponse | null>(null)
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [filteredMessages, setFilteredMessages] = useState<string[]>([])
  const [filteredIndex, setFilteredIndex] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const groupedMessages = getGroupedByDate(messages, getIsNewDay)
  const allotmentSizes = isSidebarOpen && isDesktop ? [25, 50, 25] : [25, 75]
  const { Persistent, Temporary } = DrawerVariantEnum

  const openChatsHandler = (e: MouseEvent<HTMLButtonElement>) => {
    openDrawer()
    e.stopPropagation()
  }

  const onSidebarHandler = (event: boolean) => {
    setIsSidebarOpen(event)
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
      {group.items.map((item, index) => (
        <Message
          filteredIndex={filteredIndex}
          filteredMessages={filteredMessages}
          key={item._id}
          message={item}
          prevMessage={index ? group.items[index - 1] : null}
        />
      ))}
    </Box>
  ))

  const aboutChatSidebar = selectedChat && (
    <AppDrawer
      PaperProps={{ sx: styles.sidebarPaper }}
      anchor={PositionEnum.Right}
      onClose={() => onSidebarHandler(false)}
      open={isSidebarOpen}
      sx={styles.sidebar}
      variant={isDesktop ? Persistent : Temporary}
    >
      <AboutChatSidebar
        files={mockFiles}
        links={mockLinks}
        media={mockMedia}
        member={selectedChat.members[0]}
      />
    </AppDrawer>
  )

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

  const handleFilteredMessage = (filteredMessages: string[]) => {
    setFilteredMessages(filteredMessages.reverse())
  }

  const hadleIndexMessage = (filteredIndex: number) => {
    setFilteredIndex(filteredIndex)
  }

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
      <Allotment defaultSizes={isMobile ? [1] : allotmentSizes}>
        {!isMobile && (
          <Allotment.Pane minSize={250} preferredSize={350}>
            <ListOfUsersWithSearch
              listOfChats={listOfChats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          </Allotment.Pane>
        )}
        <Allotment.Pane minSize={isMobile ? 340 : 400}>
          <Box sx={styles.chatContent(!!selectedChat, messages.length)}>
            {!selectedChat ? (
              selectChatChip
            ) : (
              <>
                <ChatHeader
                  messages={messages}
                  onClick={() => onSidebarHandler(true)}
                  onFilteredIndexChange={hadleIndexMessage}
                  onFilteredMessagesChange={handleFilteredMessage}
                  onMenuClick={openChatsHandler}
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
        {isDesktop && isSidebarOpen && (
          <Allotment.Pane maxSize={320} minSize={320}>
            {aboutChatSidebar}
          </Allotment.Pane>
        )}
      </Allotment>
      {!isDesktop && isSidebarOpen && aboutChatSidebar}
    </PageWrapper>
  )
}

export default Chat
