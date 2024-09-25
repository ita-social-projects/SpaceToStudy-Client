import { useCallback, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'

import { setPageLoad } from '~/redux/reducer'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { OfferService } from '~/services/offer-service'
import { useModalContext } from '~/context/modal-context'
import { useChatContext } from '~/context/chat-context'
import useAxios from '~/hooks/use-axios'
import useConfirm from '~/hooks/use-confirm'
import useBreakpoints from '~/hooks/use-breakpoints'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CommentsBlock from '~/containers/user-profile/comments-block/CommentBlock'
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
import {
  CreateOrUpdateOfferData,
  Offer,
  OutletContext,
  StatusEnum,
  ErrorResponse,
  UserRole,
  UserRoleEnum
} from '~/types'
import ScrollVisibilityWrapper from '~/components/scroll-visibility-wrapper/ScrollVisibilityWrapper'
import OfferBanner from '~/components/offer-banner/OfferBanner'
import {
  responseMock,
  loadingMock
} from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.constants'
import { activeButtonActions } from '~/pages/offer-details/OfferDetails.constants'
import { useToggleBookmark } from '~/utils/toggle-bookmark'
import { openAlert } from '~/redux/features/snackbarSlice'
import { setField, fetchUserById } from '~/redux/features/editProfileSlice'
import { snackbarVariants } from '~/constants'
import { getErrorKey } from '~/utils/get-error-key'

const OfferDetails = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { id = '' } = useParams()
  const { openModal } = useModalContext()
  const { setChatInfo } = useChatContext()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { checkConfirmation } = useConfirm()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const { bookmarkedOffers } = useAppSelector((state) => state.editProfile)

  const offerDetailsPage = useRef(null)
  const { pageRef } = useOutletContext<OutletContext>()
  const { items } = responseMock

  const titleKey =
    userRole === UserRoleEnum.Tutor
      ? 'userProfilePage.reviews.titleTutor'
      : 'userProfilePage.reviews.titleStudent'

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
    (updateData?: Partial<CreateOrUpdateOfferData>) =>
      OfferService.updateOffer(id, updateData),
    [id]
  )

  const { loading: updateLoading, fetchData: fetchDataUpdateOffer } = useAxios<
    null,
    Partial<CreateOrUpdateOfferData>
  >({
    service: updateOffer,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: responseError
  })

  const handleResponse = (response: string[]) => {
    dispatch(setField({ field: 'bookmarkedOffers', value: response }))
  }

  const handleResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const toggleBookmark = useToggleBookmark(
    userId,
    handleResponse,
    handleResponseError
  )

  const isBookmarked = useMemo(
    () => (offerData ? bookmarkedOffers.includes(offerData._id) : false),
    [offerData, bookmarkedOffers]
  )

  const onBookmarkClick = (id: string) => {
    void toggleBookmark(id)
  }

  const handleEnrollOfferClick = () =>
    offerData &&
    openModal({
      component: (
        <EnrollOffer enrollOffer={handleEnrollOffer} offer={offerData} />
      )
    })

  const handleToggleOfferStatus = async () => {
    const status =
      offerData?.status === StatusEnum.Draft
        ? StatusEnum.Active
        : StatusEnum.Draft

    if (offerData) {
      await fetchDataUpdateOffer({ status })
      void fetchDataOffer()
    }
  }

  const handleCloseOffer = async () => {
    const confirmed = checkConfirmation({
      message: 'offerDetailsPage.closeOffer',
      title: 'titles.confirmTitle',
      check: true
    })
    if (await confirmed) {
      await fetchDataUpdateOffer({ status: StatusEnum.Closed })
      void fetchDataOffer()
    }
  }

  const handleEnrollOffer = async () => {
    if (offerData) {
      await fetchDataUpdateOffer({
        enrolledUsers: [...offerData.enrolledUsers, userId]
      })
      void fetchDataOffer()
    }
  }

  const handleSendMessage = () => {
    if (offerData) {
      setChatInfo({
        author: offerData.author,
        authorRole: offerData.authorRole,
        chatId: offerData.chatId,
        updateInfo: () => void fetchDataOffer()
      })
    }
  }

  const buttonActions = activeButtonActions({
    isEnrolled: Boolean(offerData?.enrolledUsers.includes(userId)),
    loading: updateLoading,
    oppositeRole: offerData?.authorRole !== userRole,
    isMyOffer: offerData?.author._id === userId,
    status: offerData?.status,
    handleEnrollOfferClick,
    handleToggleOfferStatus,
    handleCloseOffer,
    handleSendMessage
  })

  const faqItems = useMemo(
    () =>
      offerData?.FAQ.map((item) => ({
        title: item.question,
        description: item.answer
      })),
    [offerData]
  )

  useLayoutEffect(() => {
    void dispatch(setPageLoad(offerLoading))
  }, [dispatch, offerLoading])

  useEffect(() => {
    void dispatch(
      fetchUserById({ userId, role: userRole as UserRole, isEdit: false })
    )
  }, [dispatch, userId, userRole])

  if (offerLoading) {
    return <Loader pageLoad />
  }

  if (!offerData) {
    return null
  }

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
            isBookmarked={isBookmarked}
            offer={offerData}
            onBookmarkClick={onBookmarkClick}
          />
        </AppCard>
      ) : (
        <AppCard sx={styles.offerCard}>
          <OfferCard
            buttonActions={buttonActions}
            isBookmarked={isBookmarked}
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
      {faqItems?.length && (
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
          title={t(titleKey)}
        />
      </AppCard>

      <OfferCarousel offer={offerData} />
    </PageWrapper>
  )
}

export default OfferDetails
