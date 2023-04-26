import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import OfferCard from '~/components/offer-card/OfferCard'
import useAxios from '~/hooks/use-axios'
import { OfferService } from '~/services/offer-service'
import AppCard from '~/components/app-card/AppCard'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { styles } from '~/pages/offer-details/OfferDetails.styles'
import Loader from '~/components/loader/Loader'
import { defaultResponce } from '~/pages/offer-details/constants'
import { Offer } from '~/types'

const OfferDetails = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const getOffer = useCallback(() => OfferService.getOffer(id), [id])
  const responseError = useCallback(
    () => navigate(errorRoutes.notFound.path),
    [navigate]
  )
  const { response, loading } = useAxios<Offer>({
    service: getOffer,
    defaultResponse: defaultResponce,
    onResponseError: responseError
  })

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  if (loading) {
    return <Loader pageLoad size={70} />
  }

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
          offer={response}
          onBookmarkClick={onBookmarkClick}
        />
      </AppCard>
      <AppCard sx={styles.wrapper}>
        <Box>For Example</Box>
      </AppCard>
    </Container>
  )
}

export default OfferDetails
