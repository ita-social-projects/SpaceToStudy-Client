import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'

import AppTextField from '~/components/app-text-field/AppTextField'
import useBreakpoints from '~/hooks/use-breakpoints'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.png'
import { styles } from '~/containers/tutor-home-page/general-info/general-info.styles'

const GeneralInfo = ({ data, handleChange, handleBlur, errors, btnsBox, stepLabel }) => {
  const { t } = useTranslation()

  useEffect(() => {
    const fieldsWithValidation = ['firstName', 'lastName', 'country', 'city']
    const stepHasError = fieldsWithValidation.some((field) => errors[field])
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: stepHasError }))
  }, [errors, setStepErrors, stepLabel])

  return (
    <Box sx={ styles.container }>
      { isDesktop && <Box component='img' src={ img } sx={ styles.imgDesktop } /> }
      <Box component='form' sx={ styles.form }>
        <Box>
          <Typography mb='30px'>
            { t('becomeTutor.generalInfo.title') }
          </Typography>

          { isMobile && <Box component='img' src={ img } sx={ styles.imgMobile } /> }
          <Box sx={ !isMobile && styles.formFieldsContainer }>
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

            <AppTextField
              errorMsg={ t(errors.country) }
              fullWidth
              label={ t('common.labels.country') }
              onBlur={ handleBlur('country') }
              onChange={ handleChange('country') }
              required
              select
              sx={ { mb: '5px' } }
              type='text'
              value={ data.country }
            >
              { countries }
            </AppTextField>

            <AppTextField
              errorMsg={ t(errors.city) }
              fullWidth
              label={ t('common.labels.city') }
              onBlur={ handleBlur('city') }
              onChange={ handleChange('city') }
              required
              select
              sx={ { mb: '5px' } }
              type='text'
              value={ data.city }
            >
              { cities }
            </AppTextField>
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
