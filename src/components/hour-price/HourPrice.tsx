import { FC } from 'react'

import { t } from 'i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface HourRatePriceProps {
  price: number
}

const HourPrice: FC<HourRatePriceProps> = ({ price }) => {
  return (
    <Box>
      <Typography variant='h6'>
        { price }
        { t('common.uah') }
      </Typography>
      <Typography variant='caption'>
        /
        { t('common.hour') }
      </Typography>
    </Box>
  )
}
export default HourPrice
