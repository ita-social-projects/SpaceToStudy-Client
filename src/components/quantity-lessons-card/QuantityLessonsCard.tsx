import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import { styles } from './QuantityLessonsCard.styles'
import SchoolIcon from '@mui/icons-material/School'
import EventIcon from '@mui/icons-material/Event'
import QuantityLessonsChart from './QuantityLessonsChart'
import { useTranslation } from 'react-i18next'
import { categories, subjects, years } from './QuantityLessons.constants'

function QuantityLessonsCard() {
  const { t } = useTranslation()
  return (
    <Box sx={styles.cardContainer}>
      <Typography sx={styles.cardContainerTitle}>
        {t('tutorHomePage.lessonsQuantity.title')}
      </Typography>
      <Typography sx={styles.cardContainerCaption}>
        {t('tutorHomePage.lessonsQuantity.subTitle')}
      </Typography>
      <Box sx={styles.selectAndButtonContainer}>
        <Select
          displayEmpty
          renderValue={(value: string) => (
            <Box sx={styles.selectedValue}>
              <SchoolIcon />{' '}
              {value ?? t('tutorHomePage.lessonsQuantity.select.category')}
            </Box>
          )}
          sx={styles.select}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>

        <Select
          displayEmpty
          renderValue={(value: string) => (
            <Box sx={styles.selectedValue}>
              <SchoolIcon />{' '}
              {value ?? t('tutorHomePage.lessonsQuantity.select.subject')}
            </Box>
          )}
          sx={styles.select}
        >
          {subjects.map((option) => (
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
              {value ?? t('tutorHomePage.lessonsQuantity.select.year')}
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
          {t('tutorHomePage.lessonsQuantity.resetButton')}
        </Button>
      </Box>
      <QuantityLessonsChart />
    </Box>
  )
}

export default QuantityLessonsCard
