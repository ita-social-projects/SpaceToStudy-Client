import { FC, MouseEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import useBreakpoints from '~/hooks/use-breakpoints'
import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SearchByMessage from '~/components/search-by-message/SearchByMessage'
import ChatMenu from '~/containers/layout/chat-menu/ChatMenu'

import { styles } from '~/containers/chat/chat-header/ChatHeader.styles'
import { ChatResponse, UserResponse } from '~/types'

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
  onFilteredIndexChange
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const openMenu = () => setMenuAnchorEl(anchorRef.current)
  const closeMenu = () => setMenuAnchorEl(null)

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsSearchOpen(!isSearchOpen)
  }

  const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    openMenu()
  }

  const iconButtons = [
    { _id: 1, icon: <SearchIcon />, handleOnClick: handleSearch },
    { _id: 2, icon: <MoreVertIcon />, handleOnClick: handleMenu }
  ]

  const icons = iconButtons.map(({ _id, icon, handleOnClick }) => (
    <IconButton key={_id} onClick={handleOnClick} sx={styles.icon}>
      {icon}
    </IconButton>
  ))

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  const status = (
    <>
      <Typography sx={styles.statusBadge} />
      <Typography>{t('chatPage.status.online')}</Typography>
    </>
  )

  return (
    <AppCard onClick={onClick} sx={styles.container}>
      <ChatMenu
        anchorEl={menuAnchorEl}
        currentChat={currentChat}
        messagesLength={messages.length}
        onClose={closeMenu}
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
        {icons}
      </Box>
      {isSearchOpen && (
        <Box sx={styles.searchContainer}>
          <SearchByMessage
            isCloseSearch={closeSearch}
            messages={messages}
            onFilteredIndexChange={onFilteredIndexChange}
            onFilteredMessagesChange={onFilteredMessagesChange}
          />
        </Box>
      )}
    </AppCard>
  )
}

export default ChatHeader
