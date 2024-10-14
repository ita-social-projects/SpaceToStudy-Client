import Box from '@mui/material/Box'
import Lottie from 'lottie-react'

import { styles } from '~/components/typing-block/TypingBlock.styles'

import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import { createUrlPath } from '~/utils/helper-functions'
import { Member } from '~/types'
import typingAnimation from '~/assets/lottiefiles/typingAnimation.json'

interface TypingBlockProps {
  userToSpeak: Member
}

const TypingBlock = ({ userToSpeak }: TypingBlockProps) => {
  return (
    <Box sx={styles.wrapper}>
      <AvatarIcon
        firstName={userToSpeak.user.firstName}
        lastName={userToSpeak.user.lastName}
        photo={
          userToSpeak.user.photo &&
          createUrlPath(
            import.meta.env.VITE_APP_IMG_USER_URL,
            userToSpeak.user.photo
          )
        }
        sx={styles.avatar}
      />
      <Lottie
        animationData={typingAnimation}
        loop
        style={styles.typingAnimation}
      />
    </Box>
  )
}

export default TypingBlock
