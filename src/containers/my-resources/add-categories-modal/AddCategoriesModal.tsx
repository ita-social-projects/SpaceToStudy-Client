import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import useForm from '~/hooks/use-form'

import {
  initialValues,
  validations
} from '~/containers/my-resources/add-categories-modal/AddCategoriesModal.constants'
import { styles } from '~/containers/my-resources/add-categories-modal/AddCategories.styles'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  CreateCategoriesParams
} from '~/types'

interface AddCategoriesModalProps {
  closeModal: () => void
  createCategories: (params?: CreateCategoriesParams) => Promise<void>
}

const AddCategoriesModal: FC<AddCategoriesModalProps> = ({
  closeModal,
  createCategories
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)

  const { data, errors, handleInputChange, handleBlur, handleSubmit } =
    useForm<CreateCategoriesParams>({
      initialValues: initialValues,
      validations,
      onSubmit: async () => {
        setLoading(true)
        await createCategories(data)
        setLoading(false)
        closeModal()
      }
    })

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
      <Typography sx={styles.title}>
        {t('myResourcesPage.categories.addBtn')}
      </Typography>

      <Box sx={styles.form}>
        <AppTextField
          errorMsg={t(errors.name)}
          fullWidth
          label={t('myResourcesPage.categories.name')}
          onBlur={handleBlur('name')}
          onChange={handleInputChange('name')}
          required
          sx={styles.textField}
          value={data.name}
        />
      </Box>

      <Box sx={styles.buttons}>
        <AppButton onClick={closeModal} variant={ButtonVariantEnum.Tonal}>
          {t('common.cancel')}
        </AppButton>
        <AppButton
          disabled={!!errors.name || !data.name}
          loading={loading}
          sx={styles.saveBtn}
          type={ButtonTypeEnum.Submit}
        >
          {t('common.create')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default AddCategoriesModal
