import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

import { ButtonTypeEnum } from '~/types'
import useForm from '~/hooks/use-form'
import { spliceSx } from '~/utils/helper-functions'

import SettingItem from '~/components/setting-item/SettingItem'
import AppSelect from '~/components/app-select/AppSelect'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer.styles'

const quizViewFields = [
  {
    value: 'scroll',
    title: 'Scroll'
  },
  {
    value: 'stepper',
    title: 'Stepper'
  }
]
const QuizSettingsContainer = () => {
  const { t } = useTranslation()
  const { data, handleInputChange, handleNonInputValueChange } = useForm({
    initialValues: {
      pointValues: false,
      scoredUnscoredResponses: false,
      correctAnswers: false,
      shuffleQuestions: false,
      quizView: 'scroll'
    }
  })

  return (
    <Box>
      <Box>
        <Typography sx={spliceSx(styles.title, styles.topTitle)}>
          {t('myResourcesPage.quizzes.settingsQuiz')}
        </Typography>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.quizViewDesc')}
          title={t('myResourcesPage.quizzes.quizView')}
        >
          <AppSelect
            fields={quizViewFields}
            setValue={(value) => handleNonInputValueChange('quizView', value)}
            sx={styles.select}
            value={data.quizView}
          />
        </SettingItem>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.questionsShuffleDesc')}
          title={t('myResourcesPage.quizzes.questionsShuffle')}
        >
          <Switch
            checked={data.shuffleQuestions}
            data-testid='shuffle-switch'
            onChange={handleInputChange('shuffleQuestions')}
            sx={styles.switch}
          />
        </SettingItem>
      </Box>

      <Box>
        <Typography sx={styles.title}>
          {t('myResourcesPage.quizzes.settingsPointsAndAnswers')}
        </Typography>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.pointValuesDesc')}
          title={t('myResourcesPage.quizzes.pointValues')}
        >
          <Switch
            checked={data.pointValues}
            data-testid='pointValues-switch'
            onChange={handleInputChange('pointValues')}
            sx={styles.switch}
          />
        </SettingItem>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.scoredUnscoredResponsesDesc')}
          title={t('myResourcesPage.quizzes.scoredUnscoredResponses')}
        >
          <Switch
            checked={data.scoredUnscoredResponses}
            data-testid='responses-switch'
            onChange={handleInputChange('scoredUnscoredResponses')}
            sx={styles.switch}
          />
        </SettingItem>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.correctAnswersDesc')}
          title={t('myResourcesPage.quizzes.correctAnswers')}
        >
          <Switch
            checked={data.correctAnswers}
            data-testid='correctAnswers-switch'
            onChange={handleInputChange('correctAnswers')}
            sx={styles.switch}
          />
        </SettingItem>
      </Box>
      <Box sx={styles.buttonContainer}>
        <AppButton disabled type={ButtonTypeEnum.Submit}>
          {t('common.apply')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default QuizSettingsContainer
