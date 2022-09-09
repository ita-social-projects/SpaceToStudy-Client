import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CategoryWithValue from '~/components/category-with-value/CategoryWithValue'

import img from '~/assets/img/mentor-home-page/become-tutor/languages.jpg'
import { languagesList, levels } from '~/containers/mentor-home-page/languages-step/constants'
import { styles } from '~/containers/mentor-home-page/languages-step/LanguagesStep.styles'

const LanguagesStep = ({ btnsBox, languages, setLanguages, setStepErrors, stepLabel }) => {
  const { t } = useTranslation()

  useEffect(() => {
    const hasError = languages.some((elem) => (elem.category && !elem.value) || (!elem.category && elem.value))
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: hasError }))
  }, [languages, stepLabel, setStepErrors])

  return (
    <Box sx={ styles.container }>
      <Box
        alt='' component='img' src={ img }
        sx={ styles.img }
      />
      <Box sx={ styles.rightBox }>
        <Box>
          <Typography mb='20px'>
            { t('becomeTutor.languages.title') }
          </Typography>
          <Box>
            <CategoryWithValue
              btnText={ t('becomeTutor.languages.btnText') }
              categoryLabel={ t('becomeTutor.languages.languageLabel') }
              categoryOptions={ languagesList }
              setStateItems={ setLanguages }
              stateItems={ languages }
              valueLabel={ t('becomeTutor.languages.levelLabel') }
              valueOptions={ levels }
            />
          </Box>
        </Box>
        { btnsBox }
      </Box>
    </Box>
  )
}

export default LanguagesStep
