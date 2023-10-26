import { useCallback, useState, SyntheticEvent, CSSProperties } from 'react'
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

import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import useBreakpoints from '~/hooks/use-breakpoints'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import {
  CategoryNameInterface,
  FindOffersFilters,
  FindOffersFiltersActions,
  SubjectNameInterface,
  ProficiencyLevelEnum
} from '~/types'
import { styles } from '~/containers/my-courses/course-search-tool-bar/CourseSearchToolbar.style'

interface OfferSearchToolbarProps {
  filters: FindOffersFilters
  filterActions: FindOffersFiltersActions<FindOffersFilters>
  resetPage: () => void
}

const levelLists = Object.values(ProficiencyLevelEnum)

const CourseSearchToolbar = ({
  filters,
  resetPage,
  filterActions
}: OfferSearchToolbarProps) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { updateFilterInQuery } = filterActions

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(filters.categoryId),
    [filters.categoryId]
  )
  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    updateFilterInQuery(value?._id ?? '', 'categoryId')
    updateFilterInQuery('', 'subjectId')
    resetPage()
  }

  const onSubjectChange = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    updateFilterInQuery(value?._id ?? '', 'subjectId')
    resetPage()
  }

  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevelEnum[]>([])

  const onLevelChange = (event: SelectChangeEvent<ProficiencyLevelEnum[]>) => {
    const {
      target: { value }
    } = event
    setSelectedLevel(value as ProficiencyLevelEnum[])
    updateFilterInQuery(value as ProficiencyLevelEnum[], 'proficiencyLevel')
    resetPage()
  }

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
        value={filters.categoryId}
        valueField='_id'
      />
      <AsyncAutocomplete
        disabled={!filters.categoryId}
        labelField='name'
        onChange={onSubjectChange}
        service={getSubjectsNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t('breadCrumbs.subjects'),
          helperText: t('myCoursesPage.filterLabel.subjects')
        }}
        value={filters.subjectId}
        valueField='_id'
      />
      <FormControl>
        <InputLabel id='demo-multiple-checkbox-label'>Levels</InputLabel>
        <Select
          MenuProps={styles.menuProps}
          id='demo-multiple-checkbox'
          input={<OutlinedInput label='Level' />}
          labelId='demo-multiple-checkbox-label'
          multiple
          onChange={onLevelChange}
          renderValue={(selected) => {
            return selected.join(', ')
          }}
          style={styles.drowlevel as CSSProperties}
          value={filters.proficiencyLevel}
        >
          {levelLists.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedLevel.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={styles.drowstyle as CSSProperties}>
          {t('myCoursesPage.filterLabel.levels')}
        </FormHelperText>
      </FormControl>
    </>
  )

  return (
    <Box sx={styles.container}>
      {!isMobile && (
        <AppToolbar sx={styles.otherToolbar as CSSProperties}>
          {AppAutoCompleteList}
        </AppToolbar>
      )}
      {isMobile && AppAutoCompleteList}
    </Box>
  )
}

export default CourseSearchToolbar
