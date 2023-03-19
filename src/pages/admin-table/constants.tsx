import EnhancedTable from '~/components/enhanced-table/EnhancedTable'

import { Options, TabsInfo } from '~/types/common/types/common.types'
import { UserInitialFilters } from '~/types/user-table/types/user-table.types'

export const tabsInfo: TabsInfo<Options<UserInitialFilters>> = {
  all: {
    label: 'baseUserTable.all',
    key: 'status',
    value: 'all',
    component: (props) => <EnhancedTable { ...props } />
  },
  active: {
    label: 'baseUserTable.active',
    key: 'status',
    value: 'active',
    component: (props) => <EnhancedTable { ...props } />
  },
  blocked: {
    label: 'baseUserTable.blocked',
    key: 'status',
    value: 'blocked',
    component: (props) => <EnhancedTable { ...props } />
  },
  invited: {
    label: 'baseUserTable.invited',
    key: 'status',
    value: 'invited',
    component: (props) => <EnhancedTable { ...props } />
  }
}
