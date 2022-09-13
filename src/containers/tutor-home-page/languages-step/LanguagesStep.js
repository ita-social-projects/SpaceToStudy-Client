import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AutocompleteFromOptions from '~/components/autocomplete-from-options/AutocompleteFromOptions'

import img from '~/assets/img/mentor-home-page/become-tutor/languages.jpg'
import { languagesList, levels } from '~/containers/mentor-home-page/languages-step/constants'
import { styles } from '~/containers/mentor-home-page/languages-step/LanguagesStep.styles'

const LanguagesStep = ({ btnsBox, languages, setLanguages }) => {
  const { t } = useTranslation()

  const options = {
    language: { options: languagesList, label: t('becomeTutor.languages.languageLabel'), disableSelected: true },
    level: { options: levels, label: t('becomeTutor.languages.levelLabel') }
  }

  return (
    <Box sx={ styles.container }>
      <Box
        alt='' component='img' src={ img }
        sx={ styles.img }
      />
      <Box sx={ styles.rightBox }>
        <Typography mb='20px'>
          { t('becomeTutor.languages.title') }
        </Typography>
        <AutocompleteFromOptions
          btnText={ t('becomeTutor.languages.btnText') }
          formState={ languages }
          handleFormChange={ setLanguages }
          options={ options }
        />
        <Box sx={ styles.btnsBox }>
          { btnsBox }
        </Box>
      </Box>
    </Box>
  )
}

export default LanguagesStep
