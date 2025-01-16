import { useCallback, useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal.styles'
import { useModalContext } from '~/context/modal-context'
import Loader from '~/components/loader/Loader'
import useQuery from '~/hooks/use-query'
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

  const { data, isLoading } = useQuery<CourseCooperationResponse>({
    queryKey: ['getCoursesAndCooperationsByResourceId', resourceId],
    queryFn: () => CoursesAndCooperationsService.getByResourceId(resourceId),
    options: {
      initialData: {
        courses: [],
        cooperations: []
      },
      enabled: !!resourceId
    }
  })

  const courses = data.courses.map((course) => ({
    id: course._id,
    title: course.title,
    subTitle: 'course'
  }))

  const cooperations = data?.cooperations.map((cooperation) => ({
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
    if (!isLoading && !affectedItems.length) {
      handleConfirm()
    }
  }, [affectedItems, handleConfirm, isLoading])

  if (isLoading) {
    return (
      <Box sx={styles.root}>
        <Loader />
      </Box>
    )
  }

  if (!isLoading && !affectedItems?.length) {
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
