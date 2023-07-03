import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppCard from '~/components/app-card/AppCard'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'

import { MessageInterface } from '~/types/chat/message/message.interface'
import { styles } from '~/components/message/Message.styles'

interface MessageProps {
  message: MessageInterface
}

const Message: FC<MessageProps> = ({ message }) => {
  const { author, messageContent } = message
  const { _id, role, firstName, lastName, photo, createdAt } = author

  return (
    <Box sx={styles.root}>
      <UserProfileInfo
        _id={_id}
        date={createdAt}
        firstName={firstName}
        lastName={lastName}
        photo={photo}
        role={role}
        sx={styles.userInfoStyles}
      />
      <AppCard sx={styles.messageContent}>
        <Typography sx={styles.typography}>{messageContent}</Typography>
      </AppCard>
    </Box>
  )
}

export default Message
