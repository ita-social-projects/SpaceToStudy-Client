import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { MutationFunction } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import LeakAddSharpIcon from '@mui/icons-material/LeakAddSharp'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useAppSelector } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import useMutation from '~/hooks/use-mutation'
import TeachingBlock from '~/containers/offer-page/teaching-block/TeachingBlock'
import SpecializationBlock from '~/containers/offer-page/specialization-block/SpecializationBlock'
import FaqBlock from '~/containers/offer-page/faq-block/FaqBlock'
import Button from '~scss-components/button/Button'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { snackbarVariants } from '~/constants'
import {
  getInitialValues,
  validations
} from '~/containers/offer-page/create-or-edit-offer/CreateOrEditOffer.constants'
import {
  type CreateOrUpdateOfferData,
  type Offer,
  ButtonTypeEnum,
  ComponentEnum,
  OfferActionsEnum,
  StatusEnum,
  UserRoleEnum
} from '~/types'
import { styles } from '~/containers/offer-page/OfferPage.styles'

interface CreateOrUpdateOfferProps {
  existingOffer?: Offer | null
  closeDrawer: () => void
  service: MutationFunction<Offer | null, CreateOrUpdateOfferData>
  updateOffer?: Dispatch<SetStateAction<boolean>>
}

const CreateOrEditOffer: FC<CreateOrUpdateOfferProps> = ({
  existingOffer = null,
  closeDrawer,
  service,
  updateOffer
}) => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { setNeedConfirmation } = useConfirm()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { hash } = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDrafting, setIsDrafting] = useState(false)
  const { handleAlert, handleErrorAlert } = useSnackbarAlert()

  const offerAction = existingOffer
    ? OfferActionsEnum.Edit
    : OfferActionsEnum.Create

  const onResponse = (response: Offer | null) => {
    const isHash = hash === '#offer'

    handleAlert(
      isHash
        ? {
            severity: snackbarVariants.success,
            message: `offerPage.createOffer.extendedSuccessMessage.${userRole}`,
            duration: 10000,
            isExtended: true,
            route:
              userRole === UserRoleEnum.Tutor
                ? authRoutes.myOffers.path
                : authRoutes.myRequests.path
          }
        : {
            severity: snackbarVariants.success,
            message: `offerPage.${offerAction}.successMessage`
          }
    )

    closeDrawer()

    if (hash == '#offer') {
      navigate(`${authRoutes.myProfile.path}#complete`)
      updateOffer!(true)
    } else {
      navigate(
        createUrlPath(
          authRoutes.offerDetails.path,
          existingOffer?._id ?? response?._id
        )
      )
    }
  }

  const offerQueryKeys = existingOffer
    ? [['offers'], ['offer', existingOffer._id]]
    : [['offers']]

  const { isPending: offerPending, mutate: mutateOffer } = useMutation({
    queryKeys: offerQueryKeys,
    mutationFn: service,
    onSuccess: onResponse,
    onError: handleErrorAlert
  })

  const handleOfferSubmit = () => {
    if (data) {
      mutateOffer(data)
    }
  }

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
    onSubmit: handleOfferSubmit,
    submitWithData: true
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [setNeedConfirmation, isDirty])

  const changeStatus = () =>
    handleNonInputValueChange('status', StatusEnum.Draft)

  const handleSubmitClick = () => {
    setIsSubmitting(true)
  }

  const handleDraftClick = () => {
    setIsDrafting(true)
    changeStatus()
  }

  const isMovableToDrafts =
    existingOffer?.status !== StatusEnum.Closed &&
    existingOffer?.status !== StatusEnum.Draft

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
        <Button
          loading={offerPending && isSubmitting}
          onClick={handleSubmitClick}
          size='lg'
          sx={styles.submit}
          type={ButtonTypeEnum.Submit}
        >
          {t(`offerPage.${offerAction}.buttonTitles.${userRole}`)}
        </Button>
        {isMovableToDrafts && (
          <Button
            loading={offerPending && isDrafting}
            onClick={handleDraftClick}
            size='lg'
            type={ButtonTypeEnum.Submit}
            variant='tonal'
          >
            {t('button.addToDrafts')}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default CreateOrEditOffer
