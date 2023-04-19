import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LanguageIcon from '@mui/icons-material/Language'
import IconButton from '@mui/material/IconButton'
import TurnedInNot from '@mui/icons-material/TurnedInNot'

import { t } from 'i18next'
import AppCard from '~/components/app-card/AppCard'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppChip from '../app-chip/AppChip'
import AppRatingMobile from '../app-rating-mobile/AppRatingMobile'
import AppButton from '~/components/app-button/AppButton'

import { OfferCard } from '~/types'

import { styles } from '~/components/offer-card-square/OfferCardSquare.styles'

interface OfferCardSquareProps {
  offer: OfferCard
}

const OfferCardSquare: React.FC<OfferCardSquareProps> = ({ offer }) => {
  const {
    bio,
    photo,
    firstName,
    lastName,
    languages,
    subject,
    proficiencyLevel,
    price,
    averageRating,
    totalReviews
  } = offer

  const levelText =
    proficiencyLevel === 'Beginner'
      ? t('common.beginner')
      : `${t('common.beginner')} - ${proficiencyLevel}`.toUpperCase()

  return (
    <AppCard containerCardStyles={styles.containerCard} isClickable={false}>
      <Box sx={styles.container}>
        <ImgTitleDescription
          description={bio}
          img={photo}
          style={styles.mainInfo}
          title={`${firstName} ${lastName}`}
        />
        <IconButton sx={styles.iconButton}>
          <TurnedInNot />
        </IconButton>
        <Box sx={styles.languagesContainer}>
          <LanguageIcon sx={styles.languageIcon} />
          <Typography sx={styles.languages} variant='body2'>
            {languages.join(', ')}
          </Typography>
        </Box>
        <Box sx={styles.chipsContainer}>
          <AppChip labelSx={styles.subjectChipLabel} sx={styles.subjectChip}>
            {subject.toUpperCase()}
          </AppChip>
          <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip}>
            {levelText}
          </AppChip>
        </Box>

        <Box sx={styles.priceContainer}>
          <Box>
            <Typography variant='h6'>
              {price}
              {t('common.uah')}
            </Typography>
            <Typography variant='body2'>/{t('common.hour')}</Typography>
          </Box>
          <Box>
            <AppRatingMobile
              reviewsCount={totalReviews}
              value={averageRating}
            />
          </Box>
        </Box>
        <AppButton sx={styles.sendMessageButton}>
          {t('common.labels.sendMessage')}
        </AppButton>
        <AppButton sx={styles.viewDetailsButton}>
          {t('common.labels.viewDetails')}
        </AppButton>
      </Box>
    </AppCard>
  )
}
export default OfferCardSquare
