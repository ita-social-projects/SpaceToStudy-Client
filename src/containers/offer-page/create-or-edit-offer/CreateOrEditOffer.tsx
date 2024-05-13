import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LeakAddSharpIcon from '@mui/icons-material/LeakAddSharp'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import useAxios from '~/hooks/use-axios'
import TeachingBlock from '~/containers/offer-page/teaching-block/TeachingBlock'
import SpecializationBlock from '~/containers/offer-page/specialization-block/SpecializationBlock'
import FaqBlock from '~/containers/offer-page/faq-block/FaqBlock'
import AppButton from '~/components/app-button/AppButton'

import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { snackbarVariants } from '~/constants'
import {
  getInitialValues,
  validations
} from '~/containers/offer-page/create-or-edit-offer/CreateOrEditOffer.constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  CreateOrUpdateOfferData,
  ErrorResponse,
  Offer,
  OfferActionsEnum,
  ServiceFunction,
  SizeEnum,
  StatusEnum
} from '~/types'
import { styles } from '~/containers/offer-page/OfferPage.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface CreateOrUpdateOfferProps {
  existingOffer: Offer | null
  closeDrawer: () => void
  service: ServiceFunction<Offer | null, CreateOrUpdateOfferData>
}

const CreateOrEditOffer: FC<CreateOrUpdateOfferProps> = ({
  existingOffer = null,
  closeDrawer,
  service
}) => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { setNeedConfirmation } = useConfirm()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const offerAction = existingOffer
    ? OfferActionsEnum.Edit
    : OfferActionsEnum.Create

  const onResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }
  const onResponse = (response: Offer | null) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: `offerPage.${offerAction}.successMessage`
      })
    )
    closeDrawer()
    navigate(
      createUrlPath(
        authRoutes.offerDetails.path,
        existingOffer?._id ?? response?._id
      )
    )
  }

  const { loading, fetchData } = useAxios<
    Offer | null,
    CreateOrUpdateOfferData
  >({
    service,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse,
    onResponseError
  })

  const {
    data,
    errors,
    isDirty,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleSubmit
  } = useForm<CreateOrUpdateOfferData>({
    initialValues: getInitialValues(existingOffer),
    validations,
    onSubmit: fetchData,
    submitWithData: true
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [setNeedConfirmation, isDirty])

  const changeStatus = () =>
    handleNonInputValueChange('status', StatusEnum.Draft)

  const isClosed = existingOffer?.status !== StatusEnum.Closed

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
      <Typography sx={styles.title}>
        <LeakAddSharpIcon sx={styles.icon} />
        {t(`offerPage.${offerAction}.title.${userRole}`)}
      </Typography>
      <Typography sx={styles.description}>
        {t(`offerPage.${offerAction}.description.${userRole}`)}
      </Typography>
      <SpecializationBlock
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleNonInputValueChange={handleNonInputValueChange}
      />
      <TeachingBlock
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
      />
      <FaqBlock
        data={data}
        handleNonInputValueChange={handleNonInputValueChange}
      />
      <Box sx={styles.buttonBox}>
        <AppButton
          loading={loading}
          size={SizeEnum.ExtraLarge}
          sx={styles.submit}
          type={ButtonTypeEnum.Submit}
        >
          {t(`offerPage.${offerAction}.buttonTitles.${userRole}`)}
        </AppButton>
        {isClosed && (
          <AppButton
            onClick={changeStatus}
            size={SizeEnum.ExtraLarge}
            type={ButtonTypeEnum.Submit}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('button.addToDrafts')}
          </AppButton>
        )}
      </Box>
    </Box>
  )
}

export default CreateOrEditOffer
