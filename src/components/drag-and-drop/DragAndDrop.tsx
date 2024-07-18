import { FC, ReactNode } from 'react'
import { Box, SxProps } from '@mui/material'

import useUpload from '~/hooks/use-upload'
import { spliceSx } from '~/utils/helper-functions'
import { AddDocuments, UploadFileEmitter } from '~/types'

interface DragAndDropProps {
  children: ReactNode
  initialState?: File[]
  validationData: AddDocuments
  emitter: UploadFileEmitter
  style: {
    root?: SxProps
    uploadBox?: SxProps
    activeDrag?: SxProps
  }
}

const DragAndDrop: FC<DragAndDropProps> = ({
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

  const uploadBoxStyles = style.uploadBox ? style.uploadBox : {}
  const activeDragStyles = isDrag && style.activeDrag ? style.activeDrag : {}

  return (
    <Box
      onDragLeave={dragLeave}
      onDragOver={dragStart}
      onDragStart={dragStart}
      onDrop={dragDrop}
      sx={style.root}
    >
      <Box sx={spliceSx(uploadBoxStyles, activeDragStyles)}>{children}</Box>
    </Box>
  )
}

export default DragAndDrop
