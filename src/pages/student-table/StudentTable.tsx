import UserTable from '~/components/user-table/UserTable'

import { student } from '~/constants'
import {
  columns,
  initialFilters,
  initialSort,
  tabsInfo
} from '~/pages/student-table/constants'

const StudentTable = () => {
  return (
    <UserTable
      columns={columns}
      initialFilters={initialFilters}
      initialSort={initialSort}
      role={student}
      tabsInfo={tabsInfo}
    />
  )
}

export default StudentTable
