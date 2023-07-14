import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import AppChip from '~/components/app-chip/AppChip'
import AppPopover from '~/components/app-popover/AppPopover'

import { styles } from '~/components/app-chips-list/AppChipsList-styles'

const AppChipList = ({
  items,
  defaultQuantity,
  handleChipDelete,
  icon,
  wrapperStyle
}) => {
  const hideChips =
    items.length - defaultQuantity > 0 && items.length - defaultQuantity

  const chips = items.map((item) => {
    const handleDelete = handleChipDelete && {
      handleDelete: () => handleChipDelete(item)
    }
    return (
      <AppChip {...handleDelete} icon={icon} key={item}>
        {item}
      </AppChip>
    )
  })

  const initialItems = (
    <Box sx={styles.feature}>{chips.slice(0, defaultQuantity)}</Box>
  )

  const showMoreElem = hideChips && (
    <Chip
      data-testid='amount-of-chips'
      label={`+${hideChips}`}
      sx={styles.chip}
    />
  )

  return (
    <Box sx={wrapperStyle}>
      <AppPopover
        PaperProps={{ sx: styles.paperProps }}
        TransitionProps={{ timeout: 500 }}
        hideElem
        initialItems={initialItems}
        initialItemsWrapperStyle={styles.initialItemsWrapperStyle}
        showMoreElem={showMoreElem}
      >
        <Box sx={{ ...styles.feature, p: '15px 20px' }}>{chips}</Box>
      </AppPopover>
    </Box>
  )
}

export default AppChipList
