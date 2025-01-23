import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import useMutation from '~/hooks/use-mutation'
import useForm from '~/hooks/use-form'
import { useModalContext } from '~/context/modal-context'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import OfferCardSquare from '~/containers/find-offer/offer-card-square/OfferCardSquare'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppSelect from '~/components/app-select/AppSelect'
import Button from '~scss-components/button/Button'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

import { cooperationService } from '~/services/cooperation-service'
import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/offer-details/enroll-offer/EnrollOffer.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { minMaxPrice } from '~/utils/range-filter'

import {
  ComponentEnum,
  type Offer,
  type EnrollOfferForm,
  ButtonTypeEnum,
  TypographyVariantEnum
} from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { textField } from '~/utils/validations/common'
import { Typography } from '@mui/material'
import { type ResponseError } from '~/exceptions'

interface EnrollOfferProps {
  offer: Offer
  enrollOffer: () => Promise<void>
}

const EnrollOffer: React.FC<EnrollOfferProps> = ({ offer, enrollOffer }) => {
  const { isLaptopAndAbove } = useBreakpoints()
  const { closeModal } = useModalContext()
  const { bookmarkedOffers } = useAppSelector((state) => state.editProfile)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [minPrice, maxPrice] = minMaxPrice(offer.price, 0.25)

  const handleResponseError = (error: ResponseError) => {
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

  const { isPending, mutate: createCooperation } = useMutation({
    mutationFn: cooperationService.createCooperation,
    queryKey: ['cooperations'],
    onError: handleResponseError,
    onSuccess: handleResponse
  })

  const validateAdditionalInfo = (additionalInfoValue: string) => {
    if (additionalInfoValue.length === 0) {
      delete data.additionalInfo
    }
    if (additionalInfoValue.length < 30 && additionalInfoValue.length !== 0) {
      return textField(30, 1000)
    }
  }

  const validations = {
    additionalInfo: validateAdditionalInfo
  }

  const {
    data,
    errors,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit
  } = useForm<EnrollOfferForm>({
    initialValues: {
      proficiencyLevel: offer.proficiencyLevel[0],
      price: offer.price,
      additionalInfo: '',
      title: offer.title
    },
    validations: validations,
    submitWithData: true,
    onSubmit: (data) => {
      if (data) {
        createCooperation({
          ...data,
          receiver: offer.author._id,
          receiverRole: offer.authorRole,
          offer: offer._id
        })
      }
    }
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

  const isBookmarked = bookmarkedOffers.includes(offer._id)

  return (
    <Box sx={styles.root}>
      {isLaptopAndAbove && (
        <AppCard sx={styles.offerCard}>
          <OfferCardSquare isBookmarked={isBookmarked} offer={offer} />
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
        <Box>
          <AppTextArea
            fullWidth
            label={t('offerDetailsPage.enrollOffer.labels.info')}
            maxLength={1000}
            minLength={30}
            onChange={handleInputChange('additionalInfo')}
            sx={styles.textArea}
            title={t('offerDetailsPage.enrollOffer.inputs.info')}
            value={data.additionalInfo}
          />
          {errors.additionalInfo && (
            <Typography
              color='error'
              sx={styles.errorText}
              variant={TypographyVariantEnum.Caption}
            >
              {t('offerDetailsPage.errors.additionalInfo')}
            </Typography>
          )}
        </Box>
        <Button
          loading={isPending}
          sx={styles.button}
          type={ButtonTypeEnum.Submit}
        >
          {t('button.createCooperation')}
        </Button>
      </Box>
    </Box>
  )
}

export default EnrollOffer
