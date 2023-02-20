import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { useStepContext } from '~/context/step-context'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { languages } from '~/containers/tutor-home-page/language-step/constants'
import useBreakpoints from '~/hooks/use-breakpoints'

const LanguageStep = ({ stepLabel, btnsBox }) => {
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
  const languageData = stepData[stepLabel]

  const onChangeLanguage = (_, value) => {
    handleStepData(stepLabel, value)
  }

  return (
    <Box sx={ styles.container }>
      { isDesktop && (
        <Box sx={ styles.imgContainer }>
          <Box component='img' src={ img } sx={ styles.img } />
        </Box>
      ) }
      <Box sx={ styles.rigthBox }>
        <Box>
          <Typography mb='30px'>
            { t('becomeTutor.languages.title') }
          </Typography>
          { isMobile && (
            <Box sx={ styles.imgContainer }>
              <Box component='img' src={ img } sx={ styles.img } />
            </Box>
          ) }
          <AppAutoComplete
            data-testid='language'
            fieldValue={ languageData }
            label={ t('becomeTutor.languages.autocompleteLabel') }
            onChange={ onChangeLanguage }
            options={ languages }
            sx={ { mb: '30px' } }
            type='text'
          />
        </Box>
        { btnsBox }
      </Box>
    </Box>
  )
}

export default LanguageStep
