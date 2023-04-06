import AppCard from '~/components/app-card/AppCard'
import OfferAvatarAndRating from '~/components/offer-card/offer-avatar-and-rating/OfferAvatarAndRating'
import OfferDetails from '~/components/offer-card/offer-details/OfferDetails'
import OfferActions from '~/components/offer-card/offer-actions/OfferActions'

const OfferCard = ({ offer, onBookmarkClick }) => {
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
    <AppCard isClickable={false}>
      <OfferAvatarAndRating imgSrc={imgSrc} rating={rating} />
      <OfferDetails
        bio={bio}
        description={description}
        languages={languages}
        level={level}
        name={name}
        subject={subject}
      />
      <OfferActions
        isBookmarked={isBookmarked}
        onBookmarkClick={onBookmarkClick}
        price={price}
      />
    </AppCard>
  )
}

export default OfferCard
