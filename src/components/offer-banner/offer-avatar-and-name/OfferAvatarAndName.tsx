import Box from '@mui/material/Box'
import { styles } from '~/components/offer-banner/offer-avatar-and-name/OfferAvatarAndName.styles'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

import { FC } from 'react'

interface OfferAvatarAndNameProps {
  imgSrc?: string
  authorFirstName: string
  authorLastName: string
}

const OfferAvatarAndName: FC<OfferAvatarAndNameProps> = ({
  imgSrc,
  authorFirstName,
  authorLastName
}) => {
  return (
    <Box sx={styles.main}>
      <Avatar src={imgSrc} />
      <Typography sx={{ padding: '12px' }} variant='h6'>
        {`${authorFirstName} ${authorLastName}`}
      </Typography>
    </Box>
  )
}

export default OfferAvatarAndName
