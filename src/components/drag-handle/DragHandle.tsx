import { FC } from 'react'
import { Box, SxProps } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

import { useSortableItemContext } from '~/context/sortable-context'

interface DragHandleProps {
  iconStyles?: SxProps
  wrapperStyles?: SxProps
}

const DragHandle: FC<DragHandleProps> = ({ iconStyles, wrapperStyles }) => {
  const { attributes, listeners, ref } = useSortableItemContext()
  return (
    <Box ref={ref} {...attributes} {...listeners} sx={wrapperStyles}>
      <DragIndicatorIcon sx={iconStyles} />
    </Box>
  )
}

export default DragHandle
