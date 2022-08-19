import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import addDocumentsPNG from '~/assets/img/mentor-home-page/become-tutor/add-documents.png'

import { style } from '~/containers/mentor-home-page/add-documents/add-documents.style'

const maxFileSize = 10_000_000
const maxAllFilesSize = 50_000_000
const filesTypes = ['application/pdf', 'image/jpeg', 'image/png']

const AddDocuments = ({ btnsBox, documents, documentsError, addDocuments }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.root }>
      <Box
        alt={ t('becomeTutor.documents.imageAlt') }
        component='img'
        src={ addDocumentsPNG }
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
            filesTypes={ filesTypes }
            initialError={ documentsError }
            initialState={ documents }
            maxAllFilesSize={ maxAllFilesSize }
            maxFileSize={ maxFileSize }
            maxQuantityFiles={ 8 }
          />
        </Box>

        { btnsBox }
      </Box> 
    </Box>
  )
}

export default AddDocuments
