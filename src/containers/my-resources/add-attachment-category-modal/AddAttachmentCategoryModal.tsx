import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Button from '~scss-components/button/Button'
import AsyncAutocomplete from '~/components/async-autocomplete/AsyncAutocomplete'

import { ResourceService } from '~/services/resource-service'
import useForm from '~/hooks/use-form'

import { getInitialValues } from '~/containers/my-resources/add-attachment-category-modal/AddAttachmentCategoryModal.constants'
import { styles } from '~/containers/my-resources/add-attachment-category-modal/AddAttachmentCategoryModal.styles'
import {
  Attachment,
  CategoryNameInterface,
  UpdateAttachmentParams,
  ButtonTypeEnum,
  ComponentEnum
} from '~/types'

interface AddAttachmentCategoryModalProps {
  closeModal: () => void
  attachment: Attachment
  onAttachmentUpdate: (params: UpdateAttachmentParams) => void
}

const AddAttachmentCategoryModal: React.FC<AddAttachmentCategoryModalProps> = ({
  closeModal,
  attachment,
  onAttachmentUpdate
}) => {
  const { t } = useTranslation()

  const { data, errors, handleNonInputValueChange, handleBlur, handleSubmit } =
    useForm<UpdateAttachmentParams>({
      initialValues: getInitialValues(attachment),
      onSubmit: () => {
        onAttachmentUpdate({
          id: attachment._id,
          category: data.category
        })
        closeModal()
      }
    })

  const onCategoryChange = (
    _: React.SyntheticEvent,
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
        <Button onClick={closeModal} variant='tonal'>
          {t('common.cancel')}
        </Button>
        <Button
          disabled={Boolean(errors.fileName) || !data.category}
          sx={styles.saveBtn}
          type={ButtonTypeEnum.Submit}
        >
          {t('common.save')}
        </Button>
      </Box>
    </Box>
  )
}

export default AddAttachmentCategoryModal
