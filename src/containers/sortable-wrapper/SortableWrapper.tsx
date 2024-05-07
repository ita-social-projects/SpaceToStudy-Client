import { CSSProperties, FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'

import { SortableItemProvider } from '~/context/sortable-context'

interface SortableWrapperProps {
  id: string
  children: React.ReactNode
  onDragStartStyles: SxProps
  onDragEndStyles: SxProps
}

const SortableWrapper: FC<SortableWrapperProps> = ({
  id,
  onDragEndStyles,
  onDragStartStyles,

  children
}) => {
  const { isDragging, setNodeRef, transform, transition } = useSortable({ id })

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : 1,
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <Box
      ref={setNodeRef}
      sx={{
        ...style,
        ...(isDragging ? onDragStartStyles : onDragEndStyles)
      }}
    >
      <SortableItemProvider id={id}>{children}</SortableItemProvider>
    </Box>
  )
}

export default SortableWrapper
