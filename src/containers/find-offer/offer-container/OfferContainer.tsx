import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import useBreakpoints from '~/hooks/use-breakpoints'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { CardsViewTypes, Offer, CardsViewEnums } from '~/types'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import OfferCard from '~/components/offer-card/OfferCard'
import AppCard from '~/components/app-card/AppCard'

interface OfferContainerProps {
  viewMode: CardsViewTypes
  offerCards: Offer[]
}

const OfferContainer: FC<OfferContainerProps> = ({ viewMode, offerCards }) => {
  const { t } = useTranslation()
  const { isMobile, isDesktop } = useBreakpoints()

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const columnNumber = viewMode === CardsViewEnums.Grid ? 12 : 1

  const renderSquareCard =
    isMobile || (isDesktop && viewMode === CardsViewEnums.Grid)

  const buttonActions = [
    {
      label: t('common.labels.sendMessage'),
      handleClick: () => {}
    },
    {
      label: t('common.labels.viewDetails'),
      handleClick: () => {}
    }
  ]

  const offerItems = offerCards.map((el) => (
    <Grid item key={el._id} sm={4}>
      {renderSquareCard ? (
        <AppCard sx={{ maxWidth: '320px' }}>
          <OfferCardSquare offer={el} onBookmarkClick={onBookmarkClick} />
        </AppCard>
      ) : (
        <AppCard>
          <OfferCard
            buttonActions={buttonActions}
            offer={el}
            onBookmarkClick={onBookmarkClick}
          />
        </AppCard>
      )}
    </Grid>
  ))

  return (
    <Box data-testid='OfferContainer' sx={{ flexGrow: 1 }}>
      <Grid columns={{ xs: 1, md: columnNumber }} container spacing={{ md: 3 }}>
        {offerItems}
      </Grid>
    </Box>
  )
}

export default OfferContainer
