import { FC } from 'react'
import Box from '@mui/material/Box'

import CooperationCard from '~/containers/my-cooperations/cooperation-card/CooperationCard'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import AcceptCooperationModal from '~/containers/my-cooperations/accept-cooperation-modal/AcceptCooperationModal'
import useBreakpoints from '~/hooks/use-breakpoints'
import { SortHook } from '~/hooks/table/use-sort'
import { ajustColumns } from '~/utils/helper-functions'
import { useModalContext } from '~/context/modal-context'

import { Cooperation, SizeEnum, StatusEnum } from '~/types'
import {
  columns,
  removeColumnRules
} from '~/containers/my-cooperations/cooperations-container/CooperationContainer.constants'
import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

interface CooperationContainerProps {
  items: Cooperation[]
  showTable: boolean
  sort: SortHook
  getCooperations: () => Promise<void>
}

const CooperationContainer: FC<CooperationContainerProps> = ({
  items,
  sort,
  showTable,
  getCooperations
}) => {
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()

  const columnsToShow = ajustColumns<Cooperation>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const handleCardClick = (item: Cooperation) => {
    item.status === StatusEnum.Pending &&
      openModal({
        component: (
          <AcceptCooperationModal
            cooperation={item}
            getCooperations={getCooperations}
          />
        )
      })
  }

  const cooperationGrid = (
    <Box sx={styles.root}>
      {items.map((item) => (
        <CooperationCard
          cooperation={item}
          key={item._id}
          onClick={() => handleCardClick(item)}
        />
      ))}
    </Box>
  )

  const cooperationTable = (
    <EnhancedTable
      columns={columnsToShow}
      data={{ items }}
      onRowClick={handleCardClick}
      size={SizeEnum.Small}
      sort={sort}
      sx={styles.table}
    />
  )

  return showTable ? cooperationTable : cooperationGrid
}

export default CooperationContainer
