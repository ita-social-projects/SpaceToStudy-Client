import React from 'react'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import img from '~/assets/img/mentor-home-page/add-documents.png'
import { style } from '~/containers/mentor-home-page/add-documents/add-documents.style'

const AddDocuments = ({ btnsBox }) => {
  return (
    <Box sx={ style.root }>
      <Box
        alt='smg' component='img' src={ img }
        sx={ style.img }
      />
      <Box sx={ style.rigthBox }>
        <Typography variant='body1'>Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</Typography>    
        <FileUploader />
        { btnsBox }
      </Box> 
    </Box>
  )
}

export default AddDocuments
