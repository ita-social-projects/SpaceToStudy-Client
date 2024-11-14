import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import { styles } from './StudentsInCategories.styles'
import SchoolIcon from '@mui/icons-material/School'
import EventIcon from '@mui/icons-material/Event'
import StudentsInCategoriesChart from './StudentsInCategoriesChart'
import { useTranslation } from 'react-i18next'
import { selectedCategory, years } from './StudentsInCategories.constants'
import { useCallback } from 'react'

function StudentsInCategories() {
  const { t } = useTranslation()

  const selectOption = useCallback(
    (options: { value: number | string }[]) =>
      options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.value}
        </MenuItem>
      )),
    []
  )
  return (
    <Box sx={styles.cardContainer}>
      <Typography sx={styles.cardTitle}>
        {t('tutorHomePage.studentsInCategories.title')}
      </Typography>
      <Typography sx={styles.cardSubTitle}>
        {t('tutorHomePage.studentsInCategories.subTitle')}
      </Typography>
      <Box sx={styles.selectAndButtonContainer}>
        <Select
          displayEmpty
          renderValue={(value: string) => (
            <Box sx={styles.selectedValue}>
              <SchoolIcon />{' '}
              {value ?? t('tutorHomePage.studentsInCategories.select.category')}
            </Box>
          )}
          sx={styles.select}
        >
          {selectOption(selectedCategory)}
        </Select>

        <Select
          displayEmpty
          renderValue={(value: string) => (
            <Box sx={styles.selectedValue}>
              <EventIcon />{' '}
              {value ?? t('tutorHomePage.studentsInCategories.select.year')}
            </Box>
          )}
          sx={styles.select}
        >
          {selectOption(years)}
        </Select>

        <Button sx={styles.clearAllButton} variant='text'>
          {t('tutorHomePage.studentsInCategories.resetButton')}
        </Button>
      </Box>
      <StudentsInCategoriesChart />
    </Box>
  )
}

export default StudentsInCategories
