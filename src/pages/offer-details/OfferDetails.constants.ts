import { t } from 'i18next'
import { ButtonVariantEnum, StatusEnum } from '~/types'

interface ActiveButtonActionsProps {
  isEnrolled: boolean
  loading: boolean
  oppositeRole: boolean
  myOffer: boolean
  status?: StatusEnum
  handleEnrollOfferClick: () => void
  handleToggleOfferStatus: () => Promise<void>
  handleCloseOffer: () => Promise<void>
}

export const activeButtonActions = ({
  isEnrolled,
  loading,
  oppositeRole,
  myOffer,
  status,
  handleEnrollOfferClick,
  handleToggleOfferStatus,
  handleCloseOffer
}: ActiveButtonActionsProps) => {
  const buttons = []

  if (oppositeRole) {
  if (oppositeRole) {
    buttons.push({
      label: t('common.labels.enrollOffer'),
      buttonProps: {
        loading,
        disabled: isEnrolled,
        onClick: handleEnrollOfferClick
      }
    })
  }

  if (myOffer && status !== StatusEnum.Closed) {
    const label =
      status === StatusEnum.Draft
        ? t('common.labels.makeActive')
        : t('common.labels.moveToDraft')

    buttons.push({
      label,
      buttonProps: {
        onClick: handleToggleOfferStatus
      }
    })

    buttons.push({
      label: t('common.labels.closeOffer'),
      buttonProps: {
        onClick: handleCloseOffer,
        variant: ButtonVariantEnum.Tonal
      }
    })
  } else {
    buttons.push({
      label: t('common.labels.sendMessage'),
      buttonProps: {
        disabled: true,
        variant: ButtonVariantEnum.Tonal
      }
    })
  }

  return buttons
}
