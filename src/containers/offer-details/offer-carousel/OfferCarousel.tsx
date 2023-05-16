import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import AppCard from '~/components/app-card/AppCard'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import AppCarousel from '~/components/app-carousel/AppCarousel'
import { GetOffersResponse, Offer } from '~/types'
import { OfferService } from '~/services/offer-service'
import { defaultResponse } from '~/pages/find-offers/FindOffers.constants'
import { styles } from '~/containers/offer-details/offer-carousel/OfferCarousel.styles'

interface OfferCarouselProps {
  offer: Offer
}

const OfferCarousel: FC<OfferCarouselProps> = ({ offer }) => {
  const { isDesktop, isTablet } = useBreakpoints()
  const { t } = useTranslation()

  const getOffers = useCallback(
    () =>
      OfferService.getOffers({
        authorRole: offer.authorRole,
        subjectId: offer.subject._id,
        proficiencyLevel: offer.proficiencyLevel,
        languages: offer.languages,
        excludedOfferId: offer._id,
        limit: 9
      }),
    [offer]
  )

  const { response } = useAxios<GetOffersResponse>({
    service: getOffers,
    defaultResponse
  })

  const itemsToShow = response.offers.map((item) => (
    <AppCard key={item._id} sx={styles.offerCard}>
      <OfferCardSquare offer={item} />
    </AppCard>
  ))

  const carouselSettings = {
    slidesToShow: isDesktop ? 3 : isTablet ? 2 : 1,
    defaultControlsConfig: {
      pagingDotsStyle: styles.dotStyles(isDesktop)
    },
    leftButtonStyles: styles.button(isDesktop, 'left'),
    rightButtonStyles: styles.button(isDesktop, 'right'),
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
