import {
  FC,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
  Dispatch
} from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import useBreakpoints from '~/hooks/use-breakpoints'
import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SearchByMessage from '~/components/search-by-message/SearchByMessage'
import ChatMenu from '~/containers/layout/chat-menu/ChatMenu'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { styles } from '~/containers/chat/chat-header/ChatHeader.styles'
import {
  ChatResponse,
  GetMessagesResponse,
  MessageInterface,
  UserResponse
} from '~/types'
import { useAppSelector } from '~/hooks/use-redux'
import { selectIsUserOnline } from '~/redux/selectors/socket-selectors'
import useAxios from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { messageService } from '~/services/message-service'

interface ChatHeaderProps {
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void
  onMenuClick: (e: MouseEvent<HTMLButtonElement>) => void
  updateChats: () => Promise<void>
  updateMessages: () => Promise<void>
  currentChat: ChatResponse
  user: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
  messages: { text: string }[]
  onFilteredMessagesChange: (filteredMessages: string[]) => void
  onFilteredIndexChange: (filteredIndex: number) => void
  setLimit: Dispatch<SetStateAction<number>>
}

const ChatHeader: FC<ChatHeaderProps> = ({
  onClick,
  user,
  updateChats,
  updateMessages,
  onMenuClick,
  currentChat,
  messages,
  onFilteredMessagesChange,
  onFilteredIndexChange,
  setLimit
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const [allMessages, setAllMessages] = useState<MessageInterface[]>([])
  const [isHistoryCleared, setIsHistoryCleared] = useState(false)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const isOnline = useAppSelector(selectIsUserOnline(user._id))

  const openMenu = () => setMenuAnchorEl(anchorRef.current)
  const closeMenu = () => setMenuAnchorEl(null)

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsSearchOpen(!isSearchOpen)
  }

  const getAllMessages = useCallback(
    () =>
      messageService.getMessages({
        chatId: currentChat._id,
        limit: Number.MAX_SAFE_INTEGER,
        skip: 0
      }),
    [currentChat._id]
  )

  const onAllMessagesResponse = useCallback(
    (response: GetMessagesResponse) => {
      const items = response.items ?? []
      setAllMessages(items)
    },
    [setAllMessages]
  )

  const { fetchData } = useAxios({
    service: getAllMessages,
    onResponse: onAllMessagesResponse,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: false
  })

  useEffect(() => {
    void fetchData()
  }, [fetchData])

  const status = isOnline ? (
    <>
      <Typography sx={styles.statusBadge} />
      <Typography>{t('chatPage.status.online')}</Typography>
    </>
  ) : (
    <Typography>{t('chatPage.status.offline')}</Typography>
  )

  return (
    <AppCard onClick={onClick} sx={styles.container}>
      <ChatMenu
        anchorEl={menuAnchorEl}
        currentChat={currentChat}
        isHistoryCleared={isHistoryCleared}
        messagesLength={messages.length}
        onClose={closeMenu}
        setIsHistoryCleared={setIsHistoryCleared}
        updateChats={updateChats}
        updateMessages={updateMessages}
      />
      {isMobile && (
        <IconButton onClick={onMenuClick} sx={styles.menuIconBtn}>
          <MenuIcon />
        </IconButton>
      )}
      <TitleWithDescription
        description={status}
        style={styles.titleWithDescription}
        title={`${user.firstName} ${user.lastName}`}
      />
      <Box ref={anchorRef} sx={styles.actions}>
        <IconButton onClick={handleSearch} sx={styles.icon}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={openMenu} sx={styles.icon}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      {isSearchOpen && (
        <Box sx={styles.searchContainer}>
          <SearchByMessage
            allMessages={allMessages}
            isCloseSearch={() => setIsSearchOpen(false)}
            onFilteredIndexChange={onFilteredIndexChange}
            onFilteredMessagesChange={onFilteredMessagesChange}
            setLimit={setLimit}
          />
        </Box>
      )}
    </AppCard>
  )
}

export default ChatHeader
