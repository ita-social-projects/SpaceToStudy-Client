import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Switch from '~/design-system/components/switch/Switch'

import { ResourceService } from '~/services/resource-service'
import { useAppDispatch } from '~/hooks/use-redux'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
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
  UpdateQuizParams,
  ErrorResponse,
  CreateQuizParams,
  Quiz,
  QuizTabsEnum,
  ComponentEnum,
  QuizSettings,
  ResourcesTypesEnum,
  QuizAttempt
} from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const QuizSettingsContainer = ({
  title,
  description,
  questions,
  category,
  settings,
  setActiveTab
}: QuizContentProps) => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const editQuiz = useCallback(
    (params?: UpdateQuizParams) => ResourceService.editQuiz(params),
    []
  )

  const createQuizService = useCallback(
    (data?: CreateQuizParams) => ResourceService.addQuiz(data),
    []
  )

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

  const { fetchData: updateQuiz } = useAxios<null, UpdateQuizParams>({
    service: editQuiz,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse,
    onResponseError
  })

  const { fetchData: createQuiz } = useAxios<Quiz, CreateQuizParams>({
    service: createQuizService,
    fetchOnMount: false,
    defaultResponse: { ...defaultResponse, id: '' },
    onResponse,
    onResponseError
  })

  const { data, handleInputChange, handleNonInputValueChange, handleSubmit } =
    useForm<QuizSettings>({
      initialValues: { ...settings },
      onSubmit: async () => {
        id
          ? await updateQuiz({ settings: data, id })
          : await createQuiz({
              title,
              description,
              items: questions,
              category: { _id: '', name: category as string },
              settings: data,
              id: '',
              resourceType: ResourcesTypesEnum.Quiz
            })
      }
    })

  const onViewTypeChange = (value: QuizViewEnum) => {
    handleNonInputValueChange('view', value)
  }

  const onTimeLimitChange = (value: QuizTimeLimit) => {
    handleNonInputValueChange('timeLimit', value)
  }

  const onAttemptChange = (value: QuizAttempt) => {
    handleNonInputValueChange('attemptLimit', value)
  }

  const isDisabled = (!id && !title) || !questions.length

  const checked = !!data.view

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
            value={data.view}
          />
        </SettingItem>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.questionsShuffleDesc')}
          title={t('myResourcesPage.quizzes.questionsShuffle')}
        >
          <Switch
            checked={data.shuffle}
            data-testid='shuffle-switch'
            onChange={handleInputChange('shuffle')}
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
          />
        </SettingItem>

        <SettingItem
          subtitle={t('myResourcesPage.quizzes.scoredUnscoredResponsesDesc')}
          title={t('myResourcesPage.quizzes.scoredUnscoredResponses')}
        >
          <Switch
            checked={data.scoredResponses}
            data-testid='responses-switch'
            onChange={handleInputChange('scoredResponses')}
          />
        </SettingItem>
        <SettingItem
          subtitle={t('myResourcesPage.quizzes.correctAnswersDesc')}
          title={t('myResourcesPage.quizzes.correctAnswers')}
        >
          <Switch
            checked={checked}
            data-testid='correctAnswers-switch'
            onChange={handleInputChange('correctAnswers')}
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
            value={data.timeLimit}
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
            value={data.attemptLimit}
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
