import { useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { LocationService } from '~/services/location-service'

import { createFilterOptions } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { styles } from '~/containers/tutor-home-page/general-info/general-info.styles'

const GeneralInfo = ({ data, handleChange, handleBlur, errors, btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const [counterColor, setCounterColor] = useState('#263238')
  const [fetched, setFetched] = useState(false)
  const [cities, setCities] = useState([])

  const filterOptions = (options, state) => {
    const defaultFilterOptions = createFilterOptions()
    return defaultFilterOptions(options, state).slice(0, 300)
  }

  const getCountries = useCallback(() => LocationService.getCountries(), [])
  const getCities = useCallback(() => LocationService.getCities(data.country), [data.country])

  const { response: countries } = useAxios({ service: getCountries })
  const { fetchData: fetchCities } = useAxios({ service: getCities, fetchOnMount: false })

  useEffect(() => {
    const fieldsWithValidation = ['firstName', 'lastName', 'experience']
    const stepHasError = fieldsWithValidation.some((field) => errors[field])
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: stepHasError }))
  }, [errors, setStepErrors, stepLabel])

  useEffect(() => {
    if (data.country) {
      ;(async () => {
        const res = await fetchCities()
        res ? setCities(res) : setCities([])
        setFetched(true)
      })()
    }

    return () => {
      setFetched(false)
    }
  }, [data.country, fetchCities])

  useEffect(() => {
    if (!data.country && data.city) {
      setFieldValue('city', null)
    }
  }, [data.country, data.city, setFieldValue])

  console.log(data)

  return (
    <Box sx={ styles.container }>
      { isDesktop && (
        <Box sx={ styles.imgContainer }>
          <Box component='img' src={ img } sx={ styles.img } />
        </Box>
      ) }
      <Box component='form' sx={ styles.form }>
        <Box>
          <Typography mb='20px'>
            { t('becomeTutor.generalInfo.title') }
          </Typography>

          { isMobile && (
            <Box sx={ styles.imgContainer }>
              <Box component='img' src={ img } sx={ styles.img } />
            </Box>
          ) }
          <Box sx={ styles.formFieldsContainer }>
            <AppTextField
              autoFocus
              errorMsg={ t(errors.firstName) }
              fullWidth
              label={ t('common.labels.firstName') }
              onBlur={ handleBlur('firstName') }
              onChange={ handleChange('firstName') }
              required
              sx={ { mb: '5px' } }
              type='text'
              value={ data.firstName }
            />
            <AppTextField
              errorMsg={ t(errors.lastName) }
              fullWidth
              label={ t('common.labels.lastName') }
              onBlur={ handleBlur('lastName') }
              onChange={ handleChange('lastName') }
              required
              sx={ { mb: '5px' } }
              type='text'
              value={ data.lastName }
            />

            <AppAutoComplete
              fieldName='country'
              fieldValue={ data.country }
              label={ t('common.labels.country') }
              propOptions={ countries }
              setFieldValue={ setFieldValue }
              styles={ { mb: '30px' } }
            />

            <AppAutoComplete
              disableOption={ !data.country }
              fieldName='city'
              fieldValue={ data.city }
              filterOptions={ filterOptions }
              label={ t('common.labels.city') }
              propOptions={ fetched && cities }
              setFetched={ setFetched }
              setFieldValue={ setFieldValue }
              styles={ { mb: '30px' } }
            />
          </Box>

          <AppTextField
            errorMsg={ t(errors.experience) }
            fullWidth
            label={ t('becomeTutor.generalInfo.textFieldLabel') }
            maxRows='4'
            minRows='4'
            multiline
            onBlur={ () => handleErrors('experience', undefined) }
            onChange={ handleChange('experience') }
            onFocus={ handleBlur('experience') }
            type='text'
            value={ data.experience }
          />
          <Typography color={ counterColor } sx={ styles.experienceLength } variant='caption'>
            { `${data.experience.length}/200` }
          </Typography>

          <FormControlLabel
            control={ <Checkbox checked={ data.confirmAge } onChange={ handleChange('confirmAge') } /> }
            label={ t('becomeTutor.generalInfo.checkboxLabel') }
            sx={ styles.checkboxLabel }
          />

          <Typography mb='20px' variant='body2'>
            { t('becomeTutor.generalInfo.helperText') }
          </Typography>
        </Box>
        { btnsBox }
      </Box>
    </Box>
  )
}

export default GeneralInfo
