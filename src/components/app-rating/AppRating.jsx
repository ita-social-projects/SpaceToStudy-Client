import { useTranslation } from 'react-i18next'
import StarSharp from '@mui/icons-material/StarSharp'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/app-rating/AppRating.styles'

const AppRating = ({ value = '', sx={}, numberVariant, mobile, reviews, ...props }) => {
  const { t } = useTranslation()
  const bigNumber = numberVariant === 'big'
  const smallNumber = numberVariant === 'small'

  const optionalStyles = {
    flexDirection: bigNumber && 'column'
  }

  const smallnumberVariant = smallNumber && (
    <Typography sx={ styles.smallNumber } variant={ 'caption' }>
      { value }
    </Typography>
  )

  const bigNumberVariant = bigNumber && ( 
    <Box data-testid='big-number-box' sx={ styles.bigNumber }>
      { mobile && <StarSharp data-testid='star-icon' sx={ styles.starMobile } /> }
      <Typography variant={ mobile ? 'h6' : 'h4' }  >
        { value }
      </Typography>
    </Box>
  ) 

  return (
    <Box sx={ [styles.root, optionalStyles, sx.root] }>
      { bigNumberVariant }
      { !(bigNumber  && mobile) && (
        <Rating
          emptyIcon={ <StarSharp fontSize='inherit' style={ styles.emptyIcon } /> }
          name='feedback'
          sx={ [styles.stars, sx.stars] }
          value={ value }
          { ...props }
        />) }
      { smallnumberVariant  }
      { reviews > 0 && (
        <Typography variant={ mobile ? 'caption' : 'body1' }>
          { t('tutorProfilePage.reviews.reviewsCount',{ count: reviews }) }
        </Typography>
      ) }
    </Box>
  )
}

export default AppRating
