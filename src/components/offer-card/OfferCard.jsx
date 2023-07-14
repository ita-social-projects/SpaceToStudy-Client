import Box from '@mui/material/Box'
import OfferActions from '~/components/offer-card/offer-actions/OfferActions'
import OfferDetails from '~/components/offer-card/offer-details/OfferDetails'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'

import { styles } from '~/components/offer-card/OfferCard.styles'

const OfferCard = ({
  isHideField = false,
  offer,
  onBookmarkClick,
  buttonActions
}) => {
  const {
    _id,
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
        _id={author._id}
        firstName={author.firstName}
        lastName={`${author.lastName[0]}.`}
        photo={author.photo}
        rating={author.averageRating[authorRole]}
        reviewsCount={author.totalReviews[authorRole]}
        role={authorRole}
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
