import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import TurnedIn from '@mui/icons-material/TurnedIn'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import Button from '~scss-components/button/Button'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import TitleWithDescripiton from '~/components/title-with-description/TitleWithDescription'

import { ButtonActions, Offer } from '~/types'
import { styles } from '~/containers/find-offer/offer-card-square/OfferCardSquare.styles'
import SubjectLevelWithLabels from '~/components/subject-level-with-labels/SubjectLevelWithLabels'

interface OfferCardSquareProps {
  buttonActions?: (ButtonActions | null)[]
  offer: Offer
  onBookmarkClick?: (id: string) => void
  isBookmarked: boolean
}

const OfferCardSquare: FC<OfferCardSquareProps> = ({
  buttonActions,
  offer,
  onBookmarkClick,
  isBookmarked
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

  const buttons = buttonActions?.map((elem) => {
    const variant = elem?.buttonProps?.variant === 'tonal' ? 'tonal' : 'primary'
    return (
      elem && (
        <Button
          {...elem.buttonProps}
          fullWidth
          key={elem.label}
          size='md'
          variant={variant}
        >
          {t(elem.label)}
        </Button>
      )
    )
  })

  return (
    <Box sx={styles.container}>
      <Box sx={styles.cardContent}>
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
        <Divider />
        {onBookmarkClick && (
          <IconButton
            data-testid='bookmark-icon'
            onClick={() => onBookmarkClick(_id)}
            sx={styles.iconButton}
          >
            {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
          </IconButton>
        )}
        <SubjectLevelWithLabels
          color={category.appearance.color}
          proficiencyLevel={proficiencyLevel}
          subject={subject.name}
        />
      </Box>
      <Box sx={styles.cardContent}>
        <Box sx={styles.priceContainer}>
          <TitleWithDescripiton
            description={`/ ${t('common.hour')}`}
            style={styles.titleWithDescription}
            title={`${price} ${t('common.uah')}`}
          />
          <AppRatingMobile
            reviewsCount={author.totalReviews[authorRole]}
            value={author.averageRating[authorRole]}
          />
        </Box>
        <Box sx={styles.buttonContainer}>{buttons}</Box>
      </Box>
    </Box>
  )
}
export default OfferCardSquare
