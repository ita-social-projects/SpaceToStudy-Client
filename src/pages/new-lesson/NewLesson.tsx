import React from 'react'
import { useTranslation } from 'react-i18next'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { Link, useNavigate } from 'react-router-dom'

import { Editor } from '@tinymce/tinymce-react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'

import { lessonService } from '~/services/lesson-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { AxiosResponse } from 'axios'

import {
  validations,
  initialValues,
  initialFileValue,
  myResourcesPath
} from '~/pages/new-lesson/NewLesson.constants'
import { snackbarVariants } from '~/constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  ErrorResponse,
  SizeEnum,
  NewLessonData,
  TextFieldVariantEnum
} from '~/types'
import { styles } from '~/pages/new-lesson/NewLesson.styles'

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
    return lessonService.addLesson(data)
  }

  const { fetchData } = useAxios({
    service: addLesson,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const handleSave = (content: string) => {
    console.log('Saved content:', content)
  }

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
        <Editor
          apiKey={import.meta.env.VITE_APP_TINY_MCE_API_KEY}
          init={{
            height: 400,
            menubar: true,
            plugins:
              'mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss save',
            toolbar:
              'save undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            save_onsavecallback: handleSave
          }}
          initialValue={initialFileValue}
        />
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
