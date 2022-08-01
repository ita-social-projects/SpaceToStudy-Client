import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const style = {
  root: { 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    mt: 5,
    width: '100%',
    minHeight: '150px',
    border: 'dashed',
    borderColor: 'primary.200'
  },
  rootDrag: { 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    mt: 5,
    width: '100%',
    minHeight: '150px',
    border: 'dashed',
    backgroundColor: 'primary.50'
  },
  icon: {
    m: 'auto',
    mr: 1,
    color: 'primary.700'
  }
}

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
  console.log(files)
  
  const filesList = files.map(item => (
    <Typography key={ Math.random(10) } variant='body2'>
      { item.name }
    </Typography> 
  ))
  return (
    <Box
      onDragLeave={ dragLeave }
      onDragOver={ dragStart }
      onDragStart={ dragStart }
      onDrop={ dragDrop }
      sx={ drag ? style.rootDrag : style.root  }
    >
        
      { (files.length > 0)  && 
      (<Box>
        { filesList }
      </Box>) }
    
      <Button>
        <CloudUploadIcon sx={ style.icon } />
        Upload your certificate
      </Button>
    </Box>
  )
}

export default FileUploader
