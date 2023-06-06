import { FC } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'react-i18next'

import AppChip from '~/components/app-chip/AppChip'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import AppButton from '~/components/app-button/AppButton'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'
import TitleWithDescripiton from '~/components/title-with-description/TitleWithDescription'

import { ButtonActions, Offer, ProficiencyLevelEnum } from '~/types'

import { styles } from '~/containers/find-offer/offer-card-square/OfferCardSquare.styles'

interface OfferCardSquareProps {
  buttonActions: (ButtonActions | null)[]
  offer: Offer
  onBookmarkClick?: (id: string) => void
}

const OfferCardSquare: FC<OfferCardSquareProps> = ({
  buttonActions,
  offer,
  onBookmarkClick
}) => {
  const { t } = useTranslation()

  const {
    _id,
    authorAvgRating,
    languages,
    price,
    author,
    title,
    authorFirstName,
    authorLastName,
    subject,
    proficiencyLevel
  } = offer

  const lastLevel =
    proficiencyLevel.length > 1
      ? proficiencyLevel[proficiencyLevel.length - 1]
      : proficiencyLevel[0]
  const levelText =
    lastLevel === ProficiencyLevelEnum.Beginner
      ? t('common.beginner')
      : `${t('common.beginner')} - ${lastLevel}`.toUpperCase()

  const buttons = buttonActions?.map(
    (elem) =>
      elem && (
        <AppButton fullWidth key={elem.label} {...elem.buttonProps}>
          {elem.label}
        </AppButton>
      )
  )

  return (
    <Box sx={styles.container}>
      <UserProfileInfo
        firstName={authorFirstName}
        lastName={authorLastName}
        photo={author.photo}
        sx={styles.userInfo}
      />
      <Typography sx={styles.description}>{title}</Typography>
      {onBookmarkClick && (
        <IconButton
          data-testid='bookmark-icon'
          onClick={() => onBookmarkClick(_id)}
          sx={styles.iconButton}
        >
          <TurnedInNot />
        </IconButton>
      )}
      <LanguagesListWithIcon languages={languages} />
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
          description={`/ ${t('common.hour')}`}
          style={styles.titleWithDescription}
          title={`${price} ${t('common.uah')}`}
        />
        <Box>
          <AppRatingMobile
            reviewsCount={author.totalReviews}
            value={authorAvgRating}
          />
        </Box>
      </Box>
      <Box sx={styles.buttonContainer}>{buttons}</Box>
    </Box>
  )
}
export default OfferCardSquare
