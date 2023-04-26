import { FC } from 'react'
import Box from '@mui/material/Box'
import OfferCard from '~/components/offer-card/OfferCard'
import { Grid } from '@mui/material'
import { CardsViewTypes, OfferResponse, CardsViewEnums } from '~/types'
import OfferCardSquare from '../find-offer/offer-card-square/OfferCardSquare'

interface OfferContainerProps {
  viewMode: CardsViewTypes
  offerCards: OfferResponse[]
}

const OfferContainer: FC<OfferContainerProps> = ({ viewMode, offerCards }) => {
  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const arrayOfCards = offerCards.map((el) => (
    <Grid item key={el._id} sm={4}>
      <OfferCardSquare
        offer={el}
        onBookmarkClick={() => onBookmarkClick(el._id)}
      />
    </Grid>
  ))

  return (
    <Box sx={{ flexGrow: 1 }}>
      {viewMode === CardsViewEnums.Grid ? (
        <Grid columns={{ md: 12, xl: 12 }} container spacing={{ md: 3 }}>
          {arrayOfCards}
        </Grid>
      ) : (
        <Grid columns={{ md: 12, xl: 1 }} container spacing={{ md: 3 }}>
          {arrayOfCards}
        </Grid>
      )}
    </Box>
  )
}

export default OfferContainer
