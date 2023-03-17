import BaseUserTable from '~/components/base-user-table/BaseUserTable'

import { tabsInfo } from '~/pages/admin-table/constants'
import { admin } from '~/constants'

const AdminTable = () => {
  return (
    <BaseUserTable
      role={ admin }
      tabsInfo={ tabsInfo }
    />
  )
}

export default AdminTable
