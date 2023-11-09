import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

import useForm from '~/hooks/use-form'
import { styles } from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer.styles'
import { defaultStyles } from '~/components/app-content-switcher/AppContentSwitcher.styles'

const QuizSettingsContainer = () => {
  const { t } = useTranslation()
  const { data, handleInputChange } = useForm({
    initialValues: {
      pointValues: false,
      scoredUnscoredResponses: false,
      correctAnswers: false,
      shuffleQuestions: false
    }
  })

  return (
    <Box>
      <Box>
        <Typography sx={{ ...styles.title, ...styles.topTitle }}>
          {t('myResourcesPage.quizzes.settingsPointsAndAnswers')}
        </Typography>

        <Box sx={styles.settingContainer}>
          <Box>
            <Typography sx={styles.subtitle}>
              {t('myResourcesPage.quizzes.pointValues')}
            </Typography>
            <Typography sx={styles.description}>
              {t('myResourcesPage.quizzes.pointValuesDesc')}
            </Typography>
          </Box>
          <Switch
            checked={data.pointValues}
            data-testid='pointValues-switch'
            onChange={handleInputChange('pointValues')}
            sx={defaultStyles.switch}
          />
        </Box>

        <Box sx={styles.settingContainer}>
          <Box>
            <Typography sx={styles.subtitle}>
              {t('myResourcesPage.quizzes.scoredUnscoredResponses')}
            </Typography>
            <Typography sx={styles.description}>
              {t('myResourcesPage.quizzes.scoredUnscoredResponsesDesc')}
            </Typography>
          </Box>
          <Switch
            checked={data.scoredUnscoredResponses}
            data-testid='responses-switch'
            onChange={handleInputChange('scoredUnscoredResponses')}
            sx={defaultStyles.switch}
          />
        </Box>

        <Box sx={styles.settingContainer}>
          <Box>
            <Typography sx={styles.subtitle}>
              {t('myResourcesPage.quizzes.correctAnswers')}
            </Typography>
            <Typography sx={styles.description}>
              {t('myResourcesPage.quizzes.correctAnswersDesc')}
            </Typography>
          </Box>
          <Switch
            checked={data.correctAnswers}
            data-testid='correctAnswers-switch'
            onChange={handleInputChange('correctAnswers')}
            sx={defaultStyles.switch}
          />
        </Box>
      </Box>

      <Box>
        <Typography sx={styles.title}>
          {t('myResourcesPage.quizzes.settingsQuiz')}
        </Typography>
        <Box sx={styles.settingContainer}>
          <Box>
            <Typography sx={styles.subtitle}>
              {t('myResourcesPage.quizzes.questionsShuffle')}
            </Typography>
            <Typography sx={styles.description}>
              {t('myResourcesPage.quizzes.questionsShuffleDesc')}
            </Typography>
          </Box>
          <Switch
            checked={data.shuffleQuestions}
            data-testid='shuffle-switch'
            onChange={handleInputChange('shuffleQuestions')}
            sx={defaultStyles.switch}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default QuizSettingsContainer
