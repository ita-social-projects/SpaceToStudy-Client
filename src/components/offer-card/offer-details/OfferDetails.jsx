import { t } from 'i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

import AppChip from '~/components/app-chip/AppChip'

import { styles } from '~/components/offer-card/offer-details/OfferDetails.styles'

const OfferDetails = ({
  name,
  professionalSummary,
  subject,
  level,
  description,
  languages
}) => {
  const lastLevel = level.length > 1 ? level[level.length - 1] : level[0]
  const levelText =
    lastLevel === 'Beginner'
      ? t('common.beginner')
      : `${t('common.beginner')} - ${lastLevel}`.toUpperCase()

  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant='h6'>{name}</Typography>
      <Typography sx={styles.bio}>{professionalSummary}</Typography>

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
      <LanguagesListWithIcon languages={languages} />
    </Box>
  )
}

export default OfferDetails
