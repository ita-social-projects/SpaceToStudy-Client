import { FC } from 'react'
import Rating, { RatingProps } from '@mui/material/Rating'
import StarSharp from '@mui/icons-material/StarSharp'

import { styles } from '~/components/app-rating/AppRating.styles'
import { Box, Typography } from '@mui/material'

interface AppRatingProps extends RatingProps {
  showNumber?: boolean
  precision?: number
}

const AppRating: FC<AppRatingProps> = ({
  value,
  sx,
  showNumber = false,
  precision = 0.1,
  ...props
}) => {
  const combinedStyles = { ...styles.root, ...sx }

  const withNumber = showNumber && (
    <Typography sx={styles.number} variant={'caption'}>
      {value}
    </Typography>
  )

  return (
    <Box data-testid='app-rating' sx={combinedStyles}>
      <Rating
        emptyIcon={<StarSharp fontSize='inherit' sx={styles.emptyIcon} />}
        precision={precision}
        sx={styles.stars}
        value={value}
        {...props}
      />
      {withNumber}
    </Box>
  )
}

export default AppRating
