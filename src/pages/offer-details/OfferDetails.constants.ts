import { ButtonVariantEnum, StatusEnum } from '~/types'

interface ActiveButtonActionsProps {
  isEnrolled: boolean
  loading: boolean
  oppositeRole: boolean
  isMyOffer: boolean
  status?: StatusEnum
  handleEnrollOfferClick: () => void
  handleToggleOfferStatus: () => Promise<void>
  handleCloseOffer: () => Promise<void>
  handleSendMessage: () => void
}

export const activeButtonActions = ({
  isEnrolled,
  loading,
  oppositeRole,
  isMyOffer,
  status,
  handleEnrollOfferClick,
  handleToggleOfferStatus,
  handleCloseOffer,
  handleSendMessage
}: ActiveButtonActionsProps) => {
  const buttons = []

  if (oppositeRole) {
    buttons.push({
      label: 'common.labels.enrollOffer',
      buttonProps: {
        loading,
        disabled: isEnrolled,
        onClick: handleEnrollOfferClick
      }
    })
  }

  if (isMyOffer && status !== StatusEnum.Closed) {
    const label =
      status === StatusEnum.Draft
        ? 'common.labels.makeActive'
        : 'common.labels.moveToDraft'

    buttons.push({
      label,
      buttonProps: {
        onClick: handleToggleOfferStatus
      }
    })

    buttons.push({
      label: 'common.labels.closeOffer',
      buttonProps: {
        onClick: handleCloseOffer,
        variant: ButtonVariantEnum.Tonal
      }
    })
  } else {
    buttons.push({
      label: 'common.labels.sendMessage',
      buttonProps: {
        disabled: isMyOffer,
        variant: ButtonVariantEnum.Tonal,
        onClick: handleSendMessage
      }
    })
  }

  return buttons
}
