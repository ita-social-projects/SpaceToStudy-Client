import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'

import useAxios from '~/hooks/use-axios'
import OfferCard from '~/components/offer-card/OfferCard'
import Loader from '~/components/loader/Loader'
import CommentsBlock from '~/containers/tutor-profile/comments-block/CommentBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
import { OfferService } from '~/services/offer-service'
import AppCard from '~/components/app-card/AppCard'
import OfferCarousel from '~/containers/offer-details/offer-carousel/OfferCarousel'
import { errorRoutes } from '~/router/constants/errorRoutes'
import ShowMoreCollapse from '~/components/show-more-collapse/ShowMoreCollapse'
import EnrollOffer from '~/containers/offer-details/enroll-offer/EnrollOffer'
import { useModalContext } from '~/context/modal-context'
import { defaultResponse } from '~/pages/offer-details/constants'

import { Offer } from '~/types'
import { styles } from '~/pages/offer-details/OfferDetails.styles'

import {
  responseMock,
  loadingMock
} from '~/containers/tutor-profile/comments-with-rating-block/constants'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'

const OfferDetails = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { id = '' } = useParams()
  const { openModal } = useModalContext()
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
      {isMobile ? (
        <AppCard sx={styles.offerCardSquare}>
          <OfferCardSquare
            buttonActions={buttonActions}
            offer={response}
            onBookmarkClick={onBookmarkClick}
          />
        </AppCard>
      ) : (
        <AppCard sx={styles.offerCard}>
          <OfferCard
            buttonActions={buttonActions}
            isHideField
            offer={response}
            onBookmarkClick={onBookmarkClick}
          />
        </AppCard>
      )}

      <AppCard sx={styles.wrapper}>
        <ShowMoreCollapse
          collapsedSize={isMobile ? 80 : 70}
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

      <OfferCarousel offer={response} />
    </Container>
  )
}

export default OfferDetails
