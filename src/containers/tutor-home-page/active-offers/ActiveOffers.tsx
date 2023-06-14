import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'

import { styles } from '~/containers/tutor-home-page/active-offers/ActiveOffers.styles'

// interface ActiveOffersProps

const ActiveOffers: FC = () => {
  return (
    <Box>
      <Typography sx={styles.title}>Your active offers:</Typography>
      <Button> Add +</Button>
    </Box>
  )
}

export default ActiveOffers
