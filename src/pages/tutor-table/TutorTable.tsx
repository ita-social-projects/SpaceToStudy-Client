import BaseUserTable from '~/components/base-user-table/BaseUserTable'

import { tutor } from '~/constants'

const TutorTable = () => {
  return (
    <BaseUserTable
      role={ tutor }
    />
  )
}

export default TutorTable
