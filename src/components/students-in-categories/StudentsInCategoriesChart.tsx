import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Box, Typography } from '@mui/material'
import { styles } from './StudentsInCategories.styles'
import { useTranslation } from 'react-i18next'
import { categories, data, options } from './StudentsInCategories.constants'

ChartJS.register(ArcElement, Tooltip, Legend)

const StudentsInCategoriesChart = () => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.chartAndLegendContainer}>
      <Box sx={styles.diagramContainer}>
        <Doughnut data={data} options={options} />
        <Box sx={styles.diagramInnerText}>
          <Typography sx={styles.totalStudents}>24</Typography>
          <Typography sx={styles.allStudents}>
            {t('tutorHomePage.studentsInCategories.allStudents')}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.legendContainer}>
        {categories.map((category) => (
          <Box key={category.label} sx={styles.legendRow}>
            <Box sx={styles.legendBoxIcon(category.color)} />
            <Typography sx={styles.category}>{category.label}</Typography>
            <Typography sx={styles.percentage}>{category.value}%</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default StudentsInCategoriesChart
