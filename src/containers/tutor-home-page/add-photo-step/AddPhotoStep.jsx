import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import { imageResize } from '~/utils/image-resize'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { useStepContext } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { validationData } from './constants'

const AddPhotoStep = ({ btnsBox, stepLabel }) => {
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()
  const [photoError, setPhotoError] = useState(null)
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const photo = stepData[stepLabel]

  const addPhoto = ({ files, error }) => {
    files.length && !files[0].src
      ? resizeImage(files[0])
      : handleStepData(stepLabel, files)

    setPhotoError(error)
  }

  const resizeImage = (photo) => {
    const originalPhotoPath = URL.createObjectURL(photo)
    const photoSizes = { newWidth: 440, newHeight: 440 }
    const photoName = photo.name
    imageResize(originalPhotoPath, photoSizes).then((resizedPhoto) => {
      handleStepData(stepLabel, [
        { src: resizedPhoto, name: photoName, type: 'image/png' }
      ])
    })
  }

  const photoPrewiew = photo.length ? (
    <Box sx={style.imgContainer}>
      <Box
        alt={t('becomeTutor.photo.imageAlt')}
        component='img'
        src={photo[0].src}
        sx={style.img}
      />
    </Box>
  ) : (
    <DragAndDrop
      emitter={addPhoto}
      initialState={photo}
      style={{
        root: style.imgContainer,
        uploadBox: style.uploadBox,
        activeDrag: style.activeDrag
      }}
      validationData={validationData}
    >
      <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
    </DragAndDrop>
  )

  return (
    <Box sx={style.root}>
      {isLaptopAndAbove && photoPrewiew}
      <Box sx={style.rigthBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={addPhoto}
            initialError={photoError}
            initialState={photo}
            validationData={validationData}
          />
        </Box>
        {(isMobile || isTablet) && photoPrewiew}
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
