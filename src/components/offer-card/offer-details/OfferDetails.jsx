import { t } from 'i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LanguageIcon from '@mui/icons-material/Language'

import AppChip from '~/components/app-chip/AppChip'

import { styles } from '~/components/offer-card/offer-details/OfferDetails.styles'

const OfferDetails = ({ name, bio, subject, level, description, languages }) => {
  const levelText = level === 'Beginner' ? t('common.beginner') : `${t('common.beginner')} - ${level}`.toUpperCase()

  return (
    <Box sx={ styles.container }>
      <Typography variant='h6'>{ name }</Typography>
      <Typography sx={ styles.bio }>{ bio }</Typography>

      <Box sx={ styles.chipsContainer }>
        <AppChip
          sx={ styles.subjectChip }
          labelSx={ styles.subjectChipLabel }
        >
          { subject.toUpperCase() }
        </AppChip>

        <AppChip
          sx={ styles.levelChip }
          labelSx={ styles.levelChipLabel }
        >
          { levelText }
        </AppChip>
      </Box>
        
      <Typography variant='body2' sx={ styles.description }>{ description }</Typography>
      <Box sx={ styles.languagesContainer }>
        <LanguageIcon sx={ styles.languageIcon } />
        <Typography variant='body2' sx={ styles.languages }>{ languages.join(', ') }</Typography>
      </Box>
    </Box>
  )
}

export default OfferDetails
