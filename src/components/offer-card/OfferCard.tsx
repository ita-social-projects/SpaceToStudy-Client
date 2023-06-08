import { FC } from 'react'

import Box from '@mui/material/Box'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import OfferDetails from '~/components/offer-card/offer-details/OfferDetails'
import OfferActions from '~/components/offer-card/offer-actions/OfferActions'

import { ButtonActions, Offer } from '~/types'
import { styles } from '~/components/offer-card/OfferCard.styles'

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
    authorRole,
    subject,
    category,
    proficiencyLevel
  } = offer

  return (
    <Box sx={styles.wrapper}>
      <UserProfileInfo
        firstName={author.firstName}
        lastName={`${author.lastName[0]}.`}
        photo={author.photo}
        rating={authorAvgRating}
        reviewsCount={author.totalReviews[authorRole]}
        sx={styles.userInfo}
      />
      <OfferDetails
        chipsColor={category.appearance.color}
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
