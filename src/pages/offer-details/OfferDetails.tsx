import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'

import { OfferService } from '~/services/offer-service'
import { useModalContext } from '~/context/modal-context'
import { useAppSelector } from '~/hooks/use-redux'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CommentsBlock from '~/containers/tutor-profile/comments-block/CommentBlock'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import EnrollOffer from '~/containers/offer-details/enroll-offer/EnrollOffer'
import OfferCarousel from '~/containers/offer-details/offer-carousel/OfferCarousel'
import OfferGeneralInfo from '~/containers/offer-details/offer-general-info/OfferGeneralInfo'
import OfferCard from '~/components/offer-card/OfferCard'
import TitleBlock from '~/components/title-block/TitleBlock'
import MultiAccordionWithTitle from '~/components/multi-accordion-with-title/MultiAccordionWIthTitle'
import ShowMoreCollapse from '~/components/show-more-collapse/ShowMoreCollapse'
import AppCard from '~/components/app-card/AppCard'
import Loader from '~/components/loader/Loader'

import { errorRoutes } from '~/router/constants/errorRoutes'
import topBlockIcon from '~/assets/img/offer-details/top-block-icon.png'
import { styles } from '~/pages/offer-details/OfferDetails.styles'
import { Offer, ButtonVariantEnum, OutletContext, StatusEnum } from '~/types'
import ScrollVisibilityWrapper from '~/components/scroll-visibility-wrapper/ScrollVisibilityWrapper'
import OfferBanner from '~/components/offer-banner/OfferBanner'
import {
  responseMock,
  loadingMock
} from '~/containers/tutor-profile/comments-with-rating-block/constants'

const OfferDetails = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { id = '' } = useParams()
  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const offerDetailsPage = useRef(null)
  const { pageRef } = useOutletContext<OutletContext>()
  const { items } = responseMock

  const getOffer = useCallback(() => OfferService.getOffer(id), [id])
  const responseError = useCallback(
    () => navigate(errorRoutes.notFound.path),
    [navigate]
  )
  const {
    response: offerData,
    loading: offerLoading,
    fetchData: fetchDataOffer
  } = useAxios<Offer | null>({
    service: getOffer,
    defaultResponse: null,
    onResponseError: responseError
  })

  const updateOffer = useCallback(
    (status?: StatusEnum) => OfferService.updateOffer(id, { status }),
    [id]
  )

  const { fetchData } = useAxios<Offer | null, StatusEnum>({
    service: updateOffer,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: responseError
  })

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const handleEnrollOfferClick = () =>
    offerData && openModal({ component: <EnrollOffer offer={offerData} /> })

  const handleToggleOfferStatus = () => {
    const newStatus =
      offerData?.status === StatusEnum.Draft
        ? StatusEnum.Active
        : StatusEnum.Draft

    if (offerData) {
      void fetchData(newStatus)
      void fetchDataOffer()
    }
  }

  const buttonActions = [
    offerData?.authorRole !== userRole
      ? {
          label: t('common.labels.enrollOffer'),
          buttonProps: {
            onClick: handleEnrollOfferClick
          }
        }
      : null,
    offerData?.author._id === userId
      ? {
          label:
            offerData?.status === StatusEnum.Draft
              ? t('common.labels.makeActive')
              : t('common.labels.moveToDraft'),
          buttonProps: {
            onClick: handleToggleOfferStatus
          }
        }
      : {
          label: t('common.labels.sendMessage'),
          buttonProps: {
            disabled: true,
            variant: ButtonVariantEnum.Tonal
          }
        }
  ]

  if (offerLoading) {
    return <Loader pageLoad />
  }

  if (!offerData) {
    return null
  }

  const faqItems = offerData.FAQ.map((item) => ({
    title: item.question,
    description: item.answer
  }))

  return (
    <PageWrapper ref={offerDetailsPage} sx={styles.container}>
      {!isMobile && (
        <ScrollVisibilityWrapper heightToShow={610} pageRef={pageRef}>
          <OfferBanner buttonActions={buttonActions} offer={offerData} />
        </ScrollVisibilityWrapper>
      )}
      <TitleBlock
        img={topBlockIcon}
        translationKey='offerDetailsPage.topBlock'
      />
      {isMobile ? (
        <AppCard sx={styles.offerCardSquare}>
          <OfferCardSquare
            buttonActions={buttonActions}
            offer={offerData}
            onBookmarkClick={onBookmarkClick}
          />
        </AppCard>
      ) : (
        <AppCard sx={styles.offerCard}>
          <OfferCard
            buttonActions={buttonActions}
            isHideField
            offer={offerData}
            onBookmarkClick={onBookmarkClick}
          />
        </AppCard>
      )}
      <AppCard sx={styles.wrapper}>
        <ShowMoreCollapse
          collapsedSize={isMobile ? 80 : 70}
          description={offerData.description}
          title={t('common.aboutOffer')}
        />
      </AppCard>

      <AppCard sx={styles.wrapper}>
        <OfferGeneralInfo offer={offerData} />
      </AppCard>
      {faqItems.length > 0 && (
        <AppCard sx={styles.wrapper}>
          <MultiAccordionWithTitle
            items={faqItems}
            sx={styles.faqAccordion}
            title='offerDetailsPage.faqTitle'
          />
        </AppCard>
      )}
      <AppCard sx={styles.wrapper}>
        <CommentsBlock
          data={items}
          isExpandable
          loadMore={() => null}
          loading={loadingMock}
          title={t('tutorProfilePage.reviews.title')}
        />
      </AppCard>

      <OfferCarousel offer={offerData} />
    </PageWrapper>
  )
}

export default OfferDetails
