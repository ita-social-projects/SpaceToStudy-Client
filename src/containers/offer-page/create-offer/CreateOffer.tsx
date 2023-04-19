import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import LeakAddSharpIcon from '@mui/icons-material/LeakAddSharp'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

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

export interface CreateOfferData {
  category: string | null
  subject: string | null
  proficiencyLevel: string[]
  languages: string[]
  description: string
  price: string
}

interface CreateOfferProps {
  closeDrawer: () => void
}

const CreateOffer: FC<CreateOfferProps> = ({ closeDrawer }) => {
  const { userRole } = useSelector((state) => state.appMain)
  const { setNeedConfirmation } = useConfirm()
  const { setAlert } = useSnackBarContext()

  const { t } = useTranslation()

  const postOffer = () => OfferService.createOffer(data)

  const {
    response,
    error,
    loading,
    fetchData: createOffer
  } = useAxios({
    service: postOffer,
    fetchOnMount: false
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
    onSubmit: createOffer
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [setNeedConfirmation, isDirty])

  useEffect(() => {
    if (error) {
      setAlert({
        severity: snackbarVariants.error,
        message: `errors.${error}`
      })
    }
    if (response) {
      setAlert({
        severity: snackbarVariants.success,
        message: 'offerPage.createOffer.successMessage'
      })
      closeDrawer()
    }
  }, [error, response, setAlert, closeDrawer])

  const handleAutocompleteChange =
    (key: keyof CreateOfferData) =>
    (_: React.ChangeEvent<HTMLInputElement>, value: string | null) => {
      if (key === 'languages') {
        value &&
          !data.languages.includes(value) &&
          handleNonInputValueChange(key, [...data.languages, value])
      } else {
        handleNonInputValueChange(key, value)
      }
    }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.root}>
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
        handleAutocompleteChange={handleAutocompleteChange}
        handleBlur={handleBlur}
        handleNonInputValueChange={handleNonInputValueChange}
      />
      <TeachingBlock
        data={data}
        errors={errors}
        handleAutocompleteChange={handleAutocompleteChange}
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
