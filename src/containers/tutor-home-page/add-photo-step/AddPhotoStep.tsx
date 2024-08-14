import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'

import { imageResize } from '~/utils/image-resize'
import { validationData } from './constants'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

interface AddPhotoStepProps {
  buttonsBox: React.ReactNode
}

const AddPhotoStep: React.FC<AddPhotoStepProps> = ({ buttonsBox }) => {
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()
  const [photoError, setPhotoError] = useState('')
  const { t } = useTranslation()
  const { stepData, handlePhoto } = useStepContext()
  const photo: File[] = stepData.photo as unknown as File[]

  const addPhoto = ({ files, error }: { files: File[]; error: string }) => {
    if (files.length > 0 && files[0] instanceof File) {
      resizeImage(files[0]).catch((err) => {
        console.error('Error in addPhoto:', err)
      })
    }
    setPhotoError(error)
  }

  const resizeImage = async (photo: File): Promise<void> => {
    const originalPhotoPath = URL.createObjectURL(photo)
    const photoSizes = { newWidth: 440, newHeight: 440 }
    const photoName = photo.name
    const lastModified = photo.lastModified

    try {
      const resizedPhotoBlob = await imageResize(originalPhotoPath, photoSizes)
      const resizedPhotoFile = new File([resizedPhotoBlob], photoName, {
        type: 'image/png',
        lastModified
      })
      handlePhoto([resizedPhotoFile] as unknown as string[])
    } catch (error) {
      console.error('Error resizing image:', error)
    }
  }

  const photoPreview =
    photo.length && photo[0] instanceof File ? (
      <Box sx={style.imgContainer}>
        <Box
          alt={t('becomeTutor.photo.imageAlt') as unknown as string}
          component='img'
          src={URL.createObjectURL(photo[0])}
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
      {isLaptopAndAbove && photoPreview}
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
            isImages
            sx={style.fileUploader}
            validationData={validationData}
          />
        </Box>
        {(isMobile || isTablet) && photoPreview}
        {buttonsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
