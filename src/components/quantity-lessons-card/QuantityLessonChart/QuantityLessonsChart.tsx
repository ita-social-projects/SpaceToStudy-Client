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
import { data, options } from './QuantityLessonsChart.constants'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const QuantityLessonsChart = () => {
  const { isMobile } = useBreakpoints()

  const dataResponsive = useMemo(() => {
    const obj = data
    obj.datasets[0].barThickness = isMobile ? 20 : 28

    return obj
  }, [isMobile])

  return (
    <Box height='181px' key={+isMobile}>
      <Bar data={dataResponsive} options={options} />
    </Box>
  )
}

export default QuantityLessonsChart
