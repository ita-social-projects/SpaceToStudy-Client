import { Box, LinearProgress, Typography } from '@mui/material'
import AppRating from '~/components/app-rating/AppRating'
import { styles } from '~/containers/tutor-profile/coments-block/rating-block/RatingBlock.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

const RatingBlock = ({ setFilter, averageRating, reviewsAmount, ratings, activeFilter }) => {
  const { isMobile } = useBreakpoints()
  const resetFilters = () => setFilter(null)
  const rating = ratings.reduce((acc,{ count, rating })=>{
    acc[rating] = count
    return acc
  },Array(6).fill(0))
  

  const starProgresBars = rating.map((star, idx) => {
    const starPercent = (star  / reviewsAmount) * 100
    const active = !activeFilter || activeFilter === idx
    const handleProgresBarClick = () => star && setFilter(idx)
    const optionalStyles = {
      opacity : active ? 1 : '0.5',
      cursor: star ? 'pointer' : 'default'
    }
    
    return idx > 0 && (
      <Box key={ idx } onClick={ handleProgresBarClick } sx={ { ...styles.progressBar,...optionalStyles } }>
        <Typography sx={ { typography:{ xs:'caption',sm: 'body2',md:'body1' } } }>
          { `${idx} stars` }
        </Typography>
        <LinearProgress
          sx={ styles.linearProgress }
          value={ starPercent }
          variant='determinate'
        />
        <Typography sx={ { typography:{ xs:'caption',sm: 'body2',md:'body1' } } }>
          { star }
        </Typography>
      </Box>
    )
  }).reverse()

  return (
    <Box
      sx={ styles.root }
    >
      <Box>
        <AppRating
          bigNumber mobile={ isMobile } 
          readOnly
          reviews={ reviewsAmount }
          value={ averageRating }
        />
      </Box>
      <Box sx={ { position:'relative' } }>
        { starProgresBars }
        { activeFilter && (
          <Typography onClick={ resetFilters }sx={ { position:'absolute', left:0, typography:{ xs:'caption',sm: 'subtitle2',md:'button' },cursor:'pointer',fontWeight:{ xs:500 },color:'primary.600' } }> 
            See all reviews
          </Typography>
        )  }
      </Box>
    </Box>
  )
}

export default RatingBlock
