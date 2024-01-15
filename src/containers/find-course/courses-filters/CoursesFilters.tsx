import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import CloseIcon from '@mui/icons-material/Close'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppButton from '~/components/app-button/AppButton'

import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import { styles } from '~/containers/find-course/courses-filters/CourseFilters.styles'
import {
  ProficiencyLevelEnum,
  CategoryNameInterface,
  SubjectNameInterface,
  CourseFilters,
  ButtonVariantEnum
} from '~/types'

interface CoursesFiltersProps {
  filters: CourseFilters
  onCategoryChange: (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => void
  onSubjectChange: (
    _: React.SyntheticEvent,
    value: SubjectNameInterface | null
  ) => void
  onLevelChange: (event: SelectChangeEvent<ProficiencyLevelEnum[]>) => void
  resetFilters: () => void
}

const CoursesFilters = ({
  filters,
  onCategoryChange,
  onSubjectChange,
  onLevelChange,
  resetFilters
}: CoursesFiltersProps) => {
  const { t } = useTranslation()

  const levelLists = Object.values(ProficiencyLevelEnum)

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(filters.category),
    [filters.category]
  )

  const renderSelectedLevels = (selected: string[]) => {
    return selected.join(', ')
  }

  const menuItems = levelLists.map((item) => (
    <MenuItem key={item} value={item}>
      <Checkbox checked={filters.proficiencyLevel.indexOf(item) > -1} />
      <ListItemText primary={item} />
    </MenuItem>
  ))

  return (
    <Box sx={styles.toolbar}>
      <AsyncAutocomplete
        labelField='name'
        onChange={onCategoryChange}
        service={categoryService.getCategoriesNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.categories')
        }}
        value={filters.category}
        valueField='_id'
      />
      <AsyncAutocomplete
        disabled={!filters.category}
        labelField='name'
        onChange={onSubjectChange}
        service={getSubjectsNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.subjects')
        }}
        value={filters.subject}
        valueField='_id'
      />
      <FormControl sx={styles.formControl}>
        <InputLabel>{t('breadCrumbs.level')}</InputLabel>
        <Select
          MenuProps={styles.menuProps}
          id='demo-multiple-checkbox'
          input={<OutlinedInput label='Level' />}
          labelId='demo-multiple-checkbox-label'
          multiple
          onChange={onLevelChange}
          renderValue={renderSelectedLevels}
          value={filters.proficiencyLevel}
        >
          {menuItems}
        </Select>
      </FormControl>
      <AppButton
        onClick={resetFilters}
        sx={styles.clearBtn}
        variant={ButtonVariantEnum.Text}
      >
        <CloseIcon />
        {t('common.clear')}
      </AppButton>
    </Box>
  )
}

export default CoursesFilters
