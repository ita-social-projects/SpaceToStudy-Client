import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import useAxios from '~/hooks/use-axios'
import OfferCard from '~/components/offer-card/OfferCard'
import AppCard from '~/components/app-card/AppCard'
import Loader from '~/components/loader/Loader'
import ComentsBlock from '~/containers/tutor-profile/coments-block/ComentsBlock'
import { OfferService } from '~/services/offer-service'
import { errorRoutes } from '~/router/constants/errorRoutes'
import EnrollOffer from '~/containers/offer-details/enroll-offer/EnrollOffer'
import { ModalContext } from '~/context/modal-context'
import { defaultResponse } from '~/pages/offer-details/constants'
import { styles } from '~/pages/offer-details/OfferDetails.styles'
import { Offer } from '~/types'

import { responseMock } from '~/pages/tutor-profile/constants'

const OfferDetails = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()

  const { user } = responseMock
  const { reviews, totalReviews } = user.reviewStats || {}

  const getOffer = useCallback(() => OfferService.getOffer(id), [id])
  const responseError = useCallback(
    () => navigate(errorRoutes.notFound.path),
    [navigate]
  )
  const { response, loading } = useAxios<Offer>({
    service: getOffer,
    defaultResponse,
    onResponseError: responseError
  })

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  if (loading) {
    return <Loader pageLoad size={70} />
  }

  const handleEnrollOfferClick = () =>
    openModal({ component: <EnrollOffer offer={response} /> })

  const buttonActions = [
    {
      label: t('common.labels.enrollOffer'),
      handleClick: handleEnrollOfferClick
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
        <ComentsBlock
          commentListStyles={styles.commentList}
          reviewsCount={reviews}
          titleStyles={styles.commentTitle}
          totalReviews={totalReviews}
        />
      </AppCard>
      <AppCard sx={styles.wrapper}>
        <Box>For Example</Box>
      </AppCard>
    </Container>
  )
}

export default OfferDetails
