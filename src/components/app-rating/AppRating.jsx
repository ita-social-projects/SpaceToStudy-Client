import { useTranslation } from 'react-i18next'
import StarSharp from '@mui/icons-material/StarSharp'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/app-rating/AppRating.styles'

const starsSize = { small: 'body2', medium: 'body1', large: 'h6' }

const AppRating = ({ value = '', numberVariant , size = 'small', withBackground, mobile, reviews, spacing = 1, ...props }) => {
  const { t } = useTranslation()

  const optionalStyles = {
    backgroundColor: withBackground && 'primary.50',
    flexDirection: numberVariant === 'big' && 'column'
  }

  const smallnumberVariant = numberVariant === 'small' && (
    <Typography sx={ styles.smallNumber } variant={ 'caption' }>
      { value }
    </Typography>
  )

  const bigNumberVariant = numberVariant === 'big' && ( 
    <Box data-testid='big-number-box' sx={ styles.bigNumber }>
      { mobile && <StarSharp data-testid='star-icon' sx={ styles.starMobile } /> }
      <Typography variant={ mobile ? 'h6' : 'h4' }  >
        { value }
      </Typography>
    </Box>
  ) 

  return (
    <Box sx={ [styles.root, optionalStyles] }>
      { bigNumberVariant }
      { !(numberVariant && mobile) && (
        <Rating
          emptyIcon={ <StarSharp fontSize='inherit' style={ styles.emptyIcon } /> }
          name='feedback'
          precision={ 1 }
          sx={ { typography: starsSize[size],
            '& .MuiRating-icon': {
              mx: `${spacing}px`
            } } }
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
