import { FC, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LeakAddSharpIcon from '@mui/icons-material/LeakAddSharp'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useSnackBarContext } from '~/context/snackbar-context'
import { OfferService } from '~/services/offer-service'
import { useAppSelector } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import useAxios from '~/hooks/use-axios'
import TeachingBlock from '~/containers/offer-page/teaching-block/TeachingBlock'
import SpecializationBlock from '~/containers/offer-page/specialization-block/SpecializationBlock'
import FaqBlock from '~/containers/offer-page/faq-block/FaqBlock'
import AppButton from '~/components/app-button/AppButton'

import { authRoutes } from '~/router/constants/authRoutes'
import { createUrlPath, findFullObjects } from '~/utils/helper-functions'
import { snackbarVariants } from '~/constants'
import {
  getInitialValues,
  validations
} from '~/containers/offer-page/OfferPage.constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  CreateOrUpdateOfferData,
  ErrorResponse,
  Offer,
  SizeEnum
} from '~/types'
import { styles } from '~/containers/offer-page/OfferPage.styles'

interface EditOfferProps {
  offer: Offer | null
  closeDrawer: () => void
}

const EditOffer: FC<EditOfferProps> = ({ offer, closeDrawer }) => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { setNeedConfirmation } = useConfirm()
  const { setAlert } = useSnackBarContext()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }
  const onResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'offerPage.editOffer.successMessage'
    })
    closeDrawer()
    navigate(createUrlPath(authRoutes.offerDetails.path, offer?._id))
  }

  const updateOffer = (): Promise<AxiosResponse> => {
    const updateData = { ...data, FAQ: findFullObjects(data.FAQ) }
    return OfferService.updateOffer(offer?._id || '', updateData)
  }

  const { loading, fetchData } = useAxios<null>({
    service: updateOffer,
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
    initialValues: getInitialValues(offer),
    validations,
    onSubmit: fetchData
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [setNeedConfirmation, isDirty])

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
      <Typography sx={styles.title}>
        <LeakAddSharpIcon sx={styles.icon} />
        {t(`offerPage.editOffer.title.${userRole}`)}
      </Typography>
      <Typography sx={styles.description}>
        {t(`offerPage.createOffer.description.${userRole}`)}
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
          {t(`offerPage.editOffer.buttonTitles.${userRole}`)}
        </AppButton>
        <AppButton
          disabled
          size={SizeEnum.ExtraLarge}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('button.addToDrafts')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default EditOffer
