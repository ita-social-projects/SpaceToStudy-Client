import { FC, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { ResourceService } from '~/services/resource-service'
import useForm from '~/hooks/use-form'

import { getInitialValues } from '~/containers/my-resources/add-attachment-category-modal/AddAttachmentCategoryModal.constants'
import { styles } from '~/containers/my-resources/add-attachment-category-modal/AddAttachmentCategoryModal.styles'
import {
  Attachment,
  CategoryNameInterface,
  UpdateAttachmentParams,
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum
} from '~/types'

interface AddAttachmentCategoryModalProps {
  closeModal: () => void
  attachment: Attachment
  updateAttachmentCategory: (
    params?: UpdateAttachmentParams | undefined
  ) => Promise<void>
}

const AddAttachmentCategoryModal: FC<AddAttachmentCategoryModalProps> = ({
  closeModal,
  attachment,
  updateAttachmentCategory
}) => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState<boolean>(false)

  const { data, errors, handleNonInputValueChange, handleBlur, handleSubmit } =
    useForm<UpdateAttachmentParams>({
      initialValues: getInitialValues(attachment),
      onSubmit: async () => {
        setLoading(true)
        await updateAttachmentCategory(data)
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
        {t('myResourcesPage.categories.selectCategory')}
      </Typography>
      <Box sx={styles.form}>
        <Typography sx={styles.inputTitle}>
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
            helperText: t(errors.category) ?? ' '
          }}
          value={data.category}
          valueField='_id'
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

export default AddAttachmentCategoryModal
