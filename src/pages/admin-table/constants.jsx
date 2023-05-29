import EnhancedTable from '~/components/enhanced-table/EnhancedTable'

import { SortEnum } from '~/types'

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

export const initialSort = { order: SortEnum.Asc, orderBy: 'email' }

export const tabsInfo = {
  all: {
    label: 'userTable.all',
    key: 'status',
    value: 'all',
    component: (props) => <EnhancedTable {...props} />
  },
  active: {
    label: 'userTable.active',
    key: 'status',
    value: 'active',
    component: (props) => <EnhancedTable {...props} />
  },
  blocked: {
    label: 'userTable.blocked',
    key: 'status',
    value: 'blocked',
    component: (props) => <EnhancedTable {...props} />
  },
  invited: {
    label: 'userTable.invited',
    key: 'status',
    value: 'invited',
    component: (props) => <EnhancedTable {...props} />
  }
}

export const columns = [
  {
    label: 'userTable.name',
    field: 'name',
    dataType: 'string',
    calculatedCellValue: (item) => `${item.firstName} ${item.lastName}`
  },
  {
    label: 'userTable.email',
    field: 'email',
    dataType: 'string'
  },
  {
    label: 'userTable.status',
    field: 'status',
    dataType: 'enums',
    filterEnum: [
      {
        label: 'userTable.active',
        value: 'active'
      },
      {
        label: 'userTable.blocked',
        value: 'blocked'
      }
    ]
  },
  {
    label: 'userTable.lastLogin',
    field: 'lastLogin',
    calculatedCellValue: (item) => new Date(item.lastLogin).toLocaleString(),
    dataType: 'date'
  },
  {
    label: 'userTable.signedUp',
    field: 'createdAt',
    calculatedCellValue: (item) => new Date(item.createdAt).toLocaleString(),
    dataType: 'date'
  }
]
