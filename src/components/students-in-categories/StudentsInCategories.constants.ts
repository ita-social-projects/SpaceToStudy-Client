import palette from '~/styles/app-theme/app.pallete'

export const selectedCategory = [
  {
    value: 'Music'
  },

  {
    value: 'Marketing'
  },

  {
    value: 'Bology'
  },

  {
    value: 'IT'
  }
]

export const years = [
  {
    value: new Date().getFullYear() - 3
  },

  {
    value: new Date().getFullYear() - 2
  },

  {
    value: new Date().getFullYear() - 1
  },

  {
    value: new Date().getFullYear()
  }
]

export const categories = [
  { label: 'Languages', value: 75, color: palette.success[300] },
  { label: 'Mathematics', value: 12, color: palette.warning[500] },
  { label: 'History', value: 8, color: palette.error[400] },
  { label: 'Other (+3)', value: 5, color: palette.basic.bismark }
]
