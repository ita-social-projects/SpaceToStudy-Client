import { TFunction } from 'react-i18next'
import { ButtonVariantEnum, StatusEnum } from '~/types'

interface ActiveButtonActionsProps {
  opositeRole: boolean
  myOffer: boolean
  status?: StatusEnum
  handleEnrollOfferClick: () => void
  handleToggleOfferStatus: () => Promise<void>
  handleCloseOffer: () => Promise<void>
  t: TFunction<'translation', undefined>
}

export const activeButtonActions = ({
  opositeRole,
  myOffer,
  status,
  handleEnrollOfferClick,
  handleToggleOfferStatus,
  handleCloseOffer,
  t
}: ActiveButtonActionsProps) => {
  const buttons = []

  if (opositeRole) {
    buttons.push({
      label: t('common.labels.enrollOffer'),
      buttonProps: {
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
