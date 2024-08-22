import { FC, MouseEvent, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/material'

import AppCard from '~/components/app-card/AppCard'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import { useAppSelector } from '~/hooks/use-redux'

import {
  createUrlPath,
  getFormattedDate,
  spliceSx
} from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/message/Message.styles'
import { MessageInterface } from '~/types'

interface MessageProps {
  message: MessageInterface
  prevMessage: MessageInterface | null
  sx?: {
    avatar?: SxProps
  }
  filteredMessages?: string[]
  filteredIndex: number
}

const Message: FC<MessageProps> = ({
  message,
  prevMessage,
  sx = {},
  filteredMessages = [],
  filteredIndex
}) => {
  const { userId: myId } = useAppSelector((state) => state.appMain)
  const { author, text, authorRole, createdAt } = message
  const { _id, photo, firstName, lastName } = author
  const { path } = authRoutes.userProfile
  const isMyMessage = myId === _id
  const isSameAuthor = prevMessage?.author._id === _id
  const pathToProfile = createUrlPath(path, _id, { authorRole })
  const timeDifference = prevMessage
    ? new Date(createdAt).getTime() - new Date(prevMessage.createdAt).getTime()
    : Infinity

  const isAvatarVisible =
    !isSameAuthor || (isSameAuthor && timeDifference > 600000)

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  const messageRef = useRef<HTMLDivElement>(null)
  const isTextFiltered = filteredMessages.some(
    (filteredMessage) => filteredMessage.toLowerCase() === text.toLowerCase()
  )
  useEffect(() => {
    if (filteredIndex >= 0 && filteredIndex < filteredMessages.length) {
      const messageToScrollTo = filteredMessages[filteredIndex]

      if (messageToScrollTo === text) {
        messageRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }
  }, [filteredIndex, filteredMessages, text])

  const date = getFormattedDate({
    date: createdAt,
    options: { hour: '2-digit', minute: '2-digit' }
  })
  const avatar = !isMyMessage && isAvatarVisible && (
    <Link onClick={handleLinkClick} to={pathToProfile}>
      <AvatarIcon
        firstName={firstName}
        lastName={lastName}
        photo={
          photo && createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, photo)
        }
        sx={spliceSx(styles.avatar, sx.avatar)}
      />
    </Link>
  )
  return (
    <Box ref={messageRef} sx={styles.root(isMyMessage, isAvatarVisible)}>
      {avatar}
      <AppCard
        sx={spliceSx(
          styles.message(isMyMessage),
          styles.findMessageCard(isMyMessage, isTextFiltered)
        )}
      >
        {text}
        <Typography sx={styles.date(isMyMessage)}>{date}</Typography>
      </AppCard>
    </Box>
  )
}

export default Message
