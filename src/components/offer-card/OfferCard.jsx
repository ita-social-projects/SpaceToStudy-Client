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
    level,
  } = offer
  
  return (
    <AppCard isClickable={ false }>
      <OfferAvatarAndRating imgSrc={ imgSrc } rating={ rating } />
      <OfferDetails
        name={ name }
        bio={ bio }
        description={ description }
        languages={ languages }
        subject={ subject }
        level={ level }
      />
      <OfferActions
        price={ price }
        isBookmarked={ isBookmarked }
        onBookmarkClick={ onBookmarkClick }
      />
    </AppCard>
  )
}

export default OfferCard
