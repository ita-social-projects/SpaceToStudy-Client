import { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import useAxios from '~/hooks/use-axios'
import OfferCard from '~/components/offer-card/OfferCard'
import AppCard from '~/components/app-card/AppCard'
import Loader from '~/components/loader/Loader'
import CommentsBlock from '~/containers/tutor-profile/comments-block/CommentBlock'
import { OfferService } from '~/services/offer-service'
import { errorRoutes } from '~/router/constants/errorRoutes'
import ShowMoreCollapse from '~/components/show-more-collapse/ShowMoreCollapse'
import EnrollOffer from '~/containers/offer-details/enroll-offer/EnrollOffer'
import { ModalContext } from '~/context/modal-context'
import { defaultResponse } from '~/pages/offer-details/constants'

import { Offer } from '~/types'
import { styles } from '~/pages/offer-details/OfferDetails.styles'

import {
  responseMock,
  loadingMock
} from '~/containers/tutor-profile/comments-with-rating-block/constants'

const OfferDetails = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()

  const { items } = responseMock

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
        <ShowMoreCollapse
          description={response.description ?? ''}
          title={t('common.aboutOffer')}
        />
      </AppCard>

      <AppCard sx={styles.wrapper}>
        <CommentsBlock
          data={items}
          isExpandable
          loadMore={() => null}
          loading={loadingMock}
          title={t('tutorProfilePage.reviews.title')}
        />
      </AppCard>
      <AppCard sx={styles.wrapper}>
        <Box>For Example</Box>
      </AppCard>
    </Container>
  )
}

export default OfferDetails
