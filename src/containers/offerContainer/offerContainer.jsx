import Box from '@mui/material/Box'
import OfferCard from '~/components/offer-card/OfferCard'


const OfferContainer = ({ offerCards }) => {

  const onBookmarkClick = (id) => {console.log(id)}

  return (
    <Box>
      { offerCards.map(el => (
        <OfferCard
          key={ el.id }
          offer={ el }
          onBookmarkClick={ () => onBookmarkClick(el.id) }
        />)) }
    </Box>
  )
}

export default OfferContainer
