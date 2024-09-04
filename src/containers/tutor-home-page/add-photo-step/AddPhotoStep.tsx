import { useState, ReactNode, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import { UploadFileEmitterArgs } from '~/types'

import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'

import { imageResize } from '~/utils/image-resize'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

interface AddPhotoStepProps {
  btnsBox: ReactNode
}

const AddPhotoStep: FC<AddPhotoStepProps> = ({ btnsBox }) => {
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()
  const [photoError, setPhotoError] = useState('')
  const { t } = useTranslation()
  const { stepData, handlePhoto } = useStepContext()

  const photo = stepData.photo

  const addPhoto = async ({ files, error }: UploadFileEmitterArgs) => {
    if (files.length && !files[0].src) {
      await resizeImage(files[0])
    } else {
      handlePhoto(files)
    }

    setPhotoError(error)
  }

  const handleAddPhoto = (args: UploadFileEmitterArgs) => {
    addPhoto(args).catch((err) => {
      console.error('Error in addPhoto:', err)
    })
  }

  const resizeImage = async (photo: File) => {
    const originalPhotoPath = URL.createObjectURL(photo)

    const photoSizes = { newWidth: 440, newHeight: 440 }
    const photoName = photo.name
    const lastModified = photo.lastModified

    const resizedPhoto = await imageResize(originalPhotoPath, photoSizes)
    handlePhoto([
      {
        ...photo,
        src: resizedPhoto,
        name: photoName,
        type: 'image/png',
        lastModified
      }
    ])
  }

  const photoPreview = photo?.length ? (
    <Box sx={style.imgContainer}>
      <Box
        alt={t('becomeTutor.photo.imageAlt') as unknown as string}
        component='img'
        src={photo[0].src}
        sx={style.img}
      />
    </Box>
  ) : (
    <DragAndDrop
      emitter={handleAddPhoto}
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
            emitter={handleAddPhoto}
            initialError={photoError}
            initialState={photo}
            isImages
            sx={style.fileUploader}
            validationData={validationData}
          />
        </Box>
        {(isMobile || isTablet) && photoPreview}
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
