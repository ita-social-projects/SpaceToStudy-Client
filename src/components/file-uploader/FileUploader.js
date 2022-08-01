import { useState } from 'react'
import { Box, Typography, Button, IconButton, ListItem, List } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'

import { style } from '~/components/file-uploader/file-uploader.style'


const FileUploader = () => {
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
    e.preventDefault()
    if (files.length < 1) {
      setFiles([...e.dataTransfer.files])
    }
    setFiles([...files, ...e.dataTransfer.files])
    setDrag(false)
  }
  
  const deleteFile = (fileName) => {
    setFiles(files.filter(item => item.name !== fileName))
  }
  console.log(files)
  
  const filesList = files.map(item => (
    <ListItem key={ Math.random(10) } sx={ style.listItem }>
      <Typography ml={ 1 } variant='body2'>
        { item.name }
      </Typography> 
      <IconButton onClick={ () => deleteFile(item.name) } size='small' >    
        <CloseIcon sx={ style.close } />
      </IconButton>
    </ListItem>
  ))
    
  return (
    <Box
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
    
      <Button>
        <CloudUploadIcon sx={ style.icon } />
        Upload your certificate
      </Button>
    </Box>
  )
}

export default FileUploader
