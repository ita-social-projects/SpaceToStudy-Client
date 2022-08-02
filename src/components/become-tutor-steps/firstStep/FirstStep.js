import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import img from '~/assets/img/become-tutor/first-step.png'
import { styles } from './first-step.styles'

const FirstStep = ({ data, handleChange, handleBlur, errors }) => {
  const { t } = useTranslation()


  return (
    <Box sx={ styles.container }>
      <Box component='img' src={ img } sx={ styles.img } />
      <Box component='form'>
        <Typography>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
        </Typography>
        <AppTextField
          autoFocus
          errorMsg={ t(errors.firstName) }
          fullWidth
          label={ t('common.labels.firstName') }
          mb='5px'
          onBlur={ handleBlur('firstName') }
          onChange={ handleChange('firstName') }
          required
          type="text"
          value={ data.firstName }
        />
        <AppTextField
          errorMsg={ t(errors.lastName) }
          fullWidth
          label={ t('common.labels.lastName') }
          mb='5px'
          onBlur={ handleBlur('lastName') }
          onChange={ handleChange('lastName') }
          required
          size="large"
          type="text"
          value={ data.lastName }
        />
        <AppTextField
          errorMsg={ t(errors.country) }
          fullWidth
          label={ t('common.labels.country') }
          mb='5px'
          onBlur={ handleBlur('country') }
          onChange={ handleChange('country') }
          required
          size="large"
          type="text"
          value={ data.country }
        />
        <AppTextField
          errorMsg={ t(errors.city) }
          fullWidth
          label={ t('common.labels.city') }
          mb='5px'
          onBlur={ handleBlur('city') }
          onChange={ handleChange('city') }
          required
          size="large"
          type="text"
          value={ data.city }
        />
      </Box>
    </Box>
  )
}

export default FirstStep
