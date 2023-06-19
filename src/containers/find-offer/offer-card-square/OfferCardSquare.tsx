import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import AppButton from '~/components/app-button/AppButton'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import TitleWithDescripiton from '~/components/title-with-description/TitleWithDescription'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

import { ButtonActions, Offer, SizeEnum } from '~/types'
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
        <AppButton
          fullWidth
          key={elem.label}
          size={SizeEnum.Medium}
          {...elem.buttonProps}
        >
          {elem.label}
        </AppButton>
      )
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.cardTopContent}>
        <UserProfileInfo
          _id={author._id}
          firstName={author.firstName}
          languages={languages}
          lastName={author.lastName}
          photo={author.photo}
          role={authorRole}
          sx={styles.userInfo}
        />
        <Typography sx={styles.description}>{title}</Typography>
        <Divider sx={styles.devider} />
        {onBookmarkClick && (
          <IconButton
            data-testid='bookmark-icon'
            onClick={() => onBookmarkClick(_id)}
            sx={styles.iconButton}
          >
            <TurnedInNot />
          </IconButton>
        )}
        <SubjectLevelChips
          cardSquareStyle
          color={category.appearance.color}
          proficiencyLevel={proficiencyLevel}
          subject={subject.name}
          sx={styles.chipContainer}
        />
      </Box>
      <Box sx={styles.cardBottomContent}>
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
    </Box>
  )
}
export default OfferCardSquare
