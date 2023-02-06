import EnhancedTable from '~/components/enhanced-table/EnhancedTable'

export const initialFilters = {
  firstName: '',
  email: '',
  lastLogin: {
    from: '',
    to: ''
  },
  isFirstLogin: []
}

export const initialSort = { order: 'asc', orderBy: 'email' }

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
    calculatedCellValue: (item) => `${item.firstName} ${item.lastName}`,
    dataType: 'string'
  },
  {
    label: 'studentTable.email',
    field: 'email',
    dataType: 'string'
  },
  {
    label: 'studentTable.lastLogin',
    field: 'lastLogin',
    calculatedCellValue: (item) => new Date(item.lastLogin).toLocaleString(),
    dataType: 'date'
  },
  {
    label: 'studentTable.firstLogin',
    field: 'isFirstLogin',
    dataType: 'enums',
    filterEnum: [
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
