export const tabLabels = [
  { label: 'studentTable.all', filterKey: 'isEmailConfirmed', value: null },
  { label: 'studentTable.active', filterKey: 'isEmailConfirmed', value: true },
  { label: 'studentTable.unactive', filterKey: 'isEmailConfirmed', value: false }
]

export const columns = [
  {
    label: 'studentTable.name',
    field: 'firstName',
    calculatedCellValue: (item) => `${item.firstName} ${item.lastName}`
  },
  {
    label: 'studentTable.email',
    field: 'email'
  },
  {
    label: 'studentTable.role',
    field: 'role'
  },
  {
    label: 'studentTable.lastLogin',
    field: 'lastLogin',
    calculatedCellValue: (item) => new Date(item.lastLogin).toLocaleString()
  },
  {
    label: 'studentTable.firstLogin',
    field: 'isFirstLogin',
    filterCheckboxesArr: [
      {
        label: 'studentTable.firstLogin',
        value: true
      },
      {
        label: 'studentTable.notFirstLogin',
        value: false
      }
    ]
  }
]
