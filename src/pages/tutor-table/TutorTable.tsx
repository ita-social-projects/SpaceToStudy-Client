import UserTable from '~/components/user-table/UserTable'

import { tutor } from '~/constants'
import {
  columns,
  initialFilters,
  initialSort,
  tabsInfo
} from '~/pages/tutor-table/constants'

const TutorTable = () => {
  return (
    <UserTable
      columns={columns}
      initialFilters={initialFilters}
      initialSort={initialSort}
      role={tutor}
      tabsInfo={tabsInfo}
    />
  )
}

export default TutorTable
