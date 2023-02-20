import EnhancedTable from '~/components/enhanced-table/EnhancedTable'

export const initialFilters = {
  name: '',
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
    field: 'name',
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
