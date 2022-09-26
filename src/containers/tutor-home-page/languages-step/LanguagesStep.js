import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AutocompleteFromOptions from '~/components/autocomplete-from-options/AutocompleteFromOptions'

import img from '~/assets/img/tutor-home-page/become-tutor/languages.jpg'
import { languages, levels } from '~/containers/tutor-home-page/languages-step/constants'
import { styles } from '~/containers/tutor-home-page/languages-step/LanguagesStep.styles'

const LanguagesStep = ({ btnsBox, data, setValue }) => {
  const { t } = useTranslation()

  const options = {
    language: {
      options: languages,
      label: t('becomeTutor.languages.languageLabel'),
      getOptionLabel: (lang) => t(`becomeTutor.languages.languagesList.${lang}`),
      disableSelected: true
    },
    level: {
      options: levels,
      label: t('becomeTutor.languages.levelLabel'),
      getOptionLabel: (level) => t(`becomeTutor.languages.levels.${level}`)
    }
  }

  return (
    <Box sx={ styles.container }>
      <Box sx={ styles.imgContainer }>
        <Box
          alt='' component='img' src={ img }
          sx={ styles.img }
        />
      </Box>
      <Box sx={ styles.rightBox }>
        <Typography mb='20px'>
          { t('becomeTutor.languages.title') }
        </Typography>
        <AutocompleteFromOptions
          btnText={ t('becomeTutor.languages.btnText') }
          formState={ data.languages }
          handleFormChange={ setValue('languages') }
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
