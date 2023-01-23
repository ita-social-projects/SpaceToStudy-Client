import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import { imageResize } from '~/utils/image-resize'

import { style } from '~/containers/tutor-home-page/add-photo/AddPhoto.style'
import { useStepContext } from '~/context/step-context'
import { validationData } from './constants'

const AddPhoto = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { stepData, stepErrors, handleStepData, handleStepErrors } = useStepContext()
  const photo = stepData[stepLabel]
  const photoErrors = stepErrors[stepLabel]
  console.log('photo')
  const addPhoto = ({ files, error }) => {
    files.length && !files[0].src ? resizeImage(files[0]) : handleStepData(stepLabel, files)

    handleStepErrors(stepLabel, { error })
  }

  const resizeImage = (photo) => {
    const originalPhotoPath = URL.createObjectURL(photo)
    const photoSizes = { newWidth: 580, newHeight: 580 }
    const photoName = photo.name
    imageResize(originalPhotoPath, photoSizes).then((resizedPhoto) => {
      handleStepData(stepLabel, [{ src: resizedPhoto, name: photoName, type: 'image/png' }])
    })
  }

  const photoPrewiew = photo.length ? (
    <Box
      alt={ t('becomeTutor.photo.imageAlt') } component='img' src={ photo[0].src }
      sx={ style.img }
    />
  ) : (
    <Box sx={ style.preview }>
      <Typography>
        { t('becomeTutor.photo.placeholder') }
      </Typography>
    </Box>
  )

  return (
    <Box sx={ style.root }>
      <Box sx={ style.imgContainer }>
        { photoPrewiew }
      </Box>
      <Box sx={ style.rigthBox }>
        <Box>
          <Typography sx={ style.description }>
            { t('becomeTutor.photo.description') }
          </Typography>
          <FileUploader
            buttonText={ t('becomeTutor.photo.button') }
            emitter={ addPhoto }
            initialError={ photoErrors.error }
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
