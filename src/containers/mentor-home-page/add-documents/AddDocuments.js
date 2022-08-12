import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import img from '~/assets/img/mentor-home-page/become-tutor/add-documents.png'

import { style } from '~/containers/mentor-home-page/add-documents/add-documents.style'

const AddDocuments = ({ btnsBox, uploadCertificates }) => {
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
        <Box>
          <Typography mb={ 5 } variant='body1'>
            { t('becomeTutor.documents.description') }
          </Typography>    
          <FileUploader
            buttonText={ t('becomeTutor.documents.button') } upload={ uploadCertificates }
          />
        </Box>

        { btnsBox }
      </Box> 
    </Box>
  )
}

export default AddDocuments
