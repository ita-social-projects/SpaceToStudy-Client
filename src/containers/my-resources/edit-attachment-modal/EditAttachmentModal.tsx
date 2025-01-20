import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'
import Button from '~scss-components/button/Button'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import useForm from '~/hooks/use-form'

import {
  getChangedAttachmentFields,
  getInitialValues,
  validations
} from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal.constants'
import { styles } from '~/containers/my-resources/edit-attachment-modal/EditAttachmentModal.styles'
import {
  Attachment,
  ButtonTypeEnum,
  CategoryNameInterface,
  ComponentEnum,
  CooperationSliceAttachment,
  EditAttachmentForm,
  UpdateAttachmentParams
} from '~/types'
import AsyncAutocomplete from '~/components/async-autocomplete/AsyncAutocomplete'
import { ResourceService } from '~/services/resource-service'
import { InputAdornment } from '@mui/material'

interface EditAttachmentModalProps {
  closeModal: () => void
  attachment: CooperationSliceAttachment | Attachment
  onAttachmentUpdate: (params: UpdateAttachmentParams) => void
}

const EditAttachmentModal: FC<EditAttachmentModalProps> = ({
  closeModal,
  attachment,
  onAttachmentUpdate
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [changedAttachmentFields, setChangedAttachmentFields] = useState<
    Partial<Record<keyof EditAttachmentForm, string | null>>
  >({})
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
    onSubmit: () => {
      setLoading(true)

      onAttachmentUpdate({
        id: attachment._id,
        fileName: changedAttachmentFields.fileName as string | undefined,
        description: changedAttachmentFields.description as string | undefined,
        category: changedAttachmentFields.category
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

  const areAttachmentFieldsChanged =
    Object.keys(changedAttachmentFields).length === 0

  useEffect(() => {
    const initialValues = getInitialValues(attachment)
    const updatedAttachmentFields = getChangedAttachmentFields(
      initialValues,
      data
    )
    setChangedAttachmentFields(updatedAttachmentFields)
  }, [attachment, data])

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
        <Button onClick={closeModal} variant='tonal'>
          {t('common.cancel')}
        </Button>
        <Button
          disabled={Boolean(errors.fileName) || areAttachmentFieldsChanged}
          loading={loading}
          sx={styles.saveBtn}
          type={ButtonTypeEnum.Submit}
        >
          {t('common.save')}
        </Button>
      </Box>
    </Box>
  )
}

export default EditAttachmentModal
