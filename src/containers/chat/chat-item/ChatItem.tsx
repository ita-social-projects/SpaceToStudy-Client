import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'

import AvatarIcon from '~/components/avatar-icon/AvatarIcon'

import { useAppSelector } from '~/hooks/use-redux'

import { styles } from '~/containers/chat/chat-item/ChatItem.styles'
import {
  ChatResponse,
  ComponentEnum,
  Member,
  OverlapEnum,
  PositionEnum
} from '~/types'
import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'

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
  const userToSpeak = useMemo<Member | undefined>(
    () => chat?.members.find((member) => member.user._id !== userId),
    [chat, userId]
  )

  const firstName = userToSpeak?.user.firstName
  const lastName = userToSpeak?.user.lastName
  const photo = userToSpeak?.user.photo
  const { text, author, updatedAt } = chat.latestMessage || {
    text: t('chatPage.message.noMessages'),
    author: '',
    updatedAt: ''
  }

  const fullName = `${firstName ?? ''} ${lastName ?? ''}`

  const handleSelectedChat = () => {
    setSelectedChat(chat)
    closeDrawer && closeDrawer()
  }

  const formattedTime =
    updatedAt &&
    getFormattedDate({
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
        <Badge
          anchorOrigin={{
            vertical: PositionEnum.Bottom,
            horizontal: PositionEnum.Right
          }}
          badgeContent={
            <Typography component={ComponentEnum.Span} sx={styles.active} />
          }
          overlap={OverlapEnum.Circular}
        >
          <AvatarIcon
            firstName={firstName ?? ''}
            lastName={lastName ?? ''}
            photo={
              photo &&
              createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, photo)
            }
            sx={styles.img}
          />
        </Badge>
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
