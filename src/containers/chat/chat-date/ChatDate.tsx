import { FC } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { styles } from '~/containers/chat/chat-date/ChatDate.styles'
import { getFormattedDate } from '~/utils/helper-functions'

interface ChatDateProps {
  date: string
}

const ChatDate: FC<ChatDateProps> = ({ date }) => {
  return (
    <Box sx={styles.container}>
      <Divider sx={styles.divider}>
        <Typography sx={styles.date}>{getFormattedDate({ date })}</Typography>
      </Divider>
    </Box>
  )
}

export default ChatDate
