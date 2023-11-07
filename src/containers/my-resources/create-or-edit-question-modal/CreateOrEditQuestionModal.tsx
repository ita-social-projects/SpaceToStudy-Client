import { FC, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { ResourceService } from '~/services/resource-service'
import useForm from '~/hooks/use-form'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal.styles'
import { emptyField, textField } from '~/utils/validations/common'
import {
  ButtonVariantEnum,
  CategoryNameInterface,
  QuestionModalForm,
  QuestionForm
} from '~/types'

interface CreateOrEditQuestionModalProps {
  initialData: QuestionForm
  actions: {
    onCancel: () => void
    onSave: (data: QuestionModalForm) => void
  }
}

const CreateOrEditQuestionModal: FC<CreateOrEditQuestionModalProps> = ({
  initialData,
  actions
}) => {
  const { t } = useTranslation()
  const { onCancel, onSave } = actions

  const {
    data,
    errors,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur
  } = useForm<QuestionModalForm>({
    initialValues: {
      title: initialData.title,
      category: initialData.category
    },
    validations: {
      title: (value: string) =>
        emptyField(value, undefined, textField(1, 100)(value))
    }
  })

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleNonInputValueChange('category', value?._id ?? null)
  }

  const title = initialData.title
    ? 'myResourcesPage.quizzes.editQuestion'
    : 'myResourcesPage.quizzes.createNewQuestion'

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{t(title)}</Typography>

      <Box sx={styles.form}>
        <Typography sx={styles.inputTitle(!!errors.title)}>
          {t('myResourcesPage.quizzes.title')}:
        </Typography>
        <AppTextField
          errorMsg={t(errors.title)}
          fullWidth
          onBlur={handleBlur('title')}
          onChange={handleInputChange('title')}
          required
          value={data.title}
        />

        <Typography sx={styles.inputTitle()}>
          {t('myResourcesPage.categories.category')}:
        </Typography>
        <AsyncAutocomplete<CategoryNameInterface>
          blurOnSelect
          labelField='name'
          onBlur={handleBlur('category')}
          onChange={onCategoryChange}
          service={ResourceService.getResourcesCategoriesNames}
          value={data.category}
          valueField='_id'
        />
      </Box>

      <Box sx={styles.buttons}>
        <AppButton onClick={onCancel} variant={ButtonVariantEnum.Tonal}>
          {t('common.cancel')}
        </AppButton>
        <AppButton
          disabled={!!errors.title || !data.title}
          onClick={() => onSave(data)}
          sx={styles.saveBtn}
        >
          {t('common.save')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateOrEditQuestionModal
