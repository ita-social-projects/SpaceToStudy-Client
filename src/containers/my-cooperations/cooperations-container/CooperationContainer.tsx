import { FC } from 'react'
import Box from '@mui/material/Box'
import CooperationCard from '~/containers/my-cooperations/cooperation-card/CooperationCard'
import { Cooperation } from '~/types'
import { styles } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

interface CooperationContainerProps {
  items: Cooperation[]
}

const CooperationContainer: FC<CooperationContainerProps> = ({ items }) => {
  const cooperationItems = (
    <Box sx={styles.root}>
      {items.map((item) => (
        <CooperationCard cooperation={item} key={item._id} />
      ))}
    </Box>
  )

  return cooperationItems
}

export default CooperationContainer
