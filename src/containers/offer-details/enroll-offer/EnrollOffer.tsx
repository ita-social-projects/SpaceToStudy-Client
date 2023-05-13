import { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'

import Box from '@mui/material/Box'

import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { ModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppSelect from '~/components/app-select/AppSelect'
import AppButton from '~/components/app-button/AppButton'

import { cooperationService } from '~/services/cooperation-service'
import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/offer-details/enroll-offer/EnrollOffer.styles'
import { ComponentEnum, ErrorResponse, Offer, EnrollOfferForm } from '~/types'

interface EnrollOfferProps {
  offer: Offer
}

const EnrollOffer: FC<EnrollOfferProps> = ({ offer }) => {
  const { closeModal } = useContext(ModalContext)
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
      message: 'offerDetailsPage.enrollOffer.successMessage'
    })
    closeModal()
  }

  const postOffer = (): Promise<AxiosResponse> => {
    return cooperationService.createCooperation({
      ...data,
      recipientUserId: offer.author._id,
      price: offer.price,
      offerId: offer._id
    })
  }

  const { loading, fetchData } = useAxios({
    service: postOffer,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const { data, handleInputChange, handleNonInputValueChange, handleSubmit } =
    useForm<EnrollOfferForm>({
      initialValues: {
        proficiencyLevel: offer.proficiencyLevel[0],
        language: offer.languages[0],
        info: ''
      },
      onSubmit: fetchData
    })

  const languagelOptions = offer.languages.map((language) => ({
    title: t(`common.languages.${language.toLowerCase()}`),
    value: language
  }))

  const levelOptions = offer.proficiencyLevel.map((level) => ({
    title: t(`common.levels.${level.toLowerCase()}`),
    value: level
  }))

  const handleSelectChange =
    <K extends keyof EnrollOfferForm>(key: K) =>
    (value: EnrollOfferForm[K]) => {
      handleNonInputValueChange(key, value)
    }

  return (
    <Box sx={styles.root}>
      <AppCard sx={styles.offerCard}>
        <OfferCardSquare offer={offer} />
      </AppCard>
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.form}
      >
        <TitleWithDescription
          description={t('offerDetailsPage.enrollOffer.description')}
          style={styles.titleDescription}
          title={t('offerDetailsPage.enrollOffer.title')}
        />
        <AppSelect
          fields={levelOptions}
          fullWidth
          label={t('offerDetailsPage.enrollOffer.labels.level')}
          selectTitle={t('offerDetailsPage.enrollOffer.inputs.level')}
          setValue={handleSelectChange('proficiencyLevel')}
          sx={styles.select}
          value={data.proficiencyLevel}
        />
        <AppSelect
          fields={languagelOptions}
          fullWidth
          label={t('offerDetailsPage.enrollOffer.labels.language')}
          selectTitle={t('offerDetailsPage.enrollOffer.inputs.language')}
          setValue={handleSelectChange('language')}
          sx={styles.select}
          value={data.language}
        />
        <AppTextArea
          fullWidth
          label={t('offerDetailsPage.enrollOffer.labels.info')}
          maxLength={1000}
          onChange={handleInputChange('info')}
          sx={styles.textArea}
          title={t('offerDetailsPage.enrollOffer.inputs.info')}
          value={data.info}
        />
        <AppButton loading={loading} sx={styles.button} type='submit'>
          {t('button.createCooperation')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default EnrollOffer
