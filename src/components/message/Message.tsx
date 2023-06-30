import { FC } from 'react'
import { Box, Typography } from '@mui/material'

import AppCard from '~/components/app-card/AppCard'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'

import { MessageInterface } from '~/types'
import { styles } from '~/components/message/Message.styles'

interface MessageProps {
  message: MessageInterface
}

const Message: FC<MessageProps> = ({ message }) => {
  const { author, authorRole, messageContent, timestamp } = message
  const { _id, firstName, lastName, photo } = author

  return (
    <Box sx={styles.root}>
      <UserProfileInfo
        _id={_id}
        date={timestamp.toString()}
        firstName={firstName}
        lastName={lastName}
        photo={photo}
        role={authorRole}
        sx={styles.userInfoStyles}
      />
      <AppCard sx={styles.messageContent}>
        <Typography sx={styles.typography}>{messageContent}</Typography>
      </AppCard>
    </Box>
  )
}

export default Message
