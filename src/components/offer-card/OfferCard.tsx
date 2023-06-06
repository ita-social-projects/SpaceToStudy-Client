import { FC } from 'react'

import Box from '@mui/material/Box'

import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import OfferDetails from '~/components/offer-card/offer-details/OfferDetails'
import OfferActions from '~/components/offer-card/offer-actions/OfferActions'
import { styles } from '~/components/offer-card/OfferCard.styles'
import { ButtonActions, Offer } from '~/types'

interface OfferCardProps {
  isHideField?: boolean
  offer: Offer
  onBookmarkClick: (id: string) => void
  buttonActions: (ButtonActions | null)[]
}

const OfferCard: FC<OfferCardProps> = ({
  isHideField = false,
  offer,
  onBookmarkClick,
  buttonActions
}) => {
  const {
    _id,
    authorAvgRating,
    title,
    description,
    languages,
    price,
    author,
    authorFirstName,
    authorLastName,
    authorRole,
    subject,
    proficiencyLevel
  } = offer

  return (
    <Box sx={styles.wrapper}>
      <UserProfileInfo
        firstName={authorFirstName}
        lastName={`${authorLastName[0]}.`}
        photo={author.photo}
        rating={authorAvgRating}
        reviewsCount={author.totalReviews[authorRole]}
        sx={styles.userInfo}
      />
      <OfferDetails
        description={!isHideField && description}
        languages={languages}
        level={proficiencyLevel}
        subject={subject.name}
        title={title}
      />
      <OfferActions
        buttonActions={buttonActions}
        id={_id}
        isBookmarked={false}
        onBookmarkClick={onBookmarkClick}
        price={price}
      />
    </Box>
  )
}

export default OfferCard
