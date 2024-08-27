import { useState, useCallback, useEffect, useMemo, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Allotment } from 'allotment'
import Box from '@mui/material/Box'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'

import { chatService } from '~/services/chat-service'
import { messageService } from '~/services/message-service'
import { useDrawer } from '~/hooks/use-drawer'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppSelector } from '~/hooks/use-redux'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import AppChip from '~/components/app-chip/AppChip'
import Loader from '~/components/loader/Loader'
import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'
import ChatHeader from '~/containers/chat/chat-header/ChatHeader'
import ChatTextArea from '~/containers/chat/chat-text-area/ChatTextArea'
import AboutChatSidebar from '~/containers/about-chat-sidebar/AboutChatSidebar'

import { defaultResponses } from '~/constants'
import { styles } from '~/pages/chat/Chat.styles'
import {
  backdropIgnore,
  mockFiles,
  mockLinks,
  mockMedia
} from '~/pages/chat/Chat.constants'
import {
  ChatResponse,
  DrawerVariantEnum,
  GetMessagesResponse,
  Member,
  MessageInterface,
  PositionEnum
} from '~/types'
import MessagesList from './MessagesList'

const Chat = () => {
  const { t } = useTranslation()
  const { isMobile, isDesktop } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [selectedChat, setSelectedChat] = useState<ChatResponse | null>(null)
  const [messages, setMessages] = useState<MessageInterface[]>([])
  const [messagesCount, setMessagesCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [filteredMessages, setFilteredMessages] = useState<string[]>([])
  const [filteredIndex, setFilteredIndex] = useState<number>(0)
  const [prevScrollHeight, setPrevScrollHeight] = useState(0)
  const [prevScrollTop, setPrevScrollTop] = useState(0)
  const { userId: myId } = useAppSelector((state) => state.appMain)

  const limit = 15

  const userToSpeak = useMemo<Member | undefined>(
    () => selectedChat?.members.find((member) => member.user._id !== myId),
    [selectedChat, myId]
  )

  const markedAsDeleted = useMemo<boolean | null>(
    () => selectedChat && selectedChat?.deletedFor?.length > 0,
    [selectedChat]
  )

  const allotmentSizes = isSidebarOpen && isDesktop ? [25, 50, 25] : [25, 75]
  const { Persistent, Temporary } = DrawerVariantEnum

  const openChatsHandler = (e: MouseEvent<HTMLButtonElement>) => {
    openDrawer()
    e.stopPropagation()
  }

  const onSidebarHandler = (
    state: boolean,
    event?: MouseEvent<HTMLButtonElement>
  ) => {
    !event && setIsSidebarOpen(state)

    if (event?.target instanceof HTMLElement) {
      event.target.classList[0] !== backdropIgnore && setIsSidebarOpen(state)
    }
  }

  const onMessagesResponse = useCallback(
    (response: GetMessagesResponse) => {
      const items = response.items ?? []
      items.reverse()
      setMessages((messages) => (skip === 0 ? items : [...items, ...messages]))
      setMessagesCount(response.count)
    },
    [setMessages, skip]
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
    () =>
      messageService.getMessages({
        chatId: selectedChat?._id ?? '',
        limit,
        skip
      }),
    [selectedChat?._id, skip]
  )

  const {
    fetchData: updateChats,
    response: listOfChats,
    loading
  } = useAxios({
    service: getChats,
    defaultResponse: defaultResponses.array
  })

  const { fetchData, loading: isMessagesLoading } = useAxios({
    service: getMessages,
    onResponse: onMessagesResponse,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: false
  })

  const handleUpdateChats = async () => {
    await updateChats()
    setSkip(0)
    setSelectedChat(null)
  }

  const onMessageSend = async () => {
    setTextAreaValue('')
    setSkip(0)
    await sendMessage()
    await fetchData()
  }

  useEffect(() => {
    selectedChat && void fetchData()
  }, [selectedChat, fetchData])

  useEffect(() => {
    const currentChatId = localStorage.getItem('currentChatId')

    if (currentChatId) {
      const foundChat = listOfChats.find(
        (chat: ChatResponse) => chat._id === currentChatId
      )

      if (foundChat) {
        setSkip(0)
        setSelectedChat(foundChat)
        localStorage.removeItem('currentChatId')
      }
    }
  }, [listOfChats])

  if (loading || (isMessagesLoading && !skip)) {
    return <Loader size={100} />
  }

  const aboutChatSidebar = selectedChat && (
    <AppDrawer
      PaperProps={{ sx: styles.sidebarPaper }}
      anchor={PositionEnum.Right}
      onClose={() => onSidebarHandler(false)}
      open={isSidebarOpen}
      sx={styles.sidebar}
      variant={isDesktop ? Persistent : Temporary}
    >
      {userToSpeak && (
        <AboutChatSidebar
          files={mockFiles}
          links={mockLinks}
          media={mockMedia}
          member={userToSpeak}
        />
      )}
    </AppDrawer>
  )

  const selectChatChip = (
    <AppChip labelSx={styles.chipLabel(false)} sx={styles.chip}>
      {t('chatPage.chat.chipLabel')}
    </AppChip>
  )

  const handleInifiniteLoad = (scrollTop: number, scrollHeight: number) => {
    if (messagesCount < skip + limit) return

    setPrevScrollTop(scrollTop)
    setPrevScrollHeight(scrollHeight)
    setSkip((skip) => skip + limit)
  }

  const renderChatTextArea = () => {
    const userName = userToSpeak
      ? `${userToSpeak.user.firstName} ${userToSpeak.user.lastName}`
      : t('chatPage.interlocutor')

    return markedAsDeleted ? (
      <AppChip labelSx={styles.warningLabel} sx={styles.warningChip}>
        <WarningAmberRoundedIcon />
        {t('chatPage.deletedChip', { userName: userName })}
      </AppChip>
    ) : (
      <ChatTextArea
        label={t('chatPage.chat.inputLabel')}
        onClick={() => void onMessageSend()}
        setValue={setTextAreaValue}
        value={textAreaValue}
      />
    )
  }

  const handleFilteredMessage = (filteredMessages: string[]) => {
    filteredMessages.reverse()
    setFilteredMessages(filteredMessages)
  }

  const hadleIndexMessage = (filteredIndex: number) => {
    setFilteredIndex(filteredIndex)
  }

  const handleChatSelection = (chat: ChatResponse) => {
    setSkip(0)
    setSelectedChat(chat)
  }

  return (
    <PageWrapper disableGutters maxWidth={false} sx={styles.root}>
      {isMobile && (
        <AppDrawer
          anchor={PositionEnum.Left}
          onClose={closeDrawer}
          open={selectedChat ? isOpen : true}
        >
          <ListOfUsersWithSearch
            closeDrawer={closeDrawer}
            listOfChats={listOfChats}
            selectedChat={selectedChat}
            setSelectedChat={handleChatSelection}
          />
        </AppDrawer>
      )}
      <Allotment defaultSizes={isMobile ? [1] : allotmentSizes}>
        {!isMobile && (
          <Allotment.Pane minSize={250} preferredSize={350}>
            <ListOfUsersWithSearch
              listOfChats={listOfChats}
              selectedChat={selectedChat}
              setSelectedChat={handleChatSelection}
            />
          </Allotment.Pane>
        )}
        <Allotment.Pane minSize={isMobile ? 340 : 400}>
          <Box sx={styles.chatContent(!!selectedChat, messages.length)}>
            {!selectedChat ? (
              selectChatChip
            ) : (
              <>
                {userToSpeak && (
                  <ChatHeader
                    currentChat={selectedChat}
                    messages={messages}
                    onClick={(event?: MouseEvent<HTMLButtonElement>) =>
                      onSidebarHandler(true, event)
                    }
                    onFilteredIndexChange={hadleIndexMessage}
                    onFilteredMessagesChange={handleFilteredMessage}
                    onMenuClick={openChatsHandler}
                    updateChats={handleUpdateChats}
                    updateMessages={fetchData}
                    user={userToSpeak?.user}
                  />
                )}
                <MessagesList
                  filteredIndex={filteredIndex}
                  filteredMessages={filteredMessages}
                  infiniteLoadCallback={handleInifiniteLoad}
                  isMessagesLoading={isMessagesLoading}
                  messages={messages}
                  scrollHeight={!skip ? 0 : prevScrollHeight}
                  scrollTop={!skip ? 0 : prevScrollTop}
                />
                {renderChatTextArea()}
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
