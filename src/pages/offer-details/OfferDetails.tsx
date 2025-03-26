import { useCallback, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'

import { setPageLoad } from '~/redux/reducer'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { OfferService } from '~/services/offer-service'
import { useModalContext } from '~/context/modal-context'
import { useChatContext } from '~/context/chat-context'
import useQuery from '~/hooks/use-query'
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
import { OutletContext, StatusEnum, UserRole, UserRoleEnum } from '~/types'
import ScrollVisibilityWrapper from '~/components/scroll-visibility-wrapper/ScrollVisibilityWrapper'
import OfferBanner from '~/components/offer-banner/OfferBanner'
import {
  responseMock,
  loadingMock
} from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.constants'
import { activeButtonActions } from '~/pages/offer-details/OfferDetails.constants'
import { useToggleBookmark } from '~/utils/toggle-bookmark'
import { setField, fetchUserById } from '~/redux/features/editProfileSlice'
import useMutation from '~/hooks/use-mutation'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

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
  const { handleErrorAlert } = useSnackbarAlert()

  const offerDetailsPage = useRef(null)
  const { pageRef } = useOutletContext<OutletContext>()
  const { items } = responseMock

  const titleKey =
    userRole === UserRoleEnum.Tutor
      ? 'userProfilePage.reviews.titleTutor'
      : 'userProfilePage.reviews.titleStudent'

  const responseError = useCallback(
    () => navigate(errorRoutes.notFound.path),
    [navigate]
  )

  const {
    data: offerData,
    isLoading: isOfferLoading,
    refetch: fetchDataOffer,
    isError
  } = useQuery({
    queryKey: ['offer', id],
    queryFn: () => OfferService.getOffer(id),
    options: {
      staleTime: Infinity
    }
  })

  useEffect(() => {
    if (isError) {
      responseError()
    }
  }, [isError, responseError])

  const { mutate: updateOfferDetails, isPending: updateLoading } = useMutation({
    queryKeys: [['offers'], ['offer', id]],
    mutationFn: OfferService.updateOfferWithBaseService,
    onError: responseError
  })

  const handleResponse = (response: string[]) => {
    dispatch(setField({ field: 'bookmarkedOffers', value: response }))
  }

  const toggleBookmark = useToggleBookmark(
    userId,
    handleResponse,
    handleErrorAlert
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

  const handleToggleOfferStatus = () => {
    const status =
      offerData?.status === StatusEnum.Draft
        ? StatusEnum.Active
        : StatusEnum.Draft

    if (offerData) {
      updateOfferDetails({ status, id })
    }
  }

  const handleCloseOffer = async () => {
    const confirmed = await checkConfirmation({
      message: 'offerDetailsPage.closeOffer',
      title: 'titles.confirmTitle',
      check: true
    })
    if (confirmed) {
      updateOfferDetails({ status: StatusEnum.Closed, id })
    }
  }

  const handleEnrollOffer = () => {
    if (offerData) {
      updateOfferDetails({
        enrolledUsers: [...offerData.enrolledUsers, userId],
        id
      })
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
    void dispatch(setPageLoad(isOfferLoading))
  }, [dispatch, isOfferLoading])

  useEffect(() => {
    void dispatch(
      fetchUserById({ userId, role: userRole as UserRole, isEdit: false })
    )
  }, [dispatch, userId, userRole])

  if (isOfferLoading || !offerData) {
    return <Loader pageLoad />
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
            isDetails
            offer={offerData}
            onBookmarkClick={onBookmarkClick}
          />
        </AppCard>
      ) : (
        <AppCard sx={styles.offerCard}>
          <OfferCard
            buttonActions={buttonActions}
            isBookmarked={isBookmarked}
            isDetails
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
      {faqItems && faqItems.length > 0 && (
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
