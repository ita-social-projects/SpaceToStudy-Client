import OfferAvatarAndRating from '~/components/offer-card/offer-avatar-and-rating/OfferAvatarAndRating'
import OfferDetails from '~/components/offer-card/offer-details/OfferDetails'
import OfferActions from '~/components/offer-card/offer-actions/OfferActions'

const OfferCard = ({ isHideField, offer, onBookmarkClick, buttonActions }) => {
  const {
    imgSrc,
    rating,
    name,
    bio,
    description,
    languages,
    price,
    isBookmarked,
    subject,
    level
  } = offer

  return (
    <>
      <OfferAvatarAndRating imgSrc={imgSrc} rating={rating} />
      <OfferDetails
        bio={bio}
        description={!isHideField && description}
        languages={languages}
        level={level}
        name={name}
        subject={subject}
      />
      <OfferActions
        buttonActions={buttonActions}
        isBookmarked={isBookmarked}
        onBookmarkClick={onBookmarkClick}
        price={price}
      />
    </>
  )
}

export default OfferCard
