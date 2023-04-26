import { FC } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LanguageIcon from '@mui/icons-material/Language'
import IconButton from '@mui/material/IconButton'
import TurnedInNot from '@mui/icons-material/TurnedInNot'

import { t } from 'i18next'
import AppCard from '~/components/app-card/AppCard'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppChip from '~/components/app-chip/AppChip'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescripiton from '~/components/title-with-description/TitleWithDescription'

import { OfferCard, ProficiencyLevelEnums } from '~/types'

import { styles } from '~/containers/find-offer/offer-card-square/OfferCardSquare.styles'

interface OfferCardSquareProps {
  offer: OfferCard
}

const onBookmarkClick = (id: string) => {
  console.log(id)
}

const OfferCardSquare: FC<OfferCardSquareProps> = ({ offer }) => {
  const {
    _id,
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
    proficiencyLevel === ProficiencyLevelEnums.Beginner
      ? t('common.beginner')
      : `${t('common.beginner')} - ${proficiencyLevel}`.toUpperCase()

  return (
    <AppCard isClickable={false} sx={styles.containerCard}>
      <Box sx={styles.container}>
        <ImgTitleDescription
          description={bio}
          img={photo}
          style={styles.mainInfo}
          title={`${firstName} ${lastName}`}
        />
        <IconButton onClick={() => onBookmarkClick(_id)} sx={styles.iconButton}>
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
            {subject}
          </AppChip>
          <AppChip labelSx={styles.levelChipLabel} sx={styles.levelChip}>
            {levelText}
          </AppChip>
        </Box>

        <Box sx={styles.priceContainer}>
          <TitleWithDescripiton
            componentStyles={styles.componentStyles}
            description={`${t('common.hourSlash')}`}
            descriptionStyles={styles.descriptionStyles}
            title={`${price} ${t('common.uah')}`}
            titleStyles={styles.titleStyles}
          />
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
        <AppButton fullWidth sx={styles.viewDetailsButton}>
          {t('common.labels.viewDetails')}
        </AppButton>
      </Box>
    </AppCard>
  )
}
export default OfferCardSquare
