import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import { InitialSort, TabsInfo, Column } from '~/types'

import { userInterface, Column } from '~/types/common/interfaces/common.interfaces'
import { InitialSort, TabsInfo, Options } from '~/types/common/types/common.types'
import { UserInitialFilters } from '~/types/user-table/types/user-table.types'

export const baseInitialFilters: UserInitialFilters = {
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

export const baseInitialSort: InitialSort = { order: 'asc', orderBy: 'email' }

export const baseTabsInfo: TabsInfo<Options<UserInitialFilters>> = {
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

export const baseColumns: Column<userInterface>[] = [
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
