import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '~/hooks/use-redux'

import { styles } from '~/containers/chat/chat-item/ChatItem.styles'
import { ChatResponse, ComponentEnum } from '~/types'
import { getFormattedDate } from '~/utils/helper-functions'

interface ItemOfChatProps {
  isActiveChat: boolean
  chat: ChatResponse
  setSelectedChat: (chat: ChatResponse) => void
  closeDrawer?: () => void
}

const ChatItem: FC<ItemOfChatProps> = ({
  isActiveChat,
  chat,
  setSelectedChat,
  closeDrawer
}) => {
  const { t } = useTranslation()
  const { userId } = useAppSelector((state) => state.appMain)

  const { firstName, lastName, photo } = chat.members[0].user
  const { text, author, updatedAt } = chat.latestMessage

  const fullName = `${firstName} ${lastName}`

  const handleSelectedChat = () => {
    setSelectedChat(chat)
    closeDrawer && closeDrawer()
  }

  const formattedTime = getFormattedDate({
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
    <Typography sx={styles.prefix}>{t('chat.message.you')}:</Typography>
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
