import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '~/hooks/use-redux'

import { styles } from '~/containers/chat/chat-item/ChatItem.styles'
import { ComponentEnum, LatestMessage, UserResponse } from '~/types'
import { getFormatedDate } from '~/utils/helper-functions'

interface ItemOfChatProps {
  user: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
  lastMessage: LatestMessage
  isActiveChat: boolean
  setIsSelectedChat: (id: string) => void
  closeDrawer?: () => void
}

const ChatItem: FC<ItemOfChatProps> = ({
  user,
  lastMessage,
  isActiveChat,
  setIsSelectedChat,
  closeDrawer
}) => {
  const { t } = useTranslation()
  const { userId } = useAppSelector((state) => state.appMain)

  const { firstName, lastName, photo } = user
  const { text, chat, author, updatedAt } = lastMessage

  const fullName = `${firstName} ${lastName}`

  const handleSelectedChat = () => {
    setIsSelectedChat(chat)
    closeDrawer && closeDrawer()
  }

  const formattedTime = getFormatedDate({
    date: updatedAt,
    locales: 'en-GB',
    options: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    },
    isCurrentDayHours: true
  })

  const isCurrentUser = userId === author._id && (
    <Typography sx={styles.prefix}>{t('chatPage.message.you')}:</Typography>
  )

  return (
    <Box onClick={handleSelectedChat} sx={styles.root(isActiveChat)}>
      <Box sx={styles.imageWrapper}>
        <Avatar
          src={photo && `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`}
          sx={styles.img}
        />
        <Typography component={ComponentEnum.Span} sx={styles.active} />
      </Box>
      <Box sx={styles.mainInformation}>
        <Box sx={styles.nameWithTime}>
          <Typography sx={styles.fullName}>{fullName}</Typography>
          <Typography sx={styles.lastTimeMessage}>{formattedTime}</Typography>
        </Box>
        <Box sx={styles.messageBlock}>
          {isCurrentUser}
          <Typography sx={styles.message}>{text}</Typography>

          <Box>
            <Typography sx={styles.amountOfmessages}>{3}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(ChatItem)
