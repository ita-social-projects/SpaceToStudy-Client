import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import Typography from '@mui/material/Typography'

import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import AppButton from '~/components/app-button/AppButton'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'
import TitleWithDescripiton from '~/components/title-with-description/TitleWithDescription'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import { ButtonActions, Offer } from '~/types'
import { styles } from '~/containers/find-offer/offer-card-square/OfferCardSquare.styles'

interface OfferCardSquareProps {
  buttonActions?: (ButtonActions | null)[]
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
    authorRole,
    languages,
    price,
    author,
    title,
    subject,
    category,
    proficiencyLevel
  } = offer

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
        firstName={author.firstName}
        lastName={author.lastName}
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
      <SubjectLevelChips
        color={category.appearance.color}
        proficiencyLevel={proficiencyLevel}
        subject={subject.name}
        sx={styles.chipContainer}
      />
      <Box sx={styles.priceContainer}>
        <TitleWithDescripiton
          description={`/ ${t('common.hour')}`}
          style={styles.titleWithDescription}
          title={`${price} ${t('common.uah')}`}
        />
        <Box>
          <AppRatingMobile
            reviewsCount={author.totalReviews[authorRole]}
            value={author.averageRating[authorRole]}
          />
        </Box>
      </Box>
      <Box sx={styles.buttonContainer}>{buttons}</Box>
    </Box>
  )
}
export default OfferCardSquare
