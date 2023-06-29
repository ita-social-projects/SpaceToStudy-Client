import { FC } from 'react'
import { UserInterface } from '~/types'
import { Box, Avatar, IconButton, Typography } from '@mui/material'
import { Favorite, Flag, MoreHoriz } from '@mui/icons-material'
import { styles } from '~/components/message/Message.styles'

import { spliceSx } from '~/utils/helper-functions'

interface MessageProps {
  user: UserInterface
  timestamp?: Date | string
  messageContent: string
}

const Message: FC<MessageProps> = ({ user, timestamp, messageContent }) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.messageBox}>
        <Avatar src={user.photo} sx={styles.avatar} />
        <Box sx={styles.content}>
          <Box style={styles.head}>
            <Typography sx={spliceSx(styles.typography, styles.name)}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography sx={spliceSx(styles.typography, styles.timestamp)}>
              {timestamp}
            </Typography>
          </Box>
          <Box sx={styles.messageContent}>
            <Typography sx={spliceSx(styles.typography, styles.name)}>
              {messageContent}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <IconButton>
          <Favorite sx={styles.icon} />
        </IconButton>
        <IconButton>
          <Flag sx={styles.icon} />
        </IconButton>
        <IconButton>
          <MoreHoriz sx={styles.icon} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Message
