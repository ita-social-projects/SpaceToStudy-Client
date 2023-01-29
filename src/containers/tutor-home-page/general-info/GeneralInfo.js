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
import useForm from '~/hooks/use-form'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { useStepContext } from '~/context/step-context'
import { validations } from '~/containers/tutor-home-page/constants'
import { styles } from '~/containers/tutor-home-page/general-info/general-info.styles'

const GeneralInfo = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const [counterColor, setCounterColor] = useState('#263238')
  const [fetched, setFetched] = useState(false)
  const [cities, setCities] = useState([])
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

  const onChangeCountry = (_, value) => {
    setData((prev) => prev.country !== value && { ...data, country: value, city: null })
  }

  const onChangeCity = (_, value) => {
    setData({ ...data, city: value })
  }

  const getCountries = useCallback(() => LocationService.getCountries(), [])
  const getCities = useCallback(() => LocationService.getCities(data.country), [data.country])

  const { response: countries } = useAxios({ service: getCountries })
  const { fetchData: fetchCities } = useAxios({ service: getCities, fetchOnMount: false })

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
    handleStepData(stepLabel, { ...data }, { ...errors })
    data.experience.length !== 200 ? setCounterColor('#263238') : setCounterColor('red')
  }, [data, errors, stepLabel, handleStepData])

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
              fieldValue={ data.country }
              label={ t('common.labels.country') }
              onChangeHandler={ onChangeCountry }
              propOptions={ countries }
              styles={ { mb: '30px' } }
            />

            <AppAutoComplete
              disableOption={ !data.country }
              fieldValue={ data.city }
              filterOptions={ filterOptions }
              label={ t('common.labels.city') }
              onChangeHandler={ onChangeCity }
              propOptions={ fetched && cities }
              styles={ { mb: '30px' } }
            />
          </Box>

          <AppTextField
            fullWidth
            inputProps={ { maxLength: 200 } }
            label={ t('becomeTutor.generalInfo.textFieldLabel') }
            maxRows='4'
            minRows='4'
            multiline
            onChange={ handleChange('experience') }
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
