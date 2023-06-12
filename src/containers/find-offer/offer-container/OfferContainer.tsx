import { FC, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'

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
  const { isMobile, isLaptopAndAbove } = useBreakpoints()

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const renderSquareCard =
    isMobile || (isLaptopAndAbove && viewMode === CardsViewEnum.Grid)

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
      <Fragment key={el._id}>
        {renderSquareCard ? (
          <AppCard sx={styles.appCardSquare}>
            <OfferCardSquare
              buttonActions={buttonActions}
              offer={el}
              onBookmarkClick={onBookmarkClick}
              showUser
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
      </Fragment>
    )
  })

  return (
    <Box
      data-testid='OfferContainer'
      sx={styles.offerContainer(viewMode === CardsViewEnum.Grid)}
    >
      {offerItems}
    </Box>
  )
}

export default OfferContainer
