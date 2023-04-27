import { FC } from 'react'

import Box from '@mui/material/Box'

import OfferAvatarAndRating from '~/components/offer-card/offer-avatar-and-rating/OfferAvatarAndRating'
import OfferDetails from '~/components/offer-card/offer-details/OfferDetails'
import OfferActions from '~/components/offer-card/offer-actions/OfferActions'
import { mockOffer } from '~/pages/find-offers/FindOffers.constants'
import { styles } from '~/components/offer-card/OfferCard.styles'
import { ButtonActions, Offer } from '~/types'

interface OfferCardProps {
  isHideField: boolean
  offer: Offer
  onBookmarkClick: (id: string) => void
  buttonActions: ButtonActions[]
}

const OfferCard: FC<OfferCardProps> = ({
  isHideField,
  offer,
  onBookmarkClick,
  buttonActions
}) => {
  const {
    _id,
    authorAvgRating,
    description,
    languages,
    price,
    author,
    authorFirstName,
    authorLastName,
    subject,
    proficiencyLevel
  } = offer

  const fullName = `${authorFirstName} ${authorLastName}`

  return (
    <>
      <OfferAvatarAndRating imgSrc={author.photo} rating={authorAvgRating} />
      <Box sx={styles.wrapper}>
        <OfferDetails
          description={!isHideField && description}
          languages={languages}
          level={proficiencyLevel}
          name={fullName}
          professionalSummary={author.professionalSummary}
          subject={subject.name}
        />
        <OfferActions
          buttonActions={buttonActions}
          id={_id}
          isBookmarked={mockOffer.isBookmarked}
          onBookmarkClick={onBookmarkClick}
          price={price}
        />
      </Box>
    </>
  )
}

export default OfferCard
