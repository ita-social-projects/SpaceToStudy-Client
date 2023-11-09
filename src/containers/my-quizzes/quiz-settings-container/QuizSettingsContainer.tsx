import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

import useForm from '~/hooks/use-form'
import { styles } from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer.styles'
import SettingItem from '~/components/setting-item/SettingItem'

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

        <SettingItem
          checked={data.pointValues}
          dataTestId='pointValues-switch'
          onChange={handleInputChange('pointValues')}
          subtitle={t('myResourcesPage.quizzes.pointValuesDesc')}
          title={t('myResourcesPage.quizzes.pointValues')}
        />

        <SettingItem
          checked={data.scoredUnscoredResponses}
          dataTestId='responses-switch'
          onChange={handleInputChange('scoredUnscoredResponses')}
          subtitle={t('myResourcesPage.quizzes.scoredUnscoredResponsesDesc')}
          title={t('myResourcesPage.quizzes.scoredUnscoredResponses')}
        />

        <SettingItem
          checked={data.correctAnswers}
          dataTestId='correctAnswers-switch'
          onChange={handleInputChange('correctAnswers')}
          subtitle={t('myResourcesPage.quizzes.correctAnswersDesc')}
          title={t('myResourcesPage.quizzes.correctAnswers')}
        />
      </Box>

      <Box>
        <Typography sx={styles.title}>
          {t('myResourcesPage.quizzes.settingsQuiz')}
        </Typography>

        <SettingItem
          checked={data.shuffleQuestions}
          dataTestId='shuffle-switch'
          onChange={handleInputChange('shuffleQuestions')}
          subtitle={t('myResourcesPage.quizzes.questionsShuffleDesc')}
          title={t('myResourcesPage.quizzes.questionsShuffle')}
        />
      </Box>
    </Box>
  )
}

export default QuizSettingsContainer
