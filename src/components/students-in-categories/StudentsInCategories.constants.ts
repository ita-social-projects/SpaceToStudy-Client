import palette from '~/styles/app-theme/app.pallete'

export const selectedCategory = [
  {
    value: 'Music'
  },

  {
    value: 'Marketing'
  },

  {
    value: 'Biology'
  },

  {
    value: 'IT'
  }
]

const currentYear = new Date().getFullYear()
export const years = [
  {
    value: currentYear - 3
  },

  {
    value: currentYear - 2
  },

  {
    value: currentYear - 1
  },

  {
    value: currentYear
  }
]

export const categories = [
  { label: 'Languages', value: 75, color: palette.success[300] },
  { label: 'Mathematics', value: 12, color: palette.warning[500] },
  { label: 'History', value: 8, color: palette.error[400] },
  { label: 'Other (+3)', value: 5, color: palette.basic.bismark }
]

export const data = {
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

export const options = {
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
