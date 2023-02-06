import { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { LocationService } from '~/services/location-service'

import { createFilterOptions } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { useStepContext } from '~/context/step-context'
import { validations } from '~/containers/tutor-home-page/constants'
import { styles } from '~/containers/tutor-home-page/general-info/general-info.styles'

const GeneralInfo = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
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
    setData((prev) => prev.country !== value && { ...data, country: value, city: null })
    if (value) await fetchCities(value)
  }

  const onChangeCity = (_, value) => {
    setData({ ...data, city: value })
  }

  const getCountries = useCallback(() => LocationService.getCountries(), [])
  const getCities = useCallback((country) => LocationService.getCities(country), [])

  const { response: countries } = useAxios({ service: getCountries })
  const {
    loading,
    fetchData: fetchCities,
    response: cities
  } = useAxios({ service: getCities, fetchOnMount: false, clearResponse: true })

  useEffect(() => {
    handleStepData(stepLabel, data, errors)
  }, [data, errors, stepLabel, handleStepData])

  return (
    <Box sx={styles.container}>
      {isDesktop && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box component='form' sx={styles.form}>
        <Box>
          <Typography mb='20px'>{t('becomeTutor.generalInfo.title')}</Typography>

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
              fieldValue={data.country}
              label={t('common.labels.country')}
              onChange={onChangeCountry}
              options={countries}
              sx={{ mb: '30px' }}
              type='text'
            />

            <AppAutoComplete
              disabled={!data.country}
              fieldValue={data.city}
              filterOptions={filterOptions}
              label={t('common.labels.city')}
              loading={loading}
              onChange={onChangeCity}
              options={cities}
              sx={{ mb: '30px' }}
              type='text'
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

export default GeneralInfo
