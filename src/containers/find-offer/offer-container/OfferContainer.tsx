import useBreakpoints from '~/hooks/use-breakpoints'
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
  const { isMobile, isTablet, isDesktop } = useBreakpoints()
  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const columnNumber = viewMode === CardsViewEnums.Grid ? 12 : 1

  const renderSquareCard =
    isMobile || (isDesktop && viewMode === CardsViewEnums.Grid) ? true : false

  console.log(renderSquareCard, viewMode)
  const offerItems = offerCards.map((el) => (
    <Grid item key={el._id} sm={4}>
      {renderSquareCard ? (
        <OfferCardSquare
          offer={el}
          onBookmarkClick={() => onBookmarkClick(el._id)}
        />
      ) : (
        <OfferCard offer={el} onBookmarkClick={() => onBookmarkClick(el._id)} />
      )}
    </Grid>
  ))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        columns={{ sx: 1, sm: 1, md: columnNumber }}
        container
        spacing={{ md: 3 }}
      >
        {offerItems}
      </Grid>
    </Box>
  )
}

export default OfferContainer
