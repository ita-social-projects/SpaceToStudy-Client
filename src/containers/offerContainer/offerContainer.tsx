import { FC } from 'react'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import { CardsViewTypes, OfferResponse, CardsViewEnums } from '~/types'
import OfferCardSquare from '../find-offer/offer-card-square/OfferCardSquare'

interface OfferContainerProps {
  viewMode: CardsViewTypes
  offerCards: OfferResponse[]
}

const OfferContainer: FC<OfferContainerProps> = ({ viewMode, offerCards }) => {
  const arrayOfCards = offerCards.map((el) => (
    <Grid item key={el._id} sm={4}>
      <OfferCardSquare offer={el} />
    </Grid>
  ))

  const columnNumber = viewMode === CardsViewEnums.Grid ? 12 : 1

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        columns={{ md: 12, xl: columnNumber }}
        container
        spacing={{ md: 3 }}
      >
        {arrayOfCards}
      </Grid>
    </Box>
  )
}

export default OfferContainer
