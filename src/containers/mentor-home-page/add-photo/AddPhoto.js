import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import { imageResize } from '~/utils/image-resize'

import { style } from '~/containers/mentor-home-page/add-photo/AddPhoto.style'
import { validationData } from './constants'

const AddPhoto = ({ btnsBox, handleErrors, errors, handleStepErrors, stepLabel, data, handleAddFiles }) => {
  const { t } = useTranslation()

  const addPhoto = ({ files, error }) => {
    if (files?.length && !files[0]?.src) {
      const originalPhotoPath = URL.createObjectURL(files[0])
      const photoSizes = { newWidth: 580, newHeight: 580 }
      const photoName = files[0].name
      imageResize(originalPhotoPath, photoSizes).then((resizedPhoto) => {
        handleAddFiles('photo', [{ src: resizedPhoto, name: photoName, type: 'image/png' }])
      })
    }
    if (files && !files.length) {
      handleAddFiles('photo', [])
    }
    handleErrors('photo', error)
    handleStepErrors(stepLabel, error)
  }

  const photoPrewiew = data.photo.length ? (
    <Box sx={ style.imgContainer }>
      <Box
        alt={ t('becomeTutor.photo.imageAlt') } component='img' src={ data.photo[0].src }
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
            initialError={ errors.photo }
            initialState={ data.photo }
            validationData={ validationData }
          />
        </Box>

        { btnsBox }
      </Box>
    </Box>
  )
}

export default AddPhoto
