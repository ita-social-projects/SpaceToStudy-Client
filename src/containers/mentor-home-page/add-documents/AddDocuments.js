import React from 'react'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import img from '~/assets/img/mentor-home-page/add-documents.png'
import { style } from '~/containers/mentor-home-page/add-documents/add-documents.style'

<<<<<<< HEAD
const AddDocuments = ({ btnsBox }) => {
=======
const AddDocuments = () => {

>>>>>>> a99f22a (upload button)
  return (
    <Box sx={ style.root }>
      <Box
        alt='smg' component='img' src={ img }
        sx={ style.img }
      />
      <Box sx={ style.rigthBox }>
        <Typography variant='body1'>
          To download certificates, drag your certificates to the square or click the `Upload your certificate` button.
        </Typography>    
        <FileUploader />
        { btnsBox }
      </Box> 
    </Box>
  )
}

export default AddDocuments
