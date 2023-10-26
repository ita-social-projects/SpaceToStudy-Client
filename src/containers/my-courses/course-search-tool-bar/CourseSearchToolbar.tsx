import { useCallback, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'
import FormHelperText from '@mui/material/FormHelperText'

import Box from '@mui/material/Box'
import AppToolbar from '~/components/app-toolbar/AppToolbar'

import {
  CategoryNameInterface,
  FindOffersFilters,
  FindOffersFiltersActions,
  SubjectNameInterface,
  ProficiencyLevelEnum
} from '~/types'

import { styles } from '~/containers/my-courses/course-search-tool-bar/CourseSearchToolbar.style'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

///

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

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
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    updateFilterInQuery(value?._id ?? '', 'categoryId')
    updateFilterInQuery('', 'subjectId')
    resetPage()
  }

  const onSubjectChange = (
    _: React.SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    updateFilterInQuery(value?._id ?? '', 'subjectId')
    resetPage()
  }

  const [selectedlevel, setLevel] = useState<ProficiencyLevelEnum[]>([])

  const onLevelChange = (event: SelectChangeEvent<ProficiencyLevelEnum[]>) => {
    const {
      target: { value }
    } = event
    // setLevel(value)
    setLevel(value as ProficiencyLevelEnum[])
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
          MenuProps={MenuProps}
          id='demo-multiple-checkbox'
          input={<OutlinedInput label='Level' />}
          labelId='demo-multiple-checkbox-label'
          multiple
          onChange={onLevelChange}
          renderValue={(selected) => {
            return selected.join(', ')
          }}
          style={styles.drowlevel as React.CSSProperties}
          value={filters.proficiencyLevel}
        >
          {levelLists.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedlevel.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={styles.drowstyle as React.CSSProperties}>
          {t('myCoursesPage.filterLabel.levels')}
        </FormHelperText>
      </FormControl>
    </>
  )

  return (
    <Box sx={styles.container}>
      {!isMobile && (
        <AppToolbar sx={styles.otherToolbar as React.CSSProperties}>
          {AppAutoCompleteList}
        </AppToolbar>
      )}
      {isMobile && AppAutoCompleteList}
    </Box>
  )
}

export default CourseSearchToolbar
