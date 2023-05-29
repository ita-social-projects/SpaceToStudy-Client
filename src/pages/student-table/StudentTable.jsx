import UserTable from '~/components/user-table/UserTable'

import {
  columns,
  initialFilters,
  initialSort,
  tabsInfo
} from '~/pages/student-table/constants'
import { UserRoleEnum } from '~/types'

const StudentTable = () => {
  return (
    <UserTable
      columns={columns}
      initialFilters={initialFilters}
      initialSort={initialSort}
      role={UserRoleEnum.Student}
      tabsInfo={tabsInfo}
    />
  )
}

export default StudentTable
