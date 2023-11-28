import { useCallback, SyntheticEvent, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

import AppTextField from '~/components/app-text-field/AppTextField'
import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import {
  CategoryNameInterface,
  SubjectNameInterface,
  CourseForm,
  ProficiencyLevelEnum,
  TextFieldVariantEnum
} from '~/types'
import { styles } from '~/containers/my-courses/course-toolbar/CourseToolbar.style'

interface CourseToolbarProps {
  data: CourseForm
  handleInputChange: (
    key: keyof CourseForm
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  handleNonInputValueChange: (
    key: keyof CourseForm,
    value: string | ProficiencyLevelEnum[] | null
  ) => void
}

const CourseToolbar = ({
  data,
  handleInputChange,
  handleNonInputValueChange
}: CourseToolbarProps) => {
  const { t } = useTranslation()

  const { category, subject, proficiencyLevel } = data
  const levelLists = Object.values(ProficiencyLevelEnum)

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

  const onLevelChange = (event: SelectChangeEvent<ProficiencyLevelEnum[]>) => {
    handleNonInputValueChange('proficiencyLevel', event.target.value)
  }

  const renderSelectedLevels = (selected: string[]) => {
    return selected.join(', ')
  }
  const menuItems = levelLists.map((item) => (
    <MenuItem key={item} value={item}>
      <Checkbox checked={proficiencyLevel.indexOf(item) > -1} />
      <ListItemText primary={item} />
    </MenuItem>
  ))
  const AppAutoCompleteList = (
    <>
      <AsyncAutocomplete
        labelField='name'
        onChange={onCategoryChange}
        service={categoryService.getCategoriesNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.categories'),
          helperText: t('myCoursesPage.filterLabel.categories')
        }}
        value={category}
        valueField='_id'
      />
      <AsyncAutocomplete
        disabled={Boolean(!category)}
        labelField='name'
        onChange={onSubjectChange}
        service={getSubjectsNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.subjects'),
          helperText: t('myCoursesPage.filterLabel.subjects')
        }}
        value={subject}
        valueField='_id'
      />
      <FormControl>
        <InputLabel>{t('filters.filtersLevelsLable')}</InputLabel>
        <Select
          MenuProps={styles.menuProps}
          id='demo-multiple-checkbox'
          input={<OutlinedInput label='Level' />}
          labelId='demo-multiple-checkbox-label'
          multiple
          onChange={onLevelChange}
          renderValue={renderSelectedLevels}
          sx={styles.levelSelect}
          value={proficiencyLevel}
        >
          {menuItems}
        </Select>
        <FormHelperText sx={styles.levelHelperText}>
          {t('myCoursesPage.filterLabel.levels')}
        </FormHelperText>
      </FormControl>
    </>
  )

  return (
    <Box sx={styles.container}>
      <AppToolbar sx={styles.otherToolbar}>
        <Box sx={styles.titleDescBox}>
          <AppTextField
            InputLabelProps={styles.titleLabel}
            InputProps={styles.titleInput}
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
            fullWidth
            inputProps={styles.input}
            label={data.description ? ' ' : t('lesson.labels.description')}
            onChange={handleInputChange('description')}
            value={data.description}
            variant={TextFieldVariantEnum.Standard}
          />
        </Box>
        <Box sx={styles.searchBoxes}>{AppAutoCompleteList}</Box>
      </AppToolbar>
    </Box>
  )
}

export default CourseToolbar