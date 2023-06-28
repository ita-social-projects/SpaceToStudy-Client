import { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import AppCard from '~/components/app-card/AppCard'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import AppCarousel from '~/components/app-carousel/AppCarousel'
import {
  GetOffersResponse,
  Offer,
  ButtonVariantEnum,
  StatusEnum
} from '~/types'
import { OfferService } from '~/services/offer-service'
import { defaultResponse } from '~/pages/find-offers/FindOffers.constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { createUrlPath, getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/containers/offer-details/offer-carousel/OfferCarousel.styles'
import { itemsLoadLimit } from '~/containers/offer-details/offer-carousel/OfferCarousel.constants'

interface OfferCarouselProps {
  offer: Offer
}

const OfferCarousel: FC<OfferCarouselProps> = ({ offer }) => {
  const breakpoints = useBreakpoints()
  const { isLaptopAndAbove } = breakpoints
  const { t } = useTranslation()

  const slidesToShow = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getOffers = useCallback(
    () =>
      OfferService.getOffers({
        authorRole: offer.authorRole,
        subjectId: offer.subject._id,
        proficiencyLevel: offer.proficiencyLevel,
        languages: offer.languages,
        excludedOfferId: offer._id,
        status: StatusEnum.Active,
        limit: 9
      }),
    [offer]
  )

  const { response } = useAxios<GetOffersResponse>({
    service: getOffers,
    defaultResponse
  })

  const itemsToShow = response.items.map((item) => {
    const buttonActions = [
      {
        label: t('common.labels.viewDetails'),
        buttonProps: {
          component: Link,
          to: createUrlPath(authRoutes.offerDetails.path, item._id)
        }
      },
      {
        label: t('common.labels.sendMessage'),
        buttonProps: {
          disabled: true,
          variant: ButtonVariantEnum.Tonal
        }
      }
    ]
    return (
      <AppCard key={item._id} sx={styles.offerCard}>
        <OfferCardSquare buttonActions={buttonActions} offer={item} />
      </AppCard>
    )
  })

  const carouselSettings = {
    slidesToShow: slidesToShow,
    defaultControlsConfig: {
      pagingDotsStyle: styles.dotStyles(isLaptopAndAbove)
    },
    leftButtonStyles: styles.button(isLaptopAndAbove, 'left'),
    rightButtonStyles: styles.button(isLaptopAndAbove, 'right'),
    leftArrowStyles: styles.arrow,
    rightArrowStyles: styles.arrow
  }

  return itemsToShow.length > 0 ? (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t('findOffers.otherOffers.title')}
      </Typography>
      <AppCarousel settings={carouselSettings}>{itemsToShow}</AppCarousel>
    </Box>
  ) : null
}

export default OfferCarousel
