import StarSharp from '@mui/icons-material/StarSharp'
import Rating from '@mui/material/Rating'

import { Box, Typography } from '@mui/material'
import { styles } from '~/components/app-rating/AppRating.styles'

const AppRating = ({
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
