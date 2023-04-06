import useUpload from '~/hooks/use-upload'
import { Box } from '@mui/material'

const DragAndDrop = ({
  emitter,
  initialState = [],
  validationData,
  children,
  style
}) => {
  const { dragStart, dragLeave, dragDrop, isDrag } = useUpload({
    files: initialState,
    emitter: emitter,
    validationData
  })

  return (
    <Box
      onDragLeave={dragLeave}
      onDragOver={dragStart}
      onDragStart={dragStart}
      onDrop={dragDrop}
      sx={style.root}
    >
      <Box sx={[style.uploadBox, isDrag && style.activeDrag]}>{children}</Box>
    </Box>
  )
}

export default DragAndDrop
