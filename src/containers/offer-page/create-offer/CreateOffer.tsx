import { FC, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import LeakAddSharpIcon from '@mui/icons-material/LeakAddSharp'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useAppSelector } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import useAxios from '~/hooks/use-axios'
import TeachingBlock from '~/containers/offer-page/create-offer/teaching-block/TeachingBlock'
import SpecializationBlock from '~/containers/offer-page/create-offer/specialization-block/SpecializationBlock'
import FaqBlock from '~/containers/offer-page/create-offer/faq-block/FaqBlock'
import AppButton from '~/components/app-button/AppButton'
import { OfferService } from '~/services/offer-service'
import { useSnackBarContext } from '~/context/snackbar-context'

import { snackbarVariants } from '~/constants'
import {
  initialValues,
  validations
} from '~/containers/offer-page/create-offer/CreateOffer.constants'
import { createUrlPath, findFullObjects } from '~/utils/helper-functions'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  CreateOfferData,
  ErrorResponse,
  Offer,
  SizeEnum,
  StatusEnum
} from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/offer-page/create-offer/CreateOffer.styles'

interface CreateOfferProps {
  closeDrawer: () => void
}

const CreateOffer: FC<CreateOfferProps> = ({ closeDrawer }) => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { setNeedConfirmation } = useConfirm()
  const { setAlert } = useSnackBarContext()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }
  const handleResponse = (response: Offer | null) => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'offerPage.createOffer.successMessage'
    })
    closeDrawer()
    navigate(createUrlPath(authRoutes.offerDetails.path, response?._id))
  }

  const postOffer = (): Promise<AxiosResponse> =>
    OfferService.createOffer({ ...data, FAQ: findFullObjects(data.FAQ) })

  const { loading, fetchData } = useAxios<Offer | null>({
    service: postOffer,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const {
    data,
    errors,
    isDirty,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleSubmit
  } = useForm<CreateOfferData>({
    initialValues,
    validations,
    onSubmit: fetchData
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [setNeedConfirmation, isDirty])

  const changeStatus = () =>
    handleNonInputValueChange('status', StatusEnum.Draft)

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
      <Typography sx={styles.title}>
        <LeakAddSharpIcon sx={styles.icon} />
        {t(`offerPage.createOffer.title.main.${userRole}`)}
      </Typography>
      <Typography sx={styles.description}>
        {t(`offerPage.createOffer.description.main.${userRole}`)}
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
          {t(`offerPage.createOffer.buttonTitles.${userRole}`)}
        </AppButton>
        <AppButton
          onClick={changeStatus}
          size={SizeEnum.ExtraLarge}
          type={ButtonTypeEnum.Submit}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('button.addToDrafts')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateOffer
