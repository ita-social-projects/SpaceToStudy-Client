import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'
import Button from '~scss-components/button/Button'
import useForm from '~/hooks/use-form'

import {
  initialValues,
  validations
} from '~/containers/my-resources/add-categories-modal/AddCategoriesModal.constants'
import { styles } from '~/containers/my-resources/add-categories-modal/AddCategories.styles'
import { ButtonTypeEnum, ComponentEnum, CreateCategoriesParams } from '~/types'

interface AddCategoriesModalProps {
  closeModal: () => void
  createCategories: (params: CreateCategoriesParams) => void
  existingCategoriesNames: string[]
}

const AddCategoriesModal: FC<AddCategoriesModalProps> = ({
  closeModal,
  createCategories,
  existingCategoriesNames
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)

  const { data, errors, handleInputChange, handleBlur, handleSubmit } =
    useForm<CreateCategoriesParams>({
      initialValues: initialValues,
      validations: validations(existingCategoriesNames),
      onSubmit: () => {
        setLoading(true)
        createCategories({ name: data.name.trim() })
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
        <Button onClick={closeModal} variant='tonal'>
          {t('common.cancel')}
        </Button>
        <Button
          disabled={!!errors.name || !data.name}
          loading={loading}
          sx={styles.saveBtn}
          type={ButtonTypeEnum.Submit}
        >
          {t('common.create')}
        </Button>
      </Box>
    </Box>
  )
}

export default AddCategoriesModal
