import { FC, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'

import { useChatContext } from '~/context/chat-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import OfferCard from '~/components/offer-card/OfferCard'
import AppCard from '~/components/app-card/AppCard'
import { authRoutes } from '~/router/constants/authRoutes'

import { createUrlPath } from '~/utils/helper-functions'
import { CardsView, Offer, CardsViewEnum, ButtonVariantEnum } from '~/types'
import { styles } from '~/containers/find-offer/offer-container/OfferContainer.styles'

interface OfferContainerProps {
  viewMode: CardsView
  offerCards: Offer[]
}

const OfferContainer: FC<OfferContainerProps> = ({ viewMode, offerCards }) => {
  const { t } = useTranslation()
  const { isMobile, isLaptopAndAbove } = useBreakpoints()
  const { setChatInfo } = useChatContext()

  const onBookmarkClick = (id: string) => {
    console.log(id)
  }

  const renderSquareCard =
    isMobile || (isLaptopAndAbove && viewMode === CardsViewEnum.Grid)

  const onClickOpenChat = (el: Offer) =>
    setChatInfo({
      author: el.author,
      authorRole: el.authorRole,
      chatId: el.chatId
    })

  const offerItems = offerCards.map((el) => {
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
              offer={el}
              onBookmarkClick={onBookmarkClick}
            />
          </AppCard>
        ) : (
          <AppCard sx={styles.appCard}>
            <OfferCard
              buttonActions={buttonActions}
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
