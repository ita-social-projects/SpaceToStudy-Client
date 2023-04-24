import Box from '@mui/material/Box'
import OfferCard from '~/components/offer-card/OfferCard'
import { CardsViewEnums } from '~/types/findOffers/enums/findOffers.enums'

interface OfferCardsProps {
  viewMode: CardsViewEnums
  offerCards: {
    id: string
    imgSrc: string
    rating: number
    name: string
    bio: string
    description: string
    languages: Array<string>
    price: number
    isBookmarked: boolean
    subject: string
    level: string
  }[]
}

const OfferContainer: React.FC<OfferCardsProps> = ({
  viewMode,
  offerCards
}) => {
  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  return (
    <Box>
      {offerCards.map((el) => (
        <OfferCard
          key={el.id}
          offer={el}
          onBookmarkClick={() => onBookmarkClick(el.id)}
        />
      ))}
    </Box>
  )
}

export default OfferContainer
