import { t } from 'i18next'

import Rating from '@mui/material/Rating'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LanguageIcon from '@mui/icons-material/Language'
import IconButton from '@mui/material/IconButton'
import TurnedIn from '@mui/icons-material/TurnedIn'
import TurnedInNot from '@mui/icons-material/TurnedInNot'

import AppButton from '~/components/app-button/AppButton'
import AppChip from '~/components/app-chip/AppChip'

import { styles } from '~/components/offer-card/OfferCard.styles'

const OfferCard = ({
  imgSrc,
  rating,
  name,
  bio,
  description,
  languages,
  price,
  isBookmarked,
  subject,
  level
}) => {
  return (
    <Box sx={ styles.container }>
      <Box sx={ styles.leftContainer }>
        <Avatar src={ imgSrc } sx={ styles.avatar } />
        <Box sx={ styles.ratingContainer }>
          <Rating defaultValue={ Math.round(rating) } readOnly sx={ styles.rating } />
          <Typography>{ rating }</Typography>
        </Box>
      </Box>

      <Box sx={ styles.middleContainer }>
        <Typography variant='h6'>{ name }</Typography>
        <Typography sx={ styles.bio }>{ bio }</Typography>

        <Box sx={ styles.chipsContainer }>
          <AppChip
            style={ styles.subjectChip }
            labelStyle={ styles.subjectChipLabel }
          >
              { subject.toUpperCase() }
          </AppChip>

          <AppChip
            style={ styles.levelChip }
            labelStyle={ styles.levelChipLabel }
          >
              { `${t('common.beginner')} - ${level}`.toUpperCase() }
          </AppChip>
        </Box>
        
        <Typography variant='body2' sx={ styles.description }>{ description }</Typography>
        <Box sx={ styles.languagesContainer }>
          <LanguageIcon sx={ styles.languageIcon } />
          <Typography variant='body2' sx={ styles.languages }>{ languages.join(', ') }</Typography>
        </Box>
      </Box>

      <Box sx={ styles.rightContainer }>
        <Box sx={ styles.rightContainerTop }>
          <Box>
            <Typography variant='h6'>{ price } { t('common.uah') }</Typography>
            <Typography variant='body2'>/{ t('common.hour') }</Typography>
          </Box>
          
          <IconButton sx={ styles.bookmarkButton }>
            {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
          </IconButton>
        </Box>
        
        <AppButton
          size='large'
          sx={ styles.sendMessageButton }
          variant='contained'
        >
          { t('common.labels.sendMessage') }
        </AppButton>
        <AppButton
          size='large'
          variant='contained'
          sx={styles.viewDetailsButton}
        >
          { t('common.labels.viewDetails') }
        </AppButton>
      </Box>
    </Box>
  )
}

export default OfferCard
