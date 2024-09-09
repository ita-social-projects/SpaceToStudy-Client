import { FC, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'

import { useChatContext } from '~/context/chat-context'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import useBreakpoints from '~/hooks/use-breakpoints'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import OfferCard from '~/components/offer-card/OfferCard'
import AppCard from '~/components/app-card/AppCard'
import { authRoutes } from '~/router/constants/authRoutes'

import { createUrlPath } from '~/utils/helper-functions'
import {
  CardsView,
  Offer,
  CardsViewEnum,
  ButtonVariantEnum,
  ErrorResponse
} from '~/types'
import { styles } from '~/containers/find-offer/offer-container/OfferContainer.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'
import { getErrorKey } from '~/utils/get-error-key'
import { setField } from '~/redux/features/editProfileSlice'
import { useToggleBookmark } from '~/utils/toggle-bookmark'

interface OfferContainerProps {
  viewMode: CardsView
  offerCards: Offer[]
  updateOffersInfo: () => void
}

const OfferContainer: FC<OfferContainerProps> = ({
  viewMode,
  offerCards,
  updateOffersInfo
}) => {
  const { t } = useTranslation()
  const { isMobile, isLaptopAndAbove } = useBreakpoints()
  const { setChatInfo } = useChatContext()
  const { userId } = useAppSelector((state) => state.appMain)
  const { bookmarkedOffers } = useAppSelector((state) => state.editProfile)
  const dispatch = useAppDispatch()

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

  const onBookmarkClick = (id: string) => {
    void toggleBookmark(id)
  }

  const renderSquareCard =
    isMobile || (isLaptopAndAbove && viewMode === CardsViewEnum.Grid)

  const onClickOpenChat = (el: Offer) =>
    setChatInfo({
      author: el.author,
      authorRole: el.authorRole,
      chatId: el.chatId,
      updateInfo: updateOffersInfo
    })

  const offerItems = offerCards.map((el) => {
    const isBookmarked = bookmarkedOffers.includes(el._id)

    const buttonActions = [
      {
        label: t('common.labels.viewDetails'),
        buttonProps: {
          component: Link,
          to: createUrlPath(authRoutes.offerDetails.path, el._id)
        }
      },
      {
        label: t('common.labels.sendMessage'),
        buttonProps: {
          disabled: el.author._id === userId,
          variant: ButtonVariantEnum.Tonal,
          onClick: () => onClickOpenChat(el)
        }
      }
    ]

    return (
      <Fragment key={el._id}>
        {renderSquareCard ? (
          <AppCard sx={styles.appCardSquare}>
            <OfferCardSquare
              buttonActions={buttonActions}
              isBookmarked={isBookmarked}
              offer={el}
              onBookmarkClick={onBookmarkClick}
            />
          </AppCard>
        ) : (
          <AppCard sx={styles.appCard}>
            <OfferCard
              buttonActions={buttonActions}
              isBookmarked={isBookmarked}
              offer={el}
              onBookmarkClick={onBookmarkClick}
            />
          </AppCard>
        )}
      </Fragment>
    )
  })

  return (
    <Box
      data-testid='OfferContainer'
      sx={styles.offerContainer(viewMode === CardsViewEnum.Grid)}
    >
      {offerItems}
    </Box>
  )
}

export default OfferContainer
