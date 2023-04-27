import { FC } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { CardsViewTypes, OfferResponse, CardsViewEnums } from '~/types'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import OfferCard from '~/components/offer-card/OfferCard'

interface OfferContainerProps {
  viewMode: CardsViewTypes
  offerCards: OfferResponse[]
}

const OfferContainer: FC<OfferContainerProps> = ({ viewMode, offerCards }) => {
  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const columnNumber = viewMode === CardsViewEnums.Grid ? 12 : 1
  const cardsArray =
    viewMode === CardsViewEnums.Grid
      ? offerCards.map((el) => (
          <Grid item key={el._id} sm={4}>
            <OfferCardSquare
              offer={el}
              onBookmarkClick={() => onBookmarkClick(el._id)}
            />
          </Grid>
        ))
      : offerCards.map((el) => (
          <Grid item key={el._id} sm={4}>
            <OfferCard
              offer={el}
              onBookmarkClick={() => onBookmarkClick(el._id)}
            />
          </Grid>
        ))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        columns={{ md: 12, xl: columnNumber }}
        container
        spacing={{ md: 3 }}
      >
        {cardsArray}
      </Grid>
    </Box>
  )
}

export default OfferContainer
