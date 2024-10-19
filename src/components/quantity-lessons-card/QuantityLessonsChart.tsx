import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Box } from '@mui/material'
import useBreakpoints from '~/hooks/use-breakpoints'
import palette from '~/styles/app-theme/app.pallete'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ],
  datasets: [
    {
      label: 'Lessons',
      data: [5, 5, 10, 10, 12, 15, 14, 14, 10, 10, 12, 12],
      backgroundColor: palette.success[300],
      borderColor: palette.success[300],
      borderWidth: 1,
      barThickness: 28
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: palette.basic.darkGray,
        weight: 'normal'
      },
      border: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      max: 15,
      ticks: {
        stepSize: 5
      },
      border: {
        display: false
      }
    }
  }
}

const QuantityLessonsChart = () => {
  const { isMobile } = useBreakpoints()

  const dataResponsive = useMemo(() => {
    const obj = data
    obj.datasets[0].barThickness = isMobile ? 20 : 28

    return obj
  }, [isMobile])

  return (
    <Box height={'181px'} key={+isMobile}>
      <Bar data={dataResponsive} options={options} />
    </Box>
  )
}

export default QuantityLessonsChart
