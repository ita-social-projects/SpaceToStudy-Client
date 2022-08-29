import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'

import { style } from '~/containers/mentor-home-page/add-photo/add-photo.style'

const validationData = {
  maxFileSize: 10_000_000,
  filesTypes: ['image/jpeg', 'image/png'],
  fileSizeError: 'becomeTutor.photo.fileSizeError',
  typeError: 'becomeTutor.photo.typeError',
  maxQuantityFiles: 1
}

const AddPhoto = ({ btnsBox, photo, photoError, addPhoto, setStepErrors, stepLabel }) => {
  const { t } = useTranslation()
  const [photoForPreview, setPhotoForPreview] = useState('')

  useEffect(() => {
    setStepErrors((prevState) => ({ ...prevState, [stepLabel]: Boolean(photoError) }))
  }, [photoError, setStepErrors, stepLabel])

  useEffect(() => {
    if (photo.length) {
      const src = URL.createObjectURL(photo[0])
      setPhotoForPreview(src)
    } else {
      setPhotoForPreview('')
    }
  }, [photo])

  const photoPrewiew =
    photoError || !photoForPreview ? (
      <Box sx={ style.preview }>
        <Typography>
          { t('becomeTutor.photo.placeholder') }
        </Typography>
      </Box>
    ) : (
      <Box sx={ style.imgContainer }>
        <Box
          alt={ t('becomeTutor.photo.imageAlt') } component='img' src={ photoForPreview }
          sx={ style.img }
        />
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
