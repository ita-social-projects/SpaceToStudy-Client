import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import AppTextField from '~/components/app-text-field/AppTextField'

import img from '~/assets/img/mentor-home-page/become-tutor/experience.png'
import { styles } from './experience-step.styles'

const ExperienceStep = ({ data, handleChange, handleBlur, errors, btnsBox, setStepErrors, stepLabel }) => {
  const { t } = useTranslation()

  useEffect(() => {
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: Boolean(errors.experience) }))
  }, [errors, setStepErrors, stepLabel])

  return (
    <Box sx={ styles.container }>
      <Box
        alt='' component='img' src={ img }
        sx={ styles.img }
      />
      <Box sx={ styles.form }>
        <Box>
          <Typography mb='30px'>
            { t('becomeTutor.experience.title') }
          </Typography>
          <AppTextField
            autoFocus
            errorMsg={ t(errors.experience) }
            fullWidth
            label={ t('becomeTutor.experience.textFieldLabel') }
            maxRows='17'
            minRows='6'
            multiline
            onBlur={ handleBlur('experience') }
            onChange={ handleChange('experience') }
            type='text'
            value={ data.experience }
          />
          <Typography variant='body2'>
            { `${data.experience.length}/1000` }
          </Typography>
        </Box>
        { btnsBox }
      </Box>
    </Box>
  )
}

export default ExperienceStep
