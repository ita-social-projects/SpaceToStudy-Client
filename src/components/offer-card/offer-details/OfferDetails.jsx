import { t } from 'i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LanguageIcon from '@mui/icons-material/Language'

import AppChip from '~/components/app-chip/AppChip'

import { styles } from '~/components/offer-card/offer-details/OfferDetails.styles'

const OfferDetails = ({
  name,
  bio,
  subject,
  level,
  description,
  languages
}) => {
  const lastLevel = level[level.length - 1]
  const levelText =
    level === 'Beginner'
      ? t('common.beginner')
      : `${t('common.beginner')} - ${lastLevel}`.toUpperCase()

  return (
    <Box sx={styles.container}>
      <Typography variant='h6'>{name}</Typography>
      <Typography sx={styles.bio}>{bio}</Typography>

      <Box sx={styles.chipsContainer}>
        <AppChip labelSx={styles.subjectChipLabel} sx={styles.subjectChip}>
          {subject.toUpperCase()}
        </AppChip>

        <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip}>
          {levelText}
        </AppChip>
      </Box>

      <Typography sx={styles.description} variant='body2'>
        {description}
      </Typography>
      <Box sx={styles.languagesContainer}>
        <LanguageIcon sx={styles.languageIcon} />
        <Typography sx={styles.languages} variant='body2'>
          {languages.join(', ')}
        </Typography>
      </Box>
    </Box>
  )
}

export default OfferDetails
