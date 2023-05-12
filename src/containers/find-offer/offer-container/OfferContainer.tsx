import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import useBreakpoints from '~/hooks/use-breakpoints'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { CardsView, Offer, CardsViewEnum } from '~/types'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import OfferCard from '~/components/offer-card/OfferCard'
import AppCard from '~/components/app-card/AppCard'

interface OfferContainerProps {
  viewMode: CardsView
  offerCards: Offer[]
  isFiltersOpen: boolean
}

const OfferContainer: FC<OfferContainerProps> = ({
  viewMode,
  offerCards,
  isFiltersOpen
}) => {
  const { t } = useTranslation()
  const { isMobile, isDesktop } = useBreakpoints()

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const columnNumber = viewMode === CardsViewEnum.Grid ? 12 : 1

  const renderSquareCard =
    isMobile || (isDesktop && viewMode === CardsViewEnum.Grid)

  const buttonActions = [
    {
      label: t('common.labels.sendMessage'),
      handleClick: () => null
    },
    {
      label: t('common.labels.viewDetails'),
      handleClick: () => null
    }
  ]

  const offerItems = offerCards.map((el) => (
    <Grid item key={el._id} sm={isDesktop && isFiltersOpen ? 6 : 4}>
      {renderSquareCard ? (
        <AppCard>
          <OfferCardSquare
            buttonActions={buttonActions}
            offer={el}
            onBookmarkClick={onBookmarkClick}
          />
        </AppCard>
      ) : (
        <AppCard sx={{ padding: { sm: '20px', md: '30px 20px' } }}>
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
    <Box data-testid='OfferContainer' sx={{ flexGrow: 1, my: '20px' }}>
      <Grid
        columns={{ xs: 1, md: columnNumber }}
        container
        justifyContent={'center'}
        spacing={3}
      >
        {offerItems}
      </Grid>
    </Box>
  )
}

export default OfferContainer
