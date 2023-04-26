import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import OfferCard from '~/components/offer-card/OfferCard'
import { defaultResponses } from '~/constants'
import useAxios from '~/hooks/use-axios'
import { mockOffer } from '~/pages/find-offers/FindOffers.constants'
import { OfferService } from '~/services/offer-service'
import AppCard from '~/components/app-card/AppCard'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { styles } from '~/pages/offer-details/OfferDetails.styles'
import Loader from '~/components/loader/Loader'

const OfferDetails = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  const getOffer = useCallback(() => OfferService.getOffer(id), [id])
  const { response, loading } = useAxios({
    service: getOffer,
    defaultResponse: defaultResponses.array,
    onResponseError: useCallback(
      () => navigate(errorRoutes.notFound.path),
      [navigate]
    )
  })

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  if (loading) <Loader pageLoad size={70} />

  const buttonActions = [
    {
      label: t('common.labels.enrollOffer'),
      handleClick: () => {}
    },
    {
      label: t('common.labels.sendMessage'),
      handleClick: () => {}
    }
  ]

  return (
    <Container sx={styles.container}>
      <AppCard sx={styles.offerCard}>
        <OfferCard
          buttonActions={buttonActions}
          isHideField
          offer={mockOffer}
          onBookmarkClick={() => onBookmarkClick(mockOffer.id)}
        />
      </AppCard>
      <AppCard sx={styles.wrapper}>
        <Box>For Example</Box>
      </AppCard>
    </Container>
  )
}

export default OfferDetails
