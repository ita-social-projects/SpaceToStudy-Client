import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import DOMPurify from 'dompurify'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useQuery from '~/hooks/use-query'
import { ResourceService } from '~/services/resource-service'
import { defaultResponse } from '~/pages/lesson-details/LessonDetails.constants'
import Accordions from '~/components/accordion/Accordions'
import useAccordion from '~/hooks/use-accordions'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import Button from '~scss-components/button/Button'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import ChangeResourceConfirmModal from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal'
import { cooperationService } from '~/services/cooperation-service'
import useMutation from '~/hooks/use-mutation'
import { openAlert } from '~/redux/features/snackbarSlice'

import { errorRoutes } from '~/router/constants/errorRoutes'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/lesson-details/LessonsDetails.styles'
import {
  CompletionStatusEnum,
  TypographyVariantEnum,
  UserRoleEnum
} from '~/types'
import { ResponseError } from '~/exceptions'
import { snackbarVariants } from '~/constants'
import { getErrorKey } from '~/utils/get-error-key'
import { getFullUrl } from '~/utils/get-full-url'

const LessonDetails: React.FC = () => {
  const [completionStatus, setCompletionStatus] = useState<
    CompletionStatusEnum | undefined
  >(CompletionStatusEnum.Completed)
  const { id = '', lessonId = '' } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { userRole, userId } = useAppSelector((state) => state.appMain)
  const { openModal } = useModalContext()
  const [expandedItems, handleAccordionChange] = useAccordion({
    initialState: 0,
    multiple: true
  })
  const isStudent = userRole === UserRoleEnum.Student
  const dispatch = useAppDispatch()

  const responseError = useCallback(
    () => navigate(errorRoutes.notFound.path),
    [navigate]
  )

  const getLesson = useCallback(() => {
    if (lessonId) {
      return ResourceService.getLesson(lessonId)
    }

    return defaultResponse
  }, [lessonId])

  const { isError, data } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: getLesson,
    options: {
      initialData: defaultResponse
    }
  })

  useEffect(() => {
    if (isError) {
      responseError()
    }
  }, [isError, responseError])

  const handleEditLesson = () => {
    openModal({
      component: (
        <ChangeResourceConfirmModal
          onConfirm={() =>
            navigate(
              getFullUrl({
                pathname: authRoutes.myResources.editLesson.route,
                parameters: {
                  id: lessonId
                }
              })
            )
          }
          resourceId={lessonId}
          title={data.title}
        />
      )
    })
  }

  const getCooperation = useCallback(() => {
    return cooperationService.getCooperationById(id)
  }, [id])

  const { data: cooperation } = useQuery({
    queryFn: getCooperation,
    queryKey: ['cooperation', id]
  })

  useEffect(() => {
    if (!cooperation?.sections) return

    cooperation.sections?.forEach((section) => {
      const resource = section.resources?.find(
        (resource) => resource.resource._id === lessonId
      )

      if (resource) {
        setCompletionStatus(resource.completionStatus)
      }
    })
  }, [cooperation, lessonId, setCompletionStatus])

  const handleResponseError = useCallback(
    (error: ResponseError) => {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    },
    [dispatch]
  )

  const handleResponse = () => {
    setCompletionStatus(CompletionStatusEnum.Completed)
  }

  const { mutate: updateLessonStatus } = useMutation({
    mutationFn: cooperationService.updateResourceCompletionStatus,
    onSuccess: handleResponse,
    onError: handleResponseError
  })

  const handleUpdateLessonStatus = useCallback(() => {
    updateLessonStatus({
      id,
      resourceId: lessonId,
      completionStatus:
        completionStatus === CompletionStatusEnum.Active
          ? CompletionStatusEnum.Completed
          : completionStatus
    })
  }, [id, lessonId, completionStatus, updateLessonStatus])

  const attachmentsList = data.attachments?.map((attachment) => (
    <Box key={attachment.size} sx={styles.attachment}>
      <IconExtensionWithTitle
        size={attachment.size}
        title={attachment.fileName}
      />
    </Box>
  ))

  const items = [
    {
      title: 'lesson.content',
      content: (
        <Box
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.content)
          }}
          sx={styles.content}
        />
      )
    },
    ...(data.attachments?.length
      ? [
          {
            title: 'lesson.attachments',
            content: <Box sx={styles.attachmentList}>{attachmentsList}</Box>
          }
        ]
      : [])
  ]

  const isEditable = userId === data.author

  return (
    <PageWrapper>
      {isEditable && (
        <Button
          endIcon={<EditIcon sx={styles.editIcon} />}
          onClick={handleEditLesson}
          sx={styles.button}
        >
          {t('common.edit')}
        </Button>
      )}
      <Box sx={styles.lessonWrapper}>
        <TitleWithDescription
          description={data.description}
          style={styles.titleWithDescription}
          title={data.title}
        />
        <Accordions
          activeIndex={expandedItems}
          descriptionVariant={TypographyVariantEnum.Body2}
          icon={<ExpandMoreIcon />}
          items={items}
          multiple
          onChange={handleAccordionChange}
          sx={styles.accordion}
          titleVariant={TypographyVariantEnum.Subtitle2}
        />
        {isStudent && (
          <Button
            disabled={completionStatus === CompletionStatusEnum.Completed}
            onClick={handleUpdateLessonStatus}
            sx={[styles.button, styles.bottomButton]}
          >
            {t('cooperationDetailsPage.markAsProcessedBtn')}
          </Button>
        )}
      </Box>
    </PageWrapper>
  )
}

export default LessonDetails
