import { useCallback, SyntheticEvent, ChangeEvent, FocusEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import useUserCategoriesAndSubjects from '~/hooks/use-user-categories-and-subjects'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DividedDropdownAutocomplete from '~/components/divider-dropdown-autocomplete/DividerDropdownAutocomplete'
import { proficiencyLevelLabels } from '~/constants/labels'

import {
  CategoryNameInterface,
  SubjectNameInterface,
  CourseForm,
  ProficiencyLevelEnum,
  TextFieldVariantEnum,
  ComponentEnum,
  UserResponse,
  CourseExtendedAutocompleteOptions,
  FormNonInputValueChange,
  UseFormEventHandler
} from '~/types'
import { styles } from '~/containers/my-courses/course-toolbar/CourseToolbar.style'
import ProficiencyLevelSelect from '~/containers/proficiency-level-select/ProficiencyLevelSelect'

interface CourseToolbarProps {
  data: CourseForm
  user: UserResponse | null
  errors: Record<keyof CourseForm, string>
  handleBlur: UseFormEventHandler<CourseForm, FocusEvent<HTMLInputElement>>
  handleInputChange: UseFormEventHandler<
    CourseForm,
    ChangeEvent<HTMLInputElement>
  >
  handleNonInputValueChange: FormNonInputValueChange<
    string | ProficiencyLevelEnum[] | null,
    CourseForm
  >
}

const CourseToolbar = ({
  data,
  user,
  handleInputChange,
  errors,
  handleBlur,
  handleNonInputValueChange
}: CourseToolbarProps) => {
  const { t } = useTranslation()
  const { transformCategories, transformSubjects } =
    useUserCategoriesAndSubjects({ user })

  const { category, subject, proficiencyLevel } = data

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(category),
    [category]
  )

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleNonInputValueChange('category', value?._id ?? null)
    handleNonInputValueChange('subject', null)
  }
  const onSubjectChange = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    handleNonInputValueChange('subject', value?._id ?? null)
  }

  const onLevelChange = (value: ProficiencyLevelEnum[]) => {
    handleNonInputValueChange('proficiencyLevel', value)
  }

  const AppAutoCompleteList = (
    <>
      <DividedDropdownAutocomplete<
        CategoryNameInterface,
        CourseExtendedAutocompleteOptions
      >
        axiosProps={{ transform: transformCategories }}
        groupBy={(option) => option.title}
        labelField='name'
        onBlur={handleBlur('category')}
        onChange={onCategoryChange}
        service={categoryService.getCategoriesNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.category'),
          error: Boolean(errors.category),
          helperText: errors.category ? t(errors.category) : ' ',
          required: true
        }}
        value={category}
        valueField='_id'
      />

      <DividedDropdownAutocomplete<
        SubjectNameInterface,
        CourseExtendedAutocompleteOptions
      >
        axiosProps={{ transform: transformSubjects }}
        disabled={Boolean(!category)}
        groupBy={(option) => option.title}
        labelField='name'
        onBlur={handleBlur('subject')}
        onChange={onSubjectChange}
        service={getSubjectsNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.subject'),
          error: Boolean(errors.subject),
          helperText: errors.subject ? t(errors.subject) : ' ',
          required: true
        }}
        value={subject}
        valueField='_id'
      />
      <ProficiencyLevelSelect
        errorMessage={errors.proficiencyLevel}
        fillRange
        label={t('breadCrumbs.level')}
        labels={proficiencyLevelLabels}
        onBlur={handleBlur('proficiencyLevel')}
        onChange={onLevelChange}
        sx={{ select: styles.levelSelect, formSx: { flex: 1 } }}
        value={proficiencyLevel}
      />
    </>
  )

  return (
    <Box sx={styles.container}>
      <AppToolbar sx={styles.otherToolbar}>
        <Box sx={styles.titleDescBox}>
          <AppTextField
            InputLabelProps={styles.titleLabel}
            InputProps={styles.titleInput}
            errorMsg={t(errors.title)}
            fullWidth
            inputProps={styles.input}
            label={data.title ? ' ' : t('lesson.labels.title')}
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
            label={data.description ? ' ' : t('lesson.labels.description')}
            maxRows={3}
            multiline
            onChange={handleInputChange('description')}
            value={data.description}
            variant={TextFieldVariantEnum.Standard}
          />
          <Typography sx={styles.categories}>
            {t('myCoursesPage.filterLabel.determine')}
            <Typography component={ComponentEnum.Span} sx={styles.weightBox}>
              {t('myCoursesPage.filterLabel.filterItems')}
            </Typography>
            {t('myCoursesPage.filterLabel.and')}
            <Typography component={ComponentEnum.Span} sx={styles.weightBox}>
              {t('myCoursesPage.filterLabel.level')}
            </Typography>
            {t('myCoursesPage.filterLabel.courseTemplate')}
          </Typography>
        </Box>
        <Box sx={styles.searchBoxes}>{AppAutoCompleteList}</Box>
      </AppToolbar>
      <Box sx={styles.divider}></Box>
    </Box>
  )
}

export default CourseToolbar
