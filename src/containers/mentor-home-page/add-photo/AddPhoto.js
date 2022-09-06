import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'

import { style } from '~/containers/mentor-home-page/add-photo/AddPhoto.style'
import { filesize } from './constants'

const validationData = {
  maxFileSize: filesize['10MB'],
  filesTypes: ['image/jpeg', 'image/png'],
  fileSizeError: 'becomeTutor.photo.fileSizeError',
  typeError: 'becomeTutor.photo.typeError',
  maxQuantityFiles: 1
}

const AddPhoto = ({ btnsBox, photo, photoError, addPhoto, setStepErrors, stepLabel, photoForUpload }) => {
  const { t } = useTranslation()

  useEffect(() => {
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: Boolean(photoError) }))
  }, [photoError, setStepErrors, stepLabel])

  const photoPrewiew = photoForUpload ? (
    <Box sx={ style.imgContainer }>
      <Box
        alt={ t('becomeTutor.photo.imageAlt') } component='img' src={ photoForUpload }
        sx={ style.img }
      />
    </Box>
  ) : (
    <Box sx={ style.preview }>
      <Typography>
        { t('becomeTutor.photo.placeholder') }
      </Typography>
    </Box>
  )

  return (
    <Box sx={ style.root }>
      { photoPrewiew }
      <Box sx={ style.rigthBox }>
        <Box>
          <Typography sx={ style.description }>
            { t('becomeTutor.photo.description') }
          </Typography>
          <FileUploader
            buttonText={ t('becomeTutor.photo.button') }
            emitter={ addPhoto }
            initialError={ photoError }
            initialState={ photo }
            validationData={ validationData }
          />
        </Box>

        { btnsBox }
      </Box>
    </Box>
  )
}

export default AddPhoto
