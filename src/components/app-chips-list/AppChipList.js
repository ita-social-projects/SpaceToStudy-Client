import { useState } from 'react'
import { Chip, Box } from '@mui/material'
import { styles } from '~/components/app-chips-list/AppChipsList-styles'
import AppChip from '../app-chip/AppChip'

const AppChipList = ({ items, defaultQuantity, handleChipDelete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const amountOfChips = isOpen ? items.length : defaultQuantity
  const itemsForChips = items.slice(0, amountOfChips)
  const hideChips = items.length - defaultQuantity > 0 && items.length - defaultQuantity

  const chips = itemsForChips.map((item) => (
    <AppChip handleDelete={ () => handleChipDelete(item) } key={ item }>
      { item }
    </AppChip>
  ))

  const showMore = () => {
    setIsOpen(true)
  }

  return (
    <Box sx={ styles.feature }>
      { chips }
      { !isOpen && hideChips && (
        <Chip
          data-testid='amount-of-chips' label={ `+${hideChips}` } onClick={ showMore }
          sx={ styles.chip }
        />
      ) }
    </Box>
  )
}

export default AppChipList
