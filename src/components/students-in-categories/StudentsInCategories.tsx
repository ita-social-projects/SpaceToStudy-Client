import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import { styles } from './StudentsInCategories.styles'
import SchoolIcon from '@mui/icons-material/School'
import EventIcon from '@mui/icons-material/Event'
import StudentsInCatgoriesChart from './StudentsInCategoriesChart'
import { useTranslation } from 'react-i18next'
import { currencies, years } from './StudentsInCategories.constants'

function StudentsInCatgories() {
  const { t } = useTranslation()
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
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
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
          {years.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
        <Button sx={styles.clearAllButton} variant='text'>
          {t('tutorHomePage.studentsInCategories.resetButton')}
        </Button>
      </Box>
      <StudentsInCatgoriesChart />
    </Box>
  )
}

export default StudentsInCatgories
