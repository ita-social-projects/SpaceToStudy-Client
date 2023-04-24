import { FC, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'

import LeakAddSharpIcon from '@mui/icons-material/LeakAddSharp'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useAppSelector } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import useAxios from '~/hooks/use-axios'
import TeachingBlock from '~/containers/offer-page/create-offer/teaching-block/TeachingBlock'
import SpecializationBlock from '~/containers/offer-page/create-offer/specialization-block/SpecializationBlock'
import AppButton from '~/components/app-button/AppButton'
import { OfferService } from '~/services/offer-service'
import { useSnackBarContext } from '~/context/snackbar-context'

import { snackbarVariants } from '~/constants'
import {
  initialValues,
  validations
} from '~/containers/offer-page/create-offer/CreateOffer.constants'
import { styles } from '~/containers/offer-page/create-offer/CreateOffer.styles'
import { ErrorResponse } from '~/types'

export interface CreateOfferData {
  categoryId: string
  subjectId: string
  proficiencyLevel: string[]
  languages: string[]
  description: string
  price: string
}

interface CreateOfferProps {
  closeDrawer: () => void
}

const CreateOffer: FC<CreateOfferProps> = ({ closeDrawer }) => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { setNeedConfirmation } = useConfirm()
  const { setAlert } = useSnackBarContext()

  const { t } = useTranslation()

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }
  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'offerPage.createOffer.successMessage'
    })
    closeDrawer()
  }

  const postOffer = (): Promise<AxiosResponse> => OfferService.createOffer(data)

  const { loading, fetchData } = useAxios({
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

  return (
    <Box component='form' onSubmit={(e) => handleSubmit(e)} sx={styles.root}>
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
      <Box sx={styles.buttonBox}>
        <AppButton
          loading={loading}
          size='extraLarge'
          sx={{ minWidth: '166px' }}
          type='submit'
        >
          {t(`offerPage.createOffer.buttonTitles.${userRole}`)}
        </AppButton>
        <AppButton size='extraLarge' variant='tonal'>
          {t('button.addToDrafts')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateOffer
