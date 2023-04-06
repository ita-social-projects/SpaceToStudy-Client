import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import FileUploader from '~/components/file-uploader/FileUploader'
import addDocumentsPNG from '~/assets/img/tutor-home-page/become-tutor/add-documents.png'

import { styles } from '~/containers/tutor-home-page/add-documents/add-documents.style'

const validationData = {
  maxFileSize: 10_000_000,
  maxAllFilesSize: 50_000_000,
  filesTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  fileSizeError: 'becomeTutor.documents.fileSizeError',
  allFilesSizeError: 'becomeTutor.documents.allFilesSizeError',
  typeError: 'becomeTutor.documents.typeError',
  maxQuantityFiles: 7
}

const AddDocuments = ({
  btnsBox,
  documents,
  documentsError,
  addDocuments,
  setStepErrors,
  stepLabel
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    setStepErrors((prevState) => ({
      ...prevState,
      [stepLabel]: Boolean(documentsError)
    }))
  }, [documentsError, setStepErrors, stepLabel])

  return (
    <Box sx={styles.root}>
      <Box
        alt={t('becomeTutor.documents.imageAlt')}
        component='img'
        src={addDocumentsPNG}
        sx={styles.img}
      />

      <Box sx={styles.rigthBox}>
        <Box>
          <Typography mb={5} variant='body1'>
            {t('becomeTutor.documents.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.documents.button')}
            emitter={addDocuments}
            initialError={documentsError}
            initialState={documents}
            validationData={validationData}
          />
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddDocuments
