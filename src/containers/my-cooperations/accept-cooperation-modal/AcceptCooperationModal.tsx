import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import CooperationCard from '~/containers/my-cooperations/cooperation-card/CooperationCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'
import Button from '~scss-components/button/Button'
import Loader from '~/components/loader/Loader'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import useMutation from '~/hooks/use-mutation'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'
import { useModalContext } from '~/context/modal-context'
import { minMaxPrice } from '~/utils/range-filter'
import { cooperationService } from '~/services/cooperation-service'
import { OfferService } from '~/services/offer-service'

import {
  ButtonTypeEnum,
  ComponentEnum,
  type Cooperation,
  type ErrorResponse,
  StatusEnum,
  type UpdateCooperationsParams
} from '~/types'
import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/my-cooperations/accept-cooperation-modal/AcceptCooperation.styles'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface AcceptCooperationModalProps {
  cooperation: Cooperation
}

const AcceptCooperationModal: React.FC<AcceptCooperationModalProps> = ({
  cooperation
}) => {
  const { t } = useTranslation()
  const { isDesktop } = useBreakpoints()
  const { closeModal } = useModalContext()
  const { checkConfirmation } = useConfirm()
  const dispatch = useAppDispatch()
  const [minPrice, maxPrice] = minMaxPrice(cooperation.offer.price, 0.25)

  const needAction = cooperation.user.role !== cooperation.needAction.role

  const handleUpdateCooperation = useCallback(
    (params: Omit<UpdateCooperationsParams, '_id'>) => {
      return cooperationService.updateCooperation({
        _id: cooperation._id,
        ...params
      })
    },
    [cooperation._id]
  )

  const updateOffer = useCallback(
    () =>
      OfferService.updateOffer(cooperation.offer._id, { enrolledUsers: [] }),
    [cooperation.offer._id]
  )

  const onResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'cooperationsPage.acceptModal.successMessage'
      })
    )
    closeModal()
  }

  const onResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const { isPending: isUpdateCooperationPending, mutate: updateCooperation } =
    useMutation({
      mutationFn: handleUpdateCooperation,
      queryKey: ['cooperations'],
      onSuccess: onResponse,
      onError: onResponseError
    })

  const { loading: updateLoading, fetchData: fetchUpdateOffer } = useAxios({
    service: updateOffer,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError
  })

  const handleAcceptCooperation = useCallback(async () => {
    const confirmed = await checkConfirmation({
      message: t('cooperationsPage.acceptModal.confirm.accept', {
        price: cooperation.price
      }),
      title: 'titles.confirmTitle',
      check: true
    })

    if (confirmed) {
      updateCooperation({ status: StatusEnum.Active })
    }
  }, [checkConfirmation, cooperation.price, t, updateCooperation])

  const handleDeclineCooperation = useCallback(async () => {
    const confirmed = await checkConfirmation({
      message: t('cooperationsPage.acceptModal.confirm.decline'),
      title: 'titles.confirmTitle',
      check: true
    })

    if (confirmed) {
      await fetchUpdateOffer()
      updateCooperation({ status: StatusEnum.Closed })
    }
  }, [checkConfirmation, fetchUpdateOffer, t, updateCooperation])

  const handleResendCooperation = useCallback(
    async (data?: Record<'price', number>) => {
      if (!data) {
        return
      }

      const confirmed = await checkConfirmation({
        message: t('cooperationsPage.acceptModal.confirm.resend', {
          price: data.price
        }),
        title: 'titles.confirmTitle',
        check: true
      })

      if (confirmed) {
        updateCooperation({ price: data.price })
      }
    },
    [checkConfirmation, t, updateCooperation]
  )

  const { isDirty, handleNonInputValueChange, handleSubmit } = useForm({
    initialValues: { price: cooperation.price },
    onSubmit: handleResendCooperation,
    submitWithData: true
  })

  const handlePriceChange = (value: number) => {
    handleNonInputValueChange('price', value)
  }

  const onCooperationAccept = () => void handleAcceptCooperation()

  const acceptButtonText = isDirty
    ? 'cooperationsPage.acceptModal.resend'
    : 'cooperationsPage.acceptModal.accept'
  const acceptButtonType = isDirty
    ? ButtonTypeEnum.Submit
    : ButtonTypeEnum.Button

  const buttons =
    isUpdateCooperationPending || updateLoading ? (
      <Loader size={50} />
    ) : (
      <Box sx={styles.buttonRow}>
        {needAction && (
          <>
            <Button onClick={onCooperationAccept} type={acceptButtonType}>
              {t(acceptButtonText)}
            </Button>
            <Button
              onClick={() => void handleDeclineCooperation()}
              variant='tonal'
            >
              {t('cooperationsPage.acceptModal.decline')}
            </Button>
          </>
        )}
      </Box>
    )

  return (
    <Box sx={styles.root}>
      {isDesktop && (
        <CooperationCard cooperation={cooperation} sx={styles.card} />
      )}
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.form}
      >
        <Typography sx={styles.title}>
          {t('cooperationsPage.acceptModal.title')}
        </Typography>
        <TitleWithDescription
          description={cooperation.proficiencyLevel}
          style={styles.titleDescription}
          title={t('cooperationsPage.acceptModal.level')}
        />
        <TitleWithDescription
          description={`${cooperation.offer.price} ${t('common.uah')}`}
          style={styles.titleDescription}
          title={t('cooperationsPage.acceptModal.price')}
        />
        <TitleWithDescription
          description={`${cooperation.price} ${t('common.uah')}`}
          style={styles.titleDescription}
          title={t('cooperationsPage.acceptModal.suggested')}
        />
        {needAction && (
          <SliderWithInput
            defaultValue={cooperation.price}
            max={maxPrice}
            min={minPrice}
            onChange={handlePriceChange}
            title={t('cooperationsPage.acceptModal.riseOrLow')}
          />
        )}
        <Box sx={styles.buttons}>{buttons}</Box>
      </Box>
    </Box>
  )
}

export default AcceptCooperationModal
