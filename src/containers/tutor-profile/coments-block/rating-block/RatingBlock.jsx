import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import AppRating from '~/components/app-rating/AppRating'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/tutor-profile/coments-block/rating-block/RatingBlock.styles'
import { useTranslation } from 'react-i18next'

const RatingBlock = ({ setFilter, averageRating, totalReviews, reviewsCount, activeFilter }) => {
  const { isMobile } = useBreakpoints()
  const { t } = useTranslation()
  const ratings = reviewsCount.reduce((acc,{ count, rating }) => {
    acc[rating] = count
    return acc
  },Array(6).fill(0))

  const resetFilters = () => setFilter(null)
  
  const progresBars = ratings.map((rating, idx) => {
    const starPercent = (rating  / totalReviews) * 100
    const active = !activeFilter || activeFilter === idx
    const handleProgresBarClick = () => rating && setFilter(idx)
    const optionalStyles = {
      opacity : active ? 1 : '0.5',
      cursor: rating ? 'pointer' : 'default'
    }
    
    return idx > 0 && (
      <Box
        data-testid={ `progress-bar-${idx}` } key={ idx } onClick={ handleProgresBarClick }
        sx={ [styles.progressBar, optionalStyles] }
      >
        <Typography sx={ styles.typography }>
          { t('tutorProfilePage.reviews.starsCount', { count: idx }) }
        </Typography>
        <LinearProgress
          sx={ styles.linearProgress }
          value={ starPercent }
          variant='determinate'
        />
        <Typography sx={ styles.typography }>
          { rating }
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
          mobile={ isMobile } 
          numberVariant={ 'big' } 
          readOnly
          reviews={ totalReviews }
          sx={ styles.rating }
          value={ averageRating }
        />
      </Box>
      <Box sx={ styles.progressBarRoot }>
        { progresBars }
        { activeFilter && (
          <Typography data-testid='reset-filter' onClick={ resetFilters } sx={ styles.resetButton }> 
            { t('tutorProfilePage.reviews.buttonTitle') }
          </Typography>
        )  }
      </Box>
    </Box>
  )
}

export default RatingBlock
