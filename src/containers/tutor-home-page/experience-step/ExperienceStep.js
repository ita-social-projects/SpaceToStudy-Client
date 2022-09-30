import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppTextField from '~/components/app-text-field/AppTextField'

import img from '~/assets/img/tutor-home-page/become-tutor/experience.png'
import { styles } from '~/containers/tutor-home-page/experience-step/experience-step.styles'

const ExperienceStep = ({ data, handleChange, handleBlur, errors, btnsBox, setStepErrors, stepLabel }) => {
  const { t } = useTranslation()

  const [counterColor, setCounterColor] = useState('#263238')
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: Boolean(errors.experience) }))
    errors.experience === undefined ? setCounterColor('#263238') : setCounterColor('red')
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
            errorMsg={ focused ? t(errors.experience) : null }
            fullWidth
            label={ t('becomeTutor.experience.textFieldLabel') }
            maxRows='17'
            minRows='6'
            multiline
            onBlur={ () => {
              handleBlur('experience')
              setFocused(false)
            } }
            onChange={ handleChange('experience') }
            onFocus={ () => setFocused(true) }
            type='text'
            value={ data.experience }
          />
          <Typography color={ counterColor } style={ { float: 'right', position: 'relative', top: -20 } } variant='caption'>
            { `${data.experience.length}/1000` }
          </Typography>
        </Box>
        { btnsBox }
      </Box>
    </Box>
  )
}

export default ExperienceStep
