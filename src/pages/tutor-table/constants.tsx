import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import {
  InitialSort,
  TabsInfo,
  Column,
  Options,
  UserInitialFilters,
  UserInterface
} from '~/types'

export const initialFilters: UserInitialFilters = {
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

export const initialSort: InitialSort = { order: 'asc', orderBy: 'email' }

export const tabsInfo: TabsInfo<Options<UserInitialFilters>> = {
  all: {
    label: 'baseUserTable.all',
    key: 'status',
    value: 'all',
    component: (props) => <EnhancedTable {...props} />
  },
  active: {
    label: 'baseUserTable.active',
    key: 'status',
    value: 'active',
    component: (props) => <EnhancedTable {...props} />
  },
  blocked: {
    label: 'baseUserTable.blocked',
    key: 'status',
    value: 'blocked',
    component: (props) => <EnhancedTable {...props} />
  }
}

export const columns: Column<UserInterface>[] = [
  {
    label: 'baseUserTable.name',
    field: 'name',
    dataType: 'string',
    calculatedCellValue: (item) => `${item.firstName} ${item.lastName}`
  },
  {
    label: 'baseUserTable.email',
    field: 'email',
    dataType: 'string'
  },
  {
    label: 'baseUserTable.status',
    field: 'status',
    dataType: 'enums',
    filterEnum: [
      {
        label: 'baseUserTable.active',
        value: 'active'
      },
      {
        label: 'baseUserTable.blocked',
        value: 'blocked'
      }
    ]
  },
  {
    label: 'baseUserTable.lastLogin',
    field: 'lastLogin',
    calculatedCellValue: (item) => new Date(item.lastLogin).toLocaleString(),
    dataType: 'date'
  },
  {
    label: 'baseUserTable.signedUp',
    field: 'createdAt',
    calculatedCellValue: (item) => new Date(item.createdAt).toLocaleString(),
    dataType: 'date'
  }
]
