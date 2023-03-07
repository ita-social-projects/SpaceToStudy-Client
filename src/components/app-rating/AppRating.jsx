import StarSharp from '@mui/icons-material/StarSharp'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/app-rating/AppRating.styles'

const numberVariant = { small: 'body2', medium: 'body1', large: 'h6' }

const AppRating = ({ value = '', smallNumber, bigNumber, size = 'small', withBackground, mobile, reviews,spacing = '1px', ...props }) => {
  const optionalStyles = {
    backgroundColor: withBackground && 'primary.50',
    flexDirection: bigNumber && 'column'
  }

  return (
    <Box sx={ { ...styles.root, ...optionalStyles } }>
      { bigNumber && ( 
        <Box sx={ styles.bigNumber }>
          { mobile && <StarSharp sx={ styles.starMobile } /> }
          <Typography variant={ mobile ? 'h6' : 'h4' }  >
            { value }
          </Typography>
        </Box>
      ) }
      { !mobile && (
        <Rating
          emptyIcon={ <StarSharp fontSize='inherit' style={ styles.emptyIcon } /> }
          name='feedback'
          precision={ 1 }
          size={ size }
          sx={ { typography: numberVariant[size],
            '& .MuiRating-icon': {
              mx: spacing
            } } }
          value={ value }
          { ...props }
        />) }
      { smallNumber && (
        <Typography sx={ styles.smallNumber } variant={ 'caption' }>
          { value }
        </Typography>
      ) }
      { reviews && (
        <Typography variant={ mobile ? 'caption' : 'body1' }>
          { `${reviews} rewievs` }
        </Typography>
      ) }
    </Box>
  )
}

export default AppRating
