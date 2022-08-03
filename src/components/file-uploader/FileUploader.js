import { useState } from 'react'
import { Box, Typography, Button, IconButton, ListItem, List } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'

import { style } from '~/components/file-uploader/file-uploader.style'


const FileUploader = ({ buttonText }) => {
  const [drag, setDrag] = useState(false)
  const [files, setFiles] = useState([])
  
  const dragStart = (e) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeave = (e) => {
    e.preventDefault()
    setDrag(false)
  }
  const dragDrop = (e) => {
    e.preventDefault()  //TODO add validation function
    setFiles([...files, ...e.dataTransfer.files])
    setDrag(false)
  }
  const addFiles = (e) => {
    e.preventDefault()  //TODO add validation function
    setFiles([...files, ...e.target.files])
  }
  
  const deleteFile = (file) => {
    setFiles(files.filter(item => item !== file))
  }
  
  const filesList = files.map(item => (
    <ListItem key={ Math.random(10) } sx={ style.listItem }>
      <Typography sx={ style.fileName } variant='body2'>
        { item.name }
      </Typography> 
      <IconButton onClick={ () => deleteFile(item) } size='small' >    
        <CloseIcon sx={ style.close } />
      </IconButton>
    </ListItem>
  ))
    
  return (
    <Box
      data-testid='drop'
      onDragLeave={ dragLeave }
      onDragOver={ dragStart }
      onDragStart={ dragStart }
      onDrop={ dragDrop }
      sx={ drag ? style.rootDrag : style.root }
    >
        
      { (files.length > 0)  && 
      (<List sx={ { width: '100%' } }>
        { filesList }
      </List>) }
    
      <Button component='label'>
        <CloudUploadIcon sx={ style.icon } />
        { buttonText }
        <input
          hidden
          multiple
          onChange={ addFiles }
          type="file"
        />
      </Button>
    </Box>
  )
}

export default FileUploader
