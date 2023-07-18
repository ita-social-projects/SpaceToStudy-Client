import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '~/hooks/use-redux'

import { styles } from '~/containers/chat/chat-item/ChatItem.styles'
import { ComponentEnum, LatestMessage, UserResponse } from '~/types'
import { getFormatedDate, spliceSx } from '~/utils/helper-functions'

interface ItemOfChatProps {
  user: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
  lastMessage: LatestMessage
  isSelectedChat: string
  setIsSelectedChat: (id: string) => void
}

const ChatItem: FC<ItemOfChatProps> = ({
  user,
  lastMessage,
  isSelectedChat,
  setIsSelectedChat
}) => {
  const { t } = useTranslation()
  const { userId } = useAppSelector((state) => state.appMain)

  const { firstName, lastName, photo } = user
  const { text, chat, author, updatedAt } = lastMessage

  const fullName = `${firstName} ${lastName}`

  const handleSelectedChat = () => {
    setIsSelectedChat(chat)
  }

  const formattedTime = getFormatedDate(
    updatedAt,
    'en-GB',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    },
    true
  )

  return (
    <Box
      onClick={handleSelectedChat}
      sx={spliceSx(
        styles.root,
        isSelectedChat === chat ? styles.activeChat : undefined
      )}
    >
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
          {userId === author._id && (
            <Typography sx={styles.prefix}>
              {t('chatPage.yourMessage')}
            </Typography>
          )}
          <Typography sx={styles.message}>{text}</Typography>

          <Box>
            <Typography sx={styles.amountOfmessages}>{3}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatItem
