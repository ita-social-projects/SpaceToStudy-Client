import { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { MessageInterface } from '~/types'
import { spliceSx } from '~/utils/helper-functions'

import AppCard from '~/components/app-card/AppCard'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import { useAppSelector } from '~/hooks/use-redux'

import { styles } from '~/components/message/Message.styles'

interface MessageProps {
  message: MessageInterface
}

const Message: FC<MessageProps> = ({ message }) => {
  const { userId: myId } = useAppSelector((state) => state.appMain)

  const { author, messageContent, authorRole } = message
  const { _id, firstName, lastName, photo, createdAt } = author

  const isMyMessage = myId == _id

  const messageRootStyles = isMyMessage
    ? styles.myMessageRoot
    : styles.interlocutorMessageRoot
  const messageBoxStyles = isMyMessage
    ? styles.myMessageBox
    : styles.interlocutorMessageBox

  return (
    <Box sx={spliceSx(styles.root, messageRootStyles)}>
      <UserProfileInfo
        _id={_id}
        date={createdAt}
        firstName={firstName}
        lastName={lastName}
        photo={photo}
        renderAdditionalInfo={!isMyMessage}
        role={authorRole}
        sx={styles.userInfoStyles}
      />
      <AppCard sx={spliceSx(styles.messageBox, messageBoxStyles)}>
        <Typography sx={styles.messageContent}>{messageContent}</Typography>
      </AppCard>
    </Box>
  )
}

export default Message
