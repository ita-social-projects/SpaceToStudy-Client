import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'

import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { useModalContext } from '~/context/modal-context'
import { useAppDispatch } from '~/hooks/use-redux'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppSelect from '~/components/app-select/AppSelect'
import AppButton from '~/components/app-button/AppButton'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

import { cooperationService } from '~/services/cooperation-service'
import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/offer-details/enroll-offer/EnrollOffer.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { minMaxPrice } from '~/utils/range-filter'

import {
  ComponentEnum,
  ErrorResponse,
  Offer,
  EnrollOfferForm,
  ButtonTypeEnum
} from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface EnrollOfferProps {
  offer: Offer
  enrollOffer: () => Promise<void>
}

const EnrollOffer: FC<EnrollOfferProps> = ({ offer, enrollOffer }) => {
  const { isLaptopAndAbove } = useBreakpoints()
  const { closeModal } = useModalContext()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [minPrice, maxPrice] = minMaxPrice(offer.price, 0.25)

  const handleResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }
  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'offerDetailsPage.enrollOffer.successMessage'
      })
    )
    closeModal()
    void enrollOffer()
  }

  const postOffer = (): Promise<AxiosResponse> => {
    return cooperationService.createCooperation({
      ...data,
      receiver: offer.author._id,
      receiverRole: offer.authorRole,
      offer: offer._id
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
        price: offer.price,
        info: '',
        title: offer.title
      },
      onSubmit: fetchData
    })

  const levelOptions = offer.proficiencyLevel.map((level) => ({
    title: level,
    value: level
  }))

  const handleFieldChange =
    <K extends keyof EnrollOfferForm>(key: K) =>
    (value: EnrollOfferForm[K]) => {
      handleNonInputValueChange(key, value)
    }

  return (
    <Box sx={styles.root}>
      {isLaptopAndAbove && (
        <AppCard sx={styles.offerCard}>
          <OfferCardSquare offer={offer} />
        </AppCard>
      )}
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
          setValue={handleFieldChange('proficiencyLevel')}
          sx={styles.select}
          value={data.proficiencyLevel}
        />
        <SliderWithInput
          defaultValue={offer.price}
          max={maxPrice}
          min={minPrice}
          onChange={handleFieldChange('price')}
          title={t('offerDetailsPage.enrollOffer.labels.preferredPrice')}
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
        <AppButton
          loading={loading}
          sx={styles.button}
          type={ButtonTypeEnum.Submit}
        >
          {t('button.createCooperation')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default EnrollOffer
