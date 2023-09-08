import { FC, MouseEvent } from 'react'
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

import { styles } from '~/containers/chat/chat-header/ChatHeader.styles'
import { UserResponse } from '~/types'

interface ChatHeaderProps {
  onClick: () => void
  onMenuClick: (e: MouseEvent<HTMLButtonElement>) => void
  user: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
}

const ChatHeader: FC<ChatHeaderProps> = ({ onClick, onMenuClick, user }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  const iconButtons = [
    { _id: 1, icon: <SearchIcon />, handleOnClick },
    { _id: 2, icon: <MoreVertIcon />, handleOnClick }
  ]

  const icons = iconButtons.map(({ _id, icon, handleOnClick }) => (
    <IconButton key={_id} onClick={handleOnClick} sx={styles.icon}>
      {icon}
    </IconButton>
  ))

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
    </AppCard>
  )
}

export default ChatHeader
