import { FC, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import useForm from '~/hooks/use-form'

import {
  getInitialValues,
  validations
} from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal.constants'
import { styles } from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal.styles'
import {
  Attachment,
  ButtonTypeEnum,
  ButtonVariantEnum,
  CategoryNameInterface,
  ComponentEnum,
  EditAttachmentForm,
  UpdateAttachmentParams
} from '~/types'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { ResourceService } from '~/services/resource-service'
import { InputAdornment } from '@mui/material'

interface EditAttachmentModalProps {
  closeModal: () => void
  attachment: Attachment
  updateAttachment: (
    params?: UpdateAttachmentParams | undefined
  ) => Promise<void>
}

const EditAttachmentModal: FC<EditAttachmentModalProps> = ({
  closeModal,
  attachment,
  updateAttachment
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    data,
    errors,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleSubmit
  } = useForm<EditAttachmentForm>({
    initialValues: getInitialValues(attachment),
    validations,
    onSubmit: async () => {
      setLoading(true)
      await updateAttachment({
        id: attachment._id,
        fileName: data.fileName,
        description: data.description,
        category: data.category
      })
      setLoading(false)
      closeModal()
    }
  })

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleNonInputValueChange('category', value?._id ?? null)
  }

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
      <Typography sx={styles.title}>
        {t('myResourcesPage.attachments.edit')}
      </Typography>

      <Box sx={styles.form}>
        <Typography sx={styles.inputTitle(!!errors.fileName)}>
          {t('myResourcesPage.attachments.fileName')}:
        </Typography>
        <AppTextField
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {data.fileExtension}
              </InputAdornment>
            )
          }}
          errorMsg={t(errors.fileName)}
          fullWidth
          onBlur={handleBlur('fileName')}
          onChange={handleInputChange('fileName')}
          required
          value={data.fileName}
        />

        <Typography sx={styles.inputTitle()}>
          {t('myResourcesPage.attachments.attachmentCategory')}:
        </Typography>
        <AsyncAutocomplete<CategoryNameInterface>
          blurOnSelect
          labelField='name'
          onBlur={handleBlur('category')}
          onChange={onCategoryChange}
          service={ResourceService.getResourcesCategoriesNames}
          textFieldProps={{
            error: Boolean(errors.category),
            helperText: t(errors.category) || ' '
          }}
          value={data.category}
          valueField='_id'
        />

        <Typography sx={styles.inputTitle()}>
          {t('myResourcesPage.attachments.description')}:
        </Typography>
        <AppTextArea
          errorMsg={t(errors.description)}
          fullWidth
          maxLength={150}
          maxRows={5}
          minRows={5}
          onBlur={handleBlur('description')}
          onChange={handleInputChange('description')}
          value={data.description}
        />
      </Box>

      <Box sx={styles.buttons}>
        <AppButton onClick={closeModal} variant={ButtonVariantEnum.Tonal}>
          {t('common.cancel')}
        </AppButton>
        <AppButton
          disabled={!!errors.fileName}
          loading={loading}
          sx={styles.saveBtn}
          type={ButtonTypeEnum.Submit}
        >
          {t('common.save')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default EditAttachmentModal
