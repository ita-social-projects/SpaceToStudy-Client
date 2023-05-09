import { FC } from 'react'

import Box from '@mui/material/Box'

import OfferAvatarAndRating from '~/components/offer-card/offer-avatar-and-rating/OfferAvatarAndRating'
import OfferDetails from '~/components/offer-card/offer-details/OfferDetails'
import OfferActions from '~/components/offer-card/offer-actions/OfferActions'
import { styles } from '~/components/offer-card/OfferCard.styles'
import { Offer } from '~/types'

interface OfferCardProps {
  isHideField?: boolean
  offer: Offer
  onBookmarkClick: (id: string) => void
}

const OfferCard: FC<OfferCardProps> = ({
  isHideField = false,
  offer,
  onBookmarkClick
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
    <Box sx={styles.wrapper}>
      <OfferAvatarAndRating imgSrc={author.photo} rating={authorAvgRating} />
      <OfferDetails
        description={!isHideField && description}
        languages={languages}
        level={proficiencyLevel}
        name={fullName}
        professionalSummary={author.professionalSummary}
        subject={subject.name}
      />
      <OfferActions
        id={_id}
        isBookmarked={false}
        onBookmarkClick={onBookmarkClick}
        price={price}
      />
    </Box>
  )
}

export default OfferCard
