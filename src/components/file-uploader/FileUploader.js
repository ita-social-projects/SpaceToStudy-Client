import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'

import useUpload from '~/hooks/use-upload'

import { styles } from '~/components/file-uploader/FileUploader.styles'

const FileUploader = ({ buttonText, emitter, initialState, initialError, validationData }) => {
  const { t } = useTranslation()

  const { dragStart, dragLeave, dragDrop, addFiles, deleteFile, files, isDrag, error } = useUpload({
    initialState: initialState,
    initialError: initialError,
    validationData
  })

  useEffect(() => {
    emitter(files, error)
  }, [files, error, emitter])

  const filesList = files.map((item) => (
    <ListItem key={ item.name + Date.now() } sx={ styles.listItem }>
      <Typography sx={ styles.fileName } variant='body2'>
        { item.name }
      </Typography>
      <IconButton onClick={ () => deleteFile(item) } size='small'>
        <CloseIcon sx={ styles.close } />
      </IconButton>
    </ListItem>
  ))

  return (
    <>
      <Box
        data-testid='drop'
        onDragLeave={ dragLeave }
        onDragOver={ dragStart }
        onDragStart={ dragStart }
        onDrop={ dragDrop }
        sx={ [styles.root, isDrag && styles.rootDrag] }
      >
        { files.length > 0 && (<List sx={ { width: '100%' } }>
          { filesList }
        </List>) }

        <Button component='label'>
          <CloudUploadIcon sx={ styles.icon } />
          { buttonText }
          <input
            hidden multiple onChange={ addFiles }
            type='file'
          />
        </Button>
      </Box>

      { error && (
        <Typography color='error' ml={ 1 } variant='caption'>
          { t(error) }
        </Typography>
      ) }
    </>
  )
}

export default FileUploader
