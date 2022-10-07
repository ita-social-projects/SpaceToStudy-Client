import EnhancedTable from '~/components/enhanced-table/EnhancedTable'

export const tabsInfo = {
  null: {
    label: 'studentTable.all',
    key: 'isEmailConfirmed',
    value: null,
    component: (props) => <EnhancedTable { ...props } />
  },
  true: {
    label: 'studentTable.active',
    key: 'isEmailConfirmed',
    value: true,
    component: (props) => <EnhancedTable { ...props } />
  },
  false: {
    label: 'studentTable.unactive',
    key: 'isEmailConfirmed',
    value: false,
    component: (props) => <EnhancedTable { ...props } />
  }
}

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
