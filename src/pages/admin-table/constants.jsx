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
  }
}

export const initialSort = { order: 'asc', orderBy: 'email' }

export const tabsInfo = {
  all: {
    label: 'adminTable.all',
    key: 'status',
    value: 'all',
    component: (props) => <EnhancedTable {...props} />
  },
  active: {
    label: 'adminTable.active',
    key: 'status',
    value: 'active',
    component: (props) => <EnhancedTable {...props} />
  },
  blocked: {
    label: 'adminTable.blocked',
    key: 'status',
    value: 'blocked',
    component: (props) => <EnhancedTable {...props} />
  },
  invited: {
    label: 'adminTable.invited',
    key: 'status',
    value: 'invited',
    component: (props) => <EnhancedTable {...props} />
  }
}

export const columns = [
  {
    label: 'adminTable.name',
    field: 'name',
    dataType: 'string',
    calculatedCellValue: (item) => `${item.firstName} ${item.lastName}`
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
        value: 'active'
      },
      {
        label: 'adminTable.blocked',
        value: 'blocked'
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
  }
]
