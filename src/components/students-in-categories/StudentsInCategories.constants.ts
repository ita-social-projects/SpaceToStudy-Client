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
