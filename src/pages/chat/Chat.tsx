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

import { defaultResponses } from '~/constants'
import { styles } from '~/pages/chat/Chat.styles'
import { ChatResponse, MessageInterface, PositionEnum } from '~/types'

const Chat = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const [selectedChat, setSelectedChat] = useState<ChatResponse | null>(null)
  const [textAreaValue, setTextAreaValueValue] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const openChatsHandler = () => {
    openDrawer()
  }

  const onTextAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextAreaValueValue(e.target.value)
  }

  const getChats = useCallback(() => chatService.getChats(), [])

  const getMessages = useCallback(
    (chatId: string) => messageService.getMessages(chatId),
    []
  )

  const { response: listOfChats, loading } = useAxios({
    service: getChats,
    defaultResponse: defaultResponses.array
  })

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
    selectedChat && void fetchData(selectedChat._id)
  }, [selectedChat, fetchData])

  useEffect(() => {
    if (selectedChat && !messagesLoad) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    }
  }, [selectedChat, messagesLoad])

  const messagesList = messages.map((message: MessageInterface) => (
    <Message key={message._id} message={message} />
  ))

  if (loading) {
    return <Loader size={100} />
  }

  console.log(listOfChats)

  const selectChatChip = (
    <AppChip labelSx={styles.chipLabel} sx={styles.chip}>
      {t('chatPage.chat.chipLabel')}
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
          <Box sx={styles.chatContent(selectedChat)}>
            {!selectedChat ? (
              selectChatChip
            ) : (
              <>
                <ChatHeader
                  onClick={openChatsHandler}
                  user={selectedChat.members[0].user}
                />
                {messagesLoad ? (
                  <Loader pageLoad size={50} sx={styles.loader} />
                ) : (
                  <SimpleBar
                    scrollableNodeProps={{ ref: scrollRef }}
                    style={styles.scrollableContent}
                  >
                    <ChatDate date={new Date()} />
                    {messagesList}
                  </SimpleBar>
                )}
                <ChatTextArea
                  label={t('chatPage.chat.inputLabel')}
                  onChange={onTextAreaChange}
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
