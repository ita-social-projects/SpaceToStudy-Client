import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { useStepContext } from '~/context/step-context'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { languages } from '~/containers/tutor-home-page/language-step/constants'
import useBreakpoints from '~/hooks/use-breakpoints'

interface LanguageStepProps {
  btnsBox: React.ReactNode
}

const LanguageStep: React.FC<LanguageStepProps> = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { stepData, handleLanguage } = useStepContext()
  const languageData = stepData.language

  const onChangeLanguage = (_: unknown, value: string | null) => {
    handleLanguage(value)
  }

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography mb='20px'>{t('becomeTutor.languages.title')}</Typography>
          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}
          <AppAutoComplete
            data-testid='language'
            onChange={onChangeLanguage}
            options={languages}
            textFieldProps={{
              label: t('becomeTutor.languages.autocompleteLabel'),
              sx: { mb: '30px' }
            }}
            value={languageData}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
