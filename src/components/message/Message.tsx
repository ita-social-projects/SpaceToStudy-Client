import { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

import AppCard from '~/components/app-card/AppCard'
import { useAppSelector } from '~/hooks/use-redux'

import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/components/message/Message.styles'
import { MessageInterface } from '~/types'

interface MessageProps {
  message: MessageInterface
}

const Message: FC<MessageProps> = ({ message }) => {
  const { userId: myId } = useAppSelector((state) => state.appMain)

  const { author, text, authorRole, createdAt } = message
  const { _id, photo } = author
  const isMyMessage = myId === _id
  const userURL = createUrlPath(authRoutes.userProfile.path, _id, {
    authorRole
  })

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  const date = getFormattedDate({
    date: createdAt,
    options: { hour: '2-digit', minute: '2-digit' }
  })

  const avatar = !isMyMessage && (
    <Link onClick={handleLinkClick} to={userURL}>
      <Avatar
        src={photo && `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`}
        sx={styles.avatar}
      />
    </Link>
  )

  return (
    <Box sx={styles.root(isMyMessage)}>
      {avatar}
      <AppCard sx={styles.messageCard(isMyMessage)}>
        {text}
        <Typography sx={styles.date(isMyMessage)}>{date}</Typography>
      </AppCard>
    </Box>
  )
}

export default Message
