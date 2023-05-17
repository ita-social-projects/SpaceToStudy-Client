import UserTable from '~/components/user-table/UserTable'

import {
  columns,
  initialFilters,
  initialSort,
  tabsInfo
} from '~/pages/tutor-table/constants'
import { UserRoleEnum } from '~/types'

const TutorTable = () => {
  return (
    <UserTable
      columns={columns}
      initialFilters={initialFilters}
      initialSort={initialSort}
      role={UserRoleEnum.Tutor}
      tabsInfo={tabsInfo}
    />
  )
}

export default TutorTable
