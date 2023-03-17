import BaseUserTable from '~/components/base-user-table/BaseUserTable'

import { student } from '~/constants'

const StudentTable = () => {
  return (
    <BaseUserTable
      role={ student }
    />
  )
}

export default StudentTable
