import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import CooperationCard from '~/containers/my-cooperations/cooperation-card/CooperationCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'
import AppButton from '~/components/app-button/AppButton'
import Loader from '~/components/loader/Loader'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'
import { useModalContext } from '~/context/modal-context'
import { minMaxPrice } from '~/utils/range-filter'
import { cooperationService } from '~/services/cooperation-service'
import { OfferService } from '~/services/offer-service'

import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  Cooperation,
  ErrorResponse,
  StatusEnum,
  UpdateCooperationsParams
} from '~/types'
import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/my-cooperations/accept-cooperation-modal/AcceptCooperation.styles'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface AcceptCooperationModalProps {
  cooperation: Cooperation
  getCooperations: () => Promise<void>
}

const AcceptCooperationModal: FC<AcceptCooperationModalProps> = ({
  cooperation,
  getCooperations
}) => {
  const { t } = useTranslation()
  const { isDesktop } = useBreakpoints()
  const { closeModal } = useModalContext()
  const { checkConfirmation } = useConfirm()
  const dispatch = useAppDispatch()
  const [minPrice, maxPrice] = minMaxPrice(cooperation.offer.price, 0.25)

  const needAction = cooperation.user.role !== cooperation.needAction

  const handleUpdateCooperation = (
    params?: UpdateCooperationsParams
  ): Promise<AxiosResponse> =>
    cooperationService.updateCooperation({
      _id: cooperation._id,
      ...params
    })

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
    void getCooperations()
  }

  const onResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const { loading, fetchData } = useAxios({
    service: handleUpdateCooperation,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse,
    onResponseError
  })

  const { loading: updateLoading, fetchData: fetchUpdateOffer } = useAxios({
    service: updateOffer,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError
  })

  const handleAcceptCooperation = async () => {
    const confirmed = await checkConfirmation({
      message: t('cooperationsPage.acceptModal.confirm.accept', {
        price: cooperation.price
      }),
      title: 'titles.confirmTitle',
      check: true
    })
    if (confirmed) return fetchData({ status: StatusEnum.Active })
  }

  const handleDeclineCooperation = async () => {
    const confirmed = await checkConfirmation({
      message: t('cooperationsPage.acceptModal.confirm.decline'),
      title: 'titles.confirmTitle',
      check: true
    })
    if (confirmed) {
      await fetchUpdateOffer()
      return fetchData({ status: StatusEnum.Closed })
    }
  }

  const handleResendCooperation = async (): Promise<void> => {
    const confirmed = await checkConfirmation({
      message: t('cooperationsPage.acceptModal.confirm.resend', {
        price: data.price
      }),
      title: 'titles.confirmTitle',
      check: true
    })
    if (confirmed) return fetchData({ price: data.price })
  }

  const { data, isDirty, handleNonInputValueChange, handleSubmit } = useForm({
    initialValues: { price: cooperation.price },
    onSubmit: handleResendCooperation
  })

  const handlePriceChange = (value: number) => {
    handleNonInputValueChange('price', value)
  }

  const onCooperationAccept = () => void handleAcceptCooperation()

  const buttons =
    loading || updateLoading ? (
      <Loader size={50} />
    ) : (
      <>
        {needAction && (
          <AppButton
            disabled={!isDirty}
            type={ButtonTypeEnum.Submit}
            variant={ButtonVariantEnum.ContainedLight}
          >
            {t('cooperationsPage.acceptModal.resend')}
          </AppButton>
        )}
        <Box sx={styles.buttonRow}>
          {needAction && (
            <AppButton onClick={onCooperationAccept}>
              {t('cooperationsPage.acceptModal.accept')}
            </AppButton>
          )}
          <AppButton
            onClick={() => void handleDeclineCooperation()}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('cooperationsPage.acceptModal.decline')}
          </AppButton>
        </Box>
      </>
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
