import { useCallback, useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal.styles'
import { useModalContext } from '~/context/modal-context'
import Loader from '~/components/loader/Loader'
import useAxios from '~/hooks/use-axios'
import { CoursesAndCooperationsService } from '~/services/course-cooperation-service'
import { ButtonVariantEnum, CourseCooperationResponse, SizeEnum } from '~/types'

interface ChangeResourceConfirmModalProps {
  resourceId?: string
  title?: string
  onConfirm?: () => void
}

const ChangeResourceConfirmModal = ({
  resourceId = '',
  title,
  onConfirm
}: ChangeResourceConfirmModalProps) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const getCoursesAndCooperationsByResourceId = useCallback(
    () => CoursesAndCooperationsService.getByResourceId(resourceId),
    [resourceId]
  )

  const { response, loading } = useAxios({
    service: getCoursesAndCooperationsByResourceId,
    defaultResponse: {
      courses: [],
      cooperations: []
    } as CourseCooperationResponse,
    fetchOnMount: true
  })

  const courses = response.courses.map((course) => ({
    id: course._id,
    title: course.title,
    subTitle: 'course'
  }))

  const cooperations = response?.cooperations.map((cooperation) => ({
    id: cooperation._id,
    title: cooperation.title,
    subTitle: 'cooperation'
  }))

  const affectedItems = useMemo(
    () => [...courses, ...cooperations],
    [courses, cooperations]
  )

  const handleConfirm = useCallback(() => {
    closeModal()
    onConfirm?.()
  }, [closeModal, onConfirm])

  useEffect(() => {
    if (!loading && !affectedItems.length) {
      handleConfirm()
    }
  }, [affectedItems, handleConfirm, loading])

  if (loading) {
    return (
      <Box sx={styles.root}>
        <Loader />
      </Box>
    )
  }

  if (!loading && !affectedItems?.length) {
    return null
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.warningImageContainer}>
        <ErrorOutlineIcon data-testid='warning-icon' sx={styles.warningImage} />
      </Box>
      <Box>
        <Typography sx={styles.title}>{t('changeConfirm.title')}</Typography>
        <Typography sx={styles.resource}>
          {t('changeConfirm.descriptionResource')}
          {title ? (
            <Typography component='span' sx={styles.resourceData}>
              {' "'}
              {title}
              {'"'}
            </Typography>
          ) : null}
          {'.'}
        </Typography>
        <Typography sx={styles.description}>
          {t('changeConfirm.description')}
        </Typography>
      </Box>
      <Box sx={styles.lessonsListContainer}>
        {affectedItems.map((el) => (
          <Box key={el.id} sx={styles.listItems}>
            <Typography sx={styles.listTitles}>{el.title}</Typography>
            <Typography sx={styles.listSubtitle}>
              {t(`changeConfirm.${el.subTitle}`)}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={styles.buttonsContainer}>
        <AppButton
          onClick={closeModal}
          size={SizeEnum.Large}
          sx={styles.button}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('changeConfirm.backButton')}
        </AppButton>
        <AppButton
          onClick={handleConfirm}
          size={SizeEnum.Large}
          sx={styles.button}
          type='submit'
          variant={ButtonVariantEnum.Contained}
        >
          {t('changeConfirm.confirmButton')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default ChangeResourceConfirmModal
