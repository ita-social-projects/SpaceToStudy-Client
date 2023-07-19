import React, { FC } from 'react'
import Box from '@mui/system/Box'

import { UserResponse } from '~/types'
import { useTranslation } from 'react-i18next'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export interface ChatUserDetails
  extends Pick<UserResponse, 'photo' | 'firstName' | 'lastName' | '_id'> {
  media?: object
  files?: object
  links?: object
}

const ChatUserDetails: FC<ChatUserDetails> = ({
  photo,
  firstName,
  lastName,
  _id
}) => {
  const { t } = useTranslation()

  const name = `${firstName} ${lastName}`

  return (
    <Box>
      <Avatar
        src={photo && `${import.meta.env.VITE_APP_IMG_USER_URL}${photo}`}
      />
      <Typography>{name}</Typography>
      <Button>View Profile</Button>
    </Box>
  )
}

export default ChatUserDetails
