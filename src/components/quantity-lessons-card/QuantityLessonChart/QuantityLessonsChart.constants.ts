import palette from '~/styles/app-theme/app.pallete'

export const data = {
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

export const options = {
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
