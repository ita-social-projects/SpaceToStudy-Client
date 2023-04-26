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

import { Offer, ProficiencyLevelEnum } from '~/types'

import { styles } from '~/containers/find-offer/offer-card-square/OfferCardSquare.styles'

interface OfferCardSquareProps {
  offer: Offer
}

const OfferCardSquare: FC<OfferCardSquareProps> = ({ offer }) => {
  const {
    authorAvgRating,
    languages,
    price,
    author,
    authorFirstName,
    authorLastName,
    subject,
    proficiencyLevel
  } = offer

  const lastLevel = proficiencyLevel[proficiencyLevel.length - 1]
  const levelText =
    lastLevel === ProficiencyLevelEnum.Beginner
      ? t('common.beginner')
      : `${t('common.beginner')} - ${lastLevel}`.toUpperCase()

  const fullName = `${authorFirstName} ${authorLastName}`

  return (
    <AppCard sx={styles.containerCard}>
      <Box sx={styles.container}>
        <ImgTitleDescription
          description={author.professionalSummary}
          img={author.photo}
          style={styles.mainInfo}
          title={fullName}
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
            {subject.name}
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
              reviewsCount={author.totalReviews}
              value={authorAvgRating}
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
