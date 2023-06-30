import { TFunction } from 'react-i18next'
import { ButtonVariantEnum, StatusEnum } from '~/types'

interface ActiveButtonActionsProps {
  opositeRole: boolean
  myOffer: boolean
  status?: StatusEnum
  handleEnrollOfferClick: () => void
  handleToggleOfferStatus: () => void
  t: TFunction<'translation', undefined>
}

export const activeButtonActions = ({
  opositeRole,
  myOffer,
  status,
  handleEnrollOfferClick,
  handleToggleOfferStatus,
  t
}: ActiveButtonActionsProps) => [
  opositeRole
    ? {
        label: t('common.labels.enrollOffer'),
        buttonProps: {
          onClick: handleEnrollOfferClick
        }
      }
    : null,
  myOffer
    ? {
        label:
          status === StatusEnum.Draft
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
