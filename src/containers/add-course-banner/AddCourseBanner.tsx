import { useRef, useState, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import useUpload from '~/hooks/use-upload'
import { useSnackBarContext } from '~/context/snackbar-context'

import { ComponentEnum, Emitter, InputEnum } from '~/types'
import { snackbarVariants } from '~/constants'
import { validationData } from '~/containers/add-course-banner/AddCourseBanner.constants'
import { styles } from '~/containers/add-course-banner/AddCourseBanner.styles'
import addImageIcon from '~/assets/img/tutor-my-courses/add-image-icon.svg'
import bannerBackground from '~/assets/img/tutor-my-courses/banner-pattern.png'

interface AddCourseBannerProps {
  formData: FormData
}

const AddCourseBanner: FC<AddCourseBannerProps> = ({ formData }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [banner, setBanner] = useState<Blob | null>(null)
  const { setAlert } = useSnackBarContext()
  const { t } = useTranslation()

  const handleBackgroundUpload = ({ files, error }: Emitter) => {
    const file = files[0]
    if (file) {
      const blob = new Blob([file], { type: file.type })
      setBanner(blob)
      formData.append('banner', file)
    }
    if (error) {
      setAlert({
        severity: snackbarVariants.error,
        message: error
      })
    }
  }

  const bannerUrl = banner ? URL.createObjectURL(banner) : bannerBackground

  const { addFiles } = useUpload({
    files: [],
    emitter: handleBackgroundUpload,
    validationData
  })

  const handleContainerClick = () => inputRef.current?.click()

  return (
    <>
      <Box onClick={handleContainerClick} sx={styles.container(bannerUrl)}>
        <Box sx={styles.titleWithIcon}>
          <Box
            alt={`${t('myCoursesPage.newCourse.addIconAlt')}`}
            component={`${ComponentEnum.Img}`}
            src={addImageIcon}
          />
          <Typography sx={styles.description}>
            {t('myCoursesPage.newCourse.bannerTitle')}
          </Typography>
        </Box>
      </Box>
      <input
        data-testid='file-input'
        hidden
        onChange={addFiles}
        ref={inputRef}
        type={InputEnum.File}
      />
    </>
  )
}

export default AddCourseBanner
