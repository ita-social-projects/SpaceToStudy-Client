import UserTable from '~/components/user-table/UserTable'

import { admin } from '~/constants'
import {
  columns,
  initialFilters,
  initialSort,
  tabsInfo
} from '~/pages/admin-table/constants'

const AdminTable = () => {
  return (
    <UserTable
      columns={columns}
      initialFilters={initialFilters}
      initialSort={initialSort}
      role={admin}
      tabsInfo={tabsInfo}
    />
  )
}

export default AdminTable
