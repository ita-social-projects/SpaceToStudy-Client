import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import Loader from '~/components/loader/Loader'
import LocationSelectionInputs from '~/components/location-selection-inputs/LocationSelectionInputs'
import { validations } from '~/components/user-steps-wrapper/constants'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useStepContext } from '~/context/step-context'
import useQuery from '~/hooks/use-query'
import useBreakpoints from '~/hooks/use-breakpoints'
import useForm from '~/hooks/use-form'
import { useAppSelector } from '~/hooks/use-redux'
import { userService } from '~/services/user-service'
import { type UserGeneralInfo, type UserRole } from '~/types'

interface GeneralInfoStepProps {
  btnsBox: React.ReactNode
}

type UserName = { firstName: string; lastName: string }

const GeneralInfoStep: React.FC<GeneralInfoStepProps> = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { stepData, handleGeneralInfo } = useStepContext()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const generalInfo = stepData.generalInfo
  const isFirstRender = useRef<boolean>(true)

  const {
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    data,
    errors
  } = useForm<UserGeneralInfo>({
    initialValues: generalInfo.data,
    initialErrors: {
      city: generalInfo.errors['city'] ?? '',
      country: generalInfo.errors['country'] ?? '',
      firstName: generalInfo.errors['firstName'] ?? '',
      lastName: generalInfo.errors['lastName'] ?? '',
      professionalSummary: generalInfo.errors['professionalSummary'] ?? ''
    },
    ...validations
  })

  const getUserById = useCallback(
    () => userService.getUserByIdWithBaseService(userId, userRole as UserRole),
    [userId, userRole]
  )

  const { isLoading: userLoading, data: userResponse } = useQuery({
    queryFn: getUserById,
    queryKey: ['user', userId],
    options: {
      staleTime: Infinity
    }
  })

  useEffect(() => {
    const updateUserName = (user: UserName) => {
      handleNonInputValueChange('firstName', user.firstName)
      handleNonInputValueChange('lastName', user.lastName)
    }
    if (userResponse && isFirstRender.current) {
      updateUserName(userResponse)

      isFirstRender.current = false
    }
  }, [handleNonInputValueChange, userResponse])

  useEffect(() => {
    handleGeneralInfo({ data, errors })
  }, [data, errors, handleGeneralInfo])

  if (userLoading) {
    return (
      <Box sx={styles.container}>
        <Loader />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box component='form' sx={styles.form}>
        <Box>
          <Typography mb='20px'>
            {t('becomeTutor.generalInfo.title')}
          </Typography>
          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}
          <Box sx={styles.formFieldsContainer}>
            <AppTextField
              autoFocus
              errorMsg={t(errors.firstName)}
              fullWidth
              label={t('common.labels.firstName')}
              onBlur={handleBlur('firstName')}
              onChange={handleInputChange('firstName')}
              required
              sx={{ mb: '5px' }}
              type='text'
              value={data.firstName}
            />
            <AppTextField
              errorMsg={t(errors.lastName)}
              fullWidth
              label={t('common.labels.lastName')}
              onBlur={handleBlur('lastName')}
              onChange={handleInputChange('lastName')}
              required
              sx={{ mb: '5px' }}
              type='text'
              value={data.lastName}
            />
            <LocationSelectionInputs
              data={data}
              onDataChange={handleNonInputValueChange}
              sx={{ mb: '30px' }}
            />
          </Box>
          <AppTextArea
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={200}
            onChange={handleInputChange('professionalSummary')}
            type='text'
            value={data.professionalSummary}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
