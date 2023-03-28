import { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { LocationService } from '~/services/location-service'
import { userService } from '~/services/user-service'

import { createFilterOptions } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import Loader from '~/components/loader/Loader'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { useStepContext } from '~/context/step-context'
import { validations } from '~/containers/tutor-home-page/constants'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({
  btnsBox,
  stepLabel,
  isUserFetched,
  setIsUserFetched
}) => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
  const { userId, userRole } = useSelector((state) => state.appMain)
  const generalInfo = stepData[stepLabel]

  const { handleChange, handleBlur, setData, data, errors } = useForm({
    initialValues: generalInfo.data,
    errorValues: generalInfo.errors,
    validations
  })

  const filterOptions = (options, state) => {
    const defaultFilterOptions = createFilterOptions()
    return defaultFilterOptions(options, state).slice(0, 300)
  }

  const onChangeCountry = async (_, value) => {
    setData(
      (prev) =>
        prev.country !== value && { ...data, country: value, city: null }
    )
    if (value) await fetchCities(value)
  }

  const onChangeCity = (_, value) => {
    setData({ ...data, city: value })
  }

  const getUserById = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const getCountries = useCallback(() => LocationService.getCountries(), [])
  const getCities = useCallback(
    (country) => LocationService.getCities(country),
    []
  )

  const { response: user, loading: userLoading } = useAxios({
    service: getUserById
  })
  const { response: countries } = useAxios({ service: getCountries })
  const {
    loading,
    fetchData: fetchCities,
    response: cities
  } = useAxios({ service: getCities, fetchOnMount: false, clearResponse: true })

  useEffect(() => {
    if (!userLoading && !isUserFetched) {
      const { firstName, lastName } = user.data
      setData({ ...data, firstName, lastName })
      setIsUserFetched(true)
    }
  }, [isUserFetched, setIsUserFetched, user, userLoading, setData, data])

  useEffect(() => {
    handleStepData(stepLabel, data, errors)
  }, [data, errors, stepLabel, handleStepData])

  if (userLoading) {
    return (
      <Box sx={styles.container}>
        <Loader size={70} />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      {isDesktop && (
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
              onChange={handleChange('firstName')}
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
              onChange={handleChange('lastName')}
              required
              sx={{ mb: '5px' }}
              type='text'
              value={data.lastName}
            />

            <AppAutoComplete
              onChange={onChangeCountry}
              options={countries}
              sx={{ mb: '30px' }}
              textFieldProps={{
                label: t('common.labels.country')
              }}
              type='text'
              value={data.country}
            />

            <AppAutoComplete
              disabled={!data.country}
              filterOptions={filterOptions}
              loading={loading}
              onChange={onChangeCity}
              options={cities}
              sx={{ mb: '30px' }}
              textFieldProps={{
                label: t('common.labels.city')
              }}
              type='text'
              value={data.city}
            />
          </Box>

          <AppTextField
            fullWidth
            inputProps={{ maxLength: 70 }}
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxRows='4'
            minRows='4'
            multiline
            onChange={handleChange('experience')}
            type='text'
            value={data.experience}
          />
          <Typography
            color={data.experience.length === 70 ? 'error' : 'text'}
            sx={styles.experienceLength}
            variant='caption'
          >
            {`${data.experience.length}/70`}
          </Typography>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
