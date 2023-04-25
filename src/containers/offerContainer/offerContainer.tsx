import { FC } from 'react'
import Box from '@mui/material/Box'
import OfferCard from '~/components/offer-card/OfferCard'
import { Grid } from '@mui/material'
import { CardsViewTypes, OfferResponse } from '~/types'

interface OfferContainerProps {
  viewMode: CardsViewTypes
  offerCards: OfferResponse[]
}

const OfferContainer: FC<OfferContainerProps> = ({ viewMode, offerCards }) => {
  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const arrayOfCards = offerCards.map((el) => (
    <Grid item key={el._id} md={4} sm={4} xs={2}>
      <OfferCard offer={el} onBookmarkClick={() => onBookmarkClick(el._id)} />
    </Grid>
  ))

  return (
    <Box sx={{ flexGrow: 1 }}>
      {viewMode === 'grid' ? (
        <Grid
          columns={{ xs: 4, sm: 8, md: 12, xl: 12 }}
          container
          spacing={{ xs: 2, md: 3 }}
        >
          {arrayOfCards}
        </Grid>
      ) : (
        <Grid
          columns={{ xs: 4, sm: 8, md: 12, xl: 1 }}
          container
          spacing={{ xs: 2, md: 3 }}
        >
          {arrayOfCards}
        </Grid>
      )}
    </Box>
  )
}

export default OfferContainer
