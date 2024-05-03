import { FC } from 'react'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

import { styles } from '~/components/drag-handle/DragHandle.styles'

import { useSortableItemContext } from '~/context/sortable-context'

interface DragHandleProps {
  iconStyles?: SxProps
  wrapperStyles?: SxProps
}

const DragHandle: FC<DragHandleProps> = ({ iconStyles, wrapperStyles }) => {
  const { attributes, listeners, ref } = useSortableItemContext()
  return (
    <Box ref={ref} sx={wrapperStyles} {...attributes} {...listeners}>
      <DragIndicatorIcon sx={{ ...styles.dragIcon, ...iconStyles }} />
    </Box>
  )
}

export default DragHandle
