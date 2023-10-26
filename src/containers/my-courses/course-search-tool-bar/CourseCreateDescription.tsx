import { ChangeEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'

import { TextFieldVariantEnum } from '~/types'
import { styles } from '~/pages/create-or-edit-lesson/CreateOrEditLesson.styles'

interface CourseCreateDescriptionProps {
  decriptionName: string
  titleName: string
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeHandlerDesc: (e: ChangeEvent<HTMLInputElement>) => void
}

const CourseCreateDescription: FC<CourseCreateDescriptionProps> = ({
  decriptionName,
  titleName,
  onChangeHandler,
  onChangeHandlerDesc
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.TitleDescBox}>
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
