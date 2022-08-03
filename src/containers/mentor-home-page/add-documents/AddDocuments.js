import React from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import FileUploader from '~/components/file-uploader/FileUploader'
import img from '~/assets/img/mentor-home-page/add-documents.png'
import { style } from '~/containers/mentor-home-page/add-documents/add-documents.style'

const AddDocuments = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.root }>
      <Box
        alt={ t('becomeTutor.documents.imageAlt') }
        component='img'
        src={ img }
        sx={ style.img }
      />
      <Box sx={ style.rigthBox }>
        <Typography variant='body1'>
          { t('becomeTutor.documents.description') }
        </Typography>    
        <FileUploader buttonText={ t('becomeTutor.documents.button') } />
        { btnsBox }
      </Box> 
    </Box>
  )
}

export default AddDocuments
