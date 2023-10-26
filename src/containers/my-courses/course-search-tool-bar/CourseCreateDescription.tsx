import { styles } from '~/pages/create-or-edit-lesson/CreateOrEditLesson.styles'
import AppTextField from '~/components/app-text-field/AppTextField'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { TextFieldVariantEnum } from '~/types'

interface CourseCreateDescriptionProps {
  decriptionName: string
  titleName: string
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeHandlerDesc: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CourseCreateDescription: React.FC<CourseCreateDescriptionProps> = ({
  decriptionName,
  titleName,
  onChangeHandler,
  onChangeHandlerDesc
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.justSomeBox}>
      <AppTextField
        InputLabelProps={styles.titleLabel}
        InputProps={styles.titleInput}
        fullWidth
        inputProps={styles.input}
        label={titleName ? ' ' : t('lesson.labels.title')}
        onChange={onChangeHandler}
        value={titleName}
        variant={TextFieldVariantEnum.Standard}
      />
      <AppTextField
        InputLabelProps={styles.descriptionLabel}
        InputProps={styles.descriptionInput}
        fullWidth
        inputProps={styles.input}
        label={decriptionName ? ' ' : t('lesson.labels.description')}
        onChange={onChangeHandlerDesc}
        value={decriptionName}
        variant={TextFieldVariantEnum.Standard}
      />
    </Box>
  )
}

export default CourseCreateDescription
