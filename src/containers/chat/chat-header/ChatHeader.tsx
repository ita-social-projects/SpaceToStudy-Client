import { FC, MouseEvent, useState } from 'react'
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

import { styles } from '~/containers/chat/chat-header/ChatHeader.styles'
import { UserResponse } from '~/types'

interface ChatHeaderProps {
  onClick: () => void
  onMenuClick: (e: MouseEvent<HTMLButtonElement>) => void
  user: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
  messages: { text: string }[]
  onFilteredMessagesChange: (filteredMessages: string[]) => void
  onFilteredIndexChange: (filteredIndex: number) => void
}

const ChatHeader: FC<ChatHeaderProps> = ({
  onClick,
  user,
  onMenuClick,
  messages,
  onFilteredMessagesChange,
  onFilteredIndexChange
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }
  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsSearchOpen(!isSearchOpen)
  }

  const iconButtons = [
    { _id: 1, icon: <SearchIcon />, handleOnClick: handleSearch },
    { _id: 2, icon: <MoreVertIcon />, handleOnClick }
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
      <Box sx={styles.actions}>{icons}</Box>
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
