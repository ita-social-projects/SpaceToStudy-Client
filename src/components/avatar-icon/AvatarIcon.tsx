import { FC } from 'react'
import UserAvatar from '~/design-system/components/user-avatar/UserAvatar'
import { SxProps } from '@mui/system'
import { getInitials, spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/avatar-icon/AvatarIcon.styles'

interface AvatarIconProps {
  firstName: string
  lastName: string
  photo?: string | null
  sx?: SxProps
}

const AvatarIcon: FC<AvatarIconProps> = ({
  firstName,
  lastName,
  photo,
  sx
}) => {
  return (
    <UserAvatar
      firstName={firstName}
      lastName={lastName}
      size='profile-lg'
      src={photo ?? ''}
      sx={spliceSx(styles.avatar, sx)}
      variant='photo'
    >
      {getInitials(firstName, lastName)}
    </UserAvatar>
  )
}

export default AvatarIcon
