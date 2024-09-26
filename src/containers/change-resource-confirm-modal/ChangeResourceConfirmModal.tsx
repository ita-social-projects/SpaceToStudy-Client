import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import AppButton from '~/components/app-button/AppButton'

import {
  ButtonVariantEnum,
  Course,
  GetCoursesParams,
  ItemsWithCount,
  SizeEnum
} from '~/types'
import { styles } from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal.styles'
import { useModalContext } from '~/context/modal-context'
import Loader from '~/components/loader/Loader'
import useAxios from '~/hooks/use-axios'
import { CourseService } from '~/services/course-service'
import { useMemo } from 'react'

interface ChangeResourceConfirmModalProps {
  resourceId?: string
  title?: string
  onConfirm?: () => void
}

const ChangeResourceConfirmModal = ({
  resourceId,
  title,
  onConfirm
}: ChangeResourceConfirmModalProps) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  //! replace when new endpoint is ready
  const { response: coursesResponse, loading } = useAxios<
    ItemsWithCount<Course>,
    GetCoursesParams
  >({
    service: CourseService.getCourses,
    defaultResponse: { items: [], count: 0 },
    fetchOnMount: true
  })

  const courseList = useMemo(
    () =>
      coursesResponse.items
        .filter((item) => item.sections[0].resources?.length)
        .filter((item) =>
          item.sections.some((res) =>
            res.resources.some((val) => val.resource._id == resourceId)
          )
        )
        .map((item) => ({
          id: item._id,
          title: item.title,
          subTitle: 'course'
        })),
    [coursesResponse.items, resourceId]
  )
  ////////////////////////////////////!

  const handleConfirm = () => {
    onConfirm?.()
    closeModal()
  }

  if (loading) {
    return (
      <Box sx={styles.root}>
        <Loader />
      </Box>
    )
  }

  if (!loading && !courseList?.length) {
    handleConfirm()
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
        {courseList.map((el) => (
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
