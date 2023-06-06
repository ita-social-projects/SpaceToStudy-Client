import { FC } from 'react'
import Box from '@mui/material/Box'
import CooperationCard from '~/containers/my-cooperations/cooperation-card/CooperationCard'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import useBreakpoints from '~/hooks/use-breakpoints'
import { SortHook } from '~/hooks/table/use-sort'
import { ajustColumns } from '~/utils/helper-functions'

import { Cooperation, SizeEnum } from '~/types'
import {
  columns,
  removeColumnRules
} from '~/containers/my-cooperations/cooperations-container/CooperationContainer.constants'
import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

interface CooperationContainerProps {
  items: Cooperation[]
  showTable: boolean
  sort: SortHook
}

const CooperationContainer: FC<CooperationContainerProps> = ({
  items,
  sort,
  showTable
}) => {
  const breakpoints = useBreakpoints()

  const columnsToShow = ajustColumns(breakpoints, columns, removeColumnRules)

  const cooperationGrid = (
    <Box sx={styles.root}>
      {items.map((item) => (
        <CooperationCard cooperation={item} key={item._id} />
      ))}
    </Box>
  )

  const cooperationTable = (
    <EnhancedTable
      columns={columnsToShow}
      data={{ items }}
      size={SizeEnum.Small}
      sort={sort}
      sx={styles.table}
    />
  )

  return showTable ? cooperationTable : cooperationGrid
}

export default CooperationContainer
