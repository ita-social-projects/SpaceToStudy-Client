import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import useBreakpoints from '~/hooks/use-breakpoints'
import { CardsView, Offer, CardsViewEnum, ButtonVariantEnum } from '~/types'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import OfferCard from '~/components/offer-card/OfferCard'
import AppCard from '~/components/app-card/AppCard'
import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/find-offer/offer-container/OfferContainer.styles'

interface OfferContainerProps {
  viewMode: CardsView
  offerCards: Offer[]
}

const OfferContainer: FC<OfferContainerProps> = ({ viewMode, offerCards }) => {
  const { t } = useTranslation()
  const { isMobile, isDesktop } = useBreakpoints()

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const columnNumber = viewMode === CardsViewEnum.Grid ? 12 : 1

  const renderSquareCard =
    isMobile || (isDesktop && viewMode === CardsViewEnum.Grid)

  const offerItems = offerCards.map((el) => {
    const buttonActions = [
      {
        label: t('common.labels.viewDetails'),
        buttonProps: {
          component: Link,
          to: createUrlPath(authRoutes.offerDetails.path, el._id)
        }
      },
      {
        label: t('common.labels.sendMessage'),
        buttonProps: {
          variant: ButtonVariantEnum.Tonal,
          disabled: true
        }
      }
    ]
    return (
      <Grid item key={el._id} sm={4} sx={styles.gridItem}>
        {renderSquareCard ? (
          <AppCard sx={styles.appCardSquare}>
            <OfferCardSquare
              buttonActions={buttonActions}
              offer={el}
              onBookmarkClick={onBookmarkClick}
            />
          </AppCard>
        ) : (
          <AppCard sx={styles.appCard}>
            <OfferCard
              buttonActions={buttonActions}
              offer={el}
              onBookmarkClick={onBookmarkClick}
            />
          </AppCard>
        )}
      </Grid>
    )
  })

  return (
    <Box data-testid='OfferContainer' sx={styles.offerContainer}>
      <Grid
        columns={{ xs: 1, md: columnNumber }}
        container
        justifyContent={'flex-start'}
        spacing={3}
      >
        {offerItems}
      </Grid>
    </Box>
  )
}

export default OfferContainer
