import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Box, Typography } from '@mui/material'
import { styles } from './StudentsInCategories.styles'
import { useTranslation } from 'react-i18next'

ChartJS.register(ArcElement, Tooltip, Legend)

const categories = [
  { label: 'Languages', value: 75, color: '#79B260' },
  { label: 'Mathematics', value: 12, color: '#FFD166' },
  { label: 'History', value: 8, color: '#EF476F' },
  { label: 'Other (+3)', value: 5, color: '#6C757D' }
]

const data = {
  labels: categories.map((category) => category.label),
  datasets: [
    {
      data: categories.map((category) => category.value),
      backgroundColor: categories.map((category) => category.color),
      hoverBackgroundColor: categories.map((category) => category.color),
      borderWidth: 1,
      cutout: '70%',
      rotation: 180
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true
    }
  }
}

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
        {categories.map((category, index) => (
          <Box key={index} sx={styles.legendRow}>
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
