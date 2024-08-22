import { FC } from 'react'
import Avatar from '@mui/material/Avatar'
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
    <Avatar
      alt='User Avatar'
      src={photo ?? ''}
      sx={spliceSx(styles.avatar, sx)}
    >
      {getInitials(firstName, lastName)}
    </Avatar>
  )
}

export default AvatarIcon
