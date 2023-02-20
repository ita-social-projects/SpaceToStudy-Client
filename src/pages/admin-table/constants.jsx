import EnhancedTable from '~/components/enhanced-table/EnhancedTable'

export const initialFilters = {
  name: '',
  email: '',
  status: [],
  lastLogin: {
    from: '',
    to: ''
  },
  createdAt: {
    from: '',
    to: ''
  },
}

export const initialSort = { order: 'asc', orderBy: 'email' }

export const tabsInfo = {
  null: {
    label: 'adminTable.all',
    key: 'status',
    value: null,
    component: (props) => <EnhancedTable { ...props } />
  },
  true: {
    label: 'adminTable.active',
    key: 'status',
    value: true,
    component: (props) => <EnhancedTable { ...props } />
  },
  false: {
    label: 'adminTable.blocked',
    key: 'status',
    value: false,
    component: (props) => <EnhancedTable { ...props } />
  }
}

export const columns = [
  {
    label: 'adminTable.name',
    field: 'name',
    dataType: 'string'
  },
  {
    label: 'adminTable.email',
    field: 'email',
    dataType: 'string'
  },
  {
    label: 'adminTable.status',
    field: 'status',
    dataType: 'enums',
    filterEnum: [
      {
        label: 'adminTable.active',
        value: ['active']
      },
      {
        label: 'adminTable.blocked',
        value: ['blocked']
      }
    ]
  },
  {
    label: 'adminTable.lastLogin',
    field: 'lastLogin',
    calculatedCellValue: (item) => new Date(item.lastLogin).toLocaleString(),
    dataType: 'date'
  },
  {
    label: 'adminTable.signedUp',
    field: 'createdAt',
    calculatedCellValue: (item) => new Date(item.createdAt).toLocaleString(),
    dataType: 'date'
  },
]
