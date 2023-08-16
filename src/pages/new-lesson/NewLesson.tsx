import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import FileEditor from '~/components/file-editor/FileEditor'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { useSnackBarContext } from '~/context/snackbar-context'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { ResourceService } from '~/services/resource-service'

import { snackbarVariants } from '~/constants'
import {
  initialValues,
  myResourcesPath,
  validations
} from '~/pages/new-lesson/NewLesson.constants'
import { styles } from '~/pages/new-lesson/NewLesson.styles'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  ErrorResponse,
  NewLessonData,
  SizeEnum,
  TextFieldVariantEnum
} from '~/types'

const NewLesson = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const navigate = useNavigate()

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'newLesson.successMessage'
    })
    navigate('/my-resources')
  }

  const addLesson = (): Promise<AxiosResponse> => {
    return ResourceService.addLesson(data)
  }

  const { fetchData } = useAxios({
    service: addLesson,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const { data, errors, handleInputChange, handleSubmit } =
    useForm<NewLessonData>({
      initialValues,
      validations,
      onSubmit: fetchData,
      submitWithData: true
    })
  return (
    <PageWrapper>
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.root}
      >
        <AppTextField
          InputLabelProps={styles.titleLabel}
          InputProps={styles.titleInput}
          errorMsg={t(errors.title)}
          fullWidth
          inputProps={styles.input}
          label={data.title ? '' : t('newLesson.labels.title')}
          onChange={handleInputChange('title')}
          value={data.title}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={styles.descriptionLabel}
          InputProps={styles.descriptionInput}
          errorMsg={t(errors.description)}
          fullWidth
          inputProps={styles.input}
          label={data.description ? '' : t('newLesson.labels.description')}
          onChange={handleInputChange('description')}
          value={data.description}
          variant={TextFieldVariantEnum.Standard}
        />
        <Divider sx={styles.divider} />
        <FileEditor />
        <Box sx={styles.buttons}>
          <AppButton size={SizeEnum.ExtraLarge} type={ButtonTypeEnum.Submit}>
            {t('common.save')}
          </AppButton>
          <AppButton
            component={Link}
            size={SizeEnum.ExtraLarge}
            to={myResourcesPath}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default NewLesson
