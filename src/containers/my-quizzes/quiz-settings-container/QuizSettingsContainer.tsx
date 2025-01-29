import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Switch from '~/design-system/components/switch/Switch'

import { ResourceService } from '~/services/resource-service'
import { useAppDispatch } from '~/hooks/use-redux'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import SettingItem from '~/components/setting-item/SettingItem'
import AppSelect from '~/components/app-select/AppSelect'
import Button from '~scss-components/button/Button'

import { spliceSx } from '~/utils/helper-functions'
import { getErrorMessage } from '~/utils/error-with-message'
import { authRoutes } from '~/router/constants/authRoutes'
import { QuizContentProps } from '~/pages/new-quiz/NewQuiz.constants'
import { snackbarVariants } from '~/constants'
import { defaultResponse } from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer.constants'
import {
  getQuizViewFields,
  getQuizTimeLimitFields,
  getQuizAttemptFields
} from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer.constants'
import { styles } from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer.styles'
import {
  ButtonTypeEnum,
  QuizViewEnum,
  QuizTimeLimit,
  ErrorResponse,
  QuizTabsEnum,
  ComponentEnum,
  QuizAttempt,
  QuizSettings
} from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const QuizSettingsContainer = ({
  data,
  handleNonInputValueChange,
  handleSubmit,
  setMutations,
  setActiveTab
}: QuizContentProps) => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const getQuiz = useCallback(() => {
    if (id) {
      return ResourceService.getQuizQuery(id)
    }
    return defaultResponse
  }, [id])

  const { data: quiz } = useQuery({
    queryKey: ['quiz', id],
    queryFn: getQuiz,
    options: {
      enabled: Boolean(id)
    }
  })

  const editQuiz = useCallback(async () => {
    if (id) {
      await ResourceService.editQuizQuery(data, id)
    }
  }, [data, id])

  const createQuizService = useCallback(() => {
    return ResourceService.addQuizQuery(data)
  }, [data])

  const onResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: id
          ? 'myResourcesPage.quizzes.successEditedQuiz'
          : 'myResourcesPage.quizzes.successAddedQuiz'
      })
    )

    id
      ? setActiveTab(QuizTabsEnum.Edit)
      : navigate(authRoutes.myResources.root.path)
  }

  const onResponseError = (error?: ErrorResponse) => {
    const errorKey = getErrorKey(error)

    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: error
          ? {
              text: errorKey,
              options: {
                message: getErrorMessage(error.message)
              }
            }
          : errorKey
      })
    )
  }

  const { mutate: fetchAddQuiz } = useMutation({
    mutationFn: createQuizService,
    onSuccess: onResponse,
    onError: onResponseError
  })

  const { mutate: fetchEditedQuiz } = useMutation({
    mutationFn: editQuiz,
    onSuccess: onResponse,
    onError: onResponseError
  })

  const handleSettingsChange =
    (key: keyof QuizSettings) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleNonInputValueChange('settings', {
        ...data.settings,
        [key]: event.target.checked
      })
    }

  const onViewTypeChange = (value: QuizViewEnum) => {
    handleNonInputValueChange('settings', {
      ...data.settings,
      view: value
    })
  }

  const onTimeLimitChange = (value: QuizTimeLimit) => {
    handleNonInputValueChange('settings', {
      ...data.settings,
      timeLimit: value
    })
  }

  const onAttemptChange = (value: QuizAttempt) => {
    handleNonInputValueChange('settings', {
      ...data.settings,
      attemptLimit: value
    })
  }

  useEffect(() => {
    if (quiz && id) {
      handleNonInputValueChange('settings', quiz.settings)
    }
  }, [quiz, id])

  useEffect(() => {
    setMutations({ fetchEditedQuiz, fetchAddQuiz })
  }, [setMutations, fetchEditedQuiz, fetchAddQuiz])

  const isDisabled = (!id && !data.title) || !data.items.length

  return (
    <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
      <Box>
        <Typography sx={spliceSx(styles.title, styles.topTitle)}>
          {t('myResourcesPage.quizzes.settingsQuiz')}
        </Typography>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.quizViewDesc')}
          title={t('myResourcesPage.quizzes.quizView')}
        >
          <AppSelect
            fields={getQuizViewFields(t)}
            setValue={onViewTypeChange}
            sx={styles.select}
            value={data.settings.view}
          />
        </SettingItem>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.questionsShuffleDesc')}
          title={t('myResourcesPage.quizzes.questionsShuffle')}
        >
          <Switch
            checked={data.settings.shuffle}
            data-testid='shuffle-switch'
            onChange={handleSettingsChange('shuffle')}
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
            checked={data.settings.pointValues}
            data-testid='pointValues-switch'
            onChange={handleSettingsChange('pointValues')}
          />
        </SettingItem>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.scoredUnscoredResponsesDesc')}
          title={t('myResourcesPage.quizzes.scoredUnscoredResponses')}
        >
          <Switch
            checked={data.settings.scoredResponses}
            data-testid='responses-switch'
            onChange={handleSettingsChange('scoredResponses')}
          />
        </SettingItem>
        <SettingItem
          subtitle={t('myResourcesPage.quizzes.correctAnswersDesc')}
          title={t('myResourcesPage.quizzes.correctAnswers')}
        >
          <Switch
            checked={data.settings.correctAnswers}
            data-testid='correctAnswers-switch'
            onChange={handleSettingsChange('correctAnswers')}
          />
        </SettingItem>
      </Box>

      <Box>
        <Typography sx={styles.title}>
          {t('myResourcesPage.quizzes.attemptsAndTimeLimits')}
        </Typography>
        <SettingItem
          subtitle={t('myResourcesPage.quizzes.timeLimitDesc')}
          title={t('myResourcesPage.quizzes.timeLimit')}
        >
          <AppSelect
            fields={getQuizTimeLimitFields(t)}
            label={'Time limit'}
            setValue={onTimeLimitChange}
            sx={styles.select}
            value={data.settings.timeLimit}
          />
        </SettingItem>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.attemptsLimitsDesc')}
          title={t('myResourcesPage.quizzes.attemptsLimits')}
        >
          <AppSelect
            fields={getQuizAttemptFields(t)}
            label={'Attempts limit'}
            setValue={onAttemptChange}
            sx={styles.select}
            value={data.settings.attemptLimit}
          />
        </SettingItem>
      </Box>

      <Box sx={styles.buttonContainer}>
        <Button disabled={isDisabled} type={ButtonTypeEnum.Submit}>
          {t('common.apply')}
        </Button>
      </Box>
    </Box>
  )
}

export default QuizSettingsContainer
