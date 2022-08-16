import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import img from '~/assets/img/mentor-home-page/become-tutor/add-documents.png'
import { certificates as certificatesValidation } from '~/constants/validation/files'

import { style } from '~/containers/mentor-home-page/add-documents/add-documents.style'

const AddDocuments = ({ btnsBox, documents, documentsError, addDocuments }) => {
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
            buttonText={ t('becomeTutor.documents.button') }
            emitter={ addDocuments }
            initialError={ documentsError }
            initialState={ documents }
            maxQuantityFiles={ 8 }
            validation={ certificatesValidation }
          />
        </Box>

        { btnsBox }
      </Box> 
    </Box>
  )
}

export default AddDocuments
