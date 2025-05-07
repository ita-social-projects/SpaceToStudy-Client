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
import { cooperationService } from '~/services/cooperation-service'
import useMutation from '~/hooks/use-mutation'
import {
  CompletionStatusEnum,
  ResourcesTypesEnum as ResourceType,
  TypographyVariantEnum,
  UserRoleEnum
} from '~/types'
import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import ChangeResourceConfirmModal from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal'
import ResourceActionContainer from '~/containers/course-section/resource-item/ResourceAction/ResourceAction'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/lesson-details/LessonsDetails.styles'
import { getFullUrl } from '~/utils/get-full-url'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

const LessonDetails: React.FC = () => {
  const [completionStatus, setCompletionStatus] =
    useState<CompletionStatusEnum>(CompletionStatusEnum.Completed)
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
  const { handleErrorAlert } = useSnackbarAlert()

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
    queryKey: ['cooperation', id],
    options: {
      staleTime: Infinity
    }
  })

  useEffect(() => {
    if (!cooperation?.sections) {
      return
    }

    cooperation.sections.forEach((section) => {
      const resource = section.resources?.find(
        (resource) => resource.resource._id === lessonId
      )

      if (resource) {
        setCompletionStatus(
          resource.completionStatus ?? CompletionStatusEnum.Completed
        )
      }
    })
  }, [cooperation, lessonId, setCompletionStatus])

  const { mutate: updateLessonStatus } = useMutation({
    mutationFn: cooperationService.updateResourceCompletionStatus,
    queryKeys: [
      ['lesson', lessonId],
      ['cooperation', id]
    ],
    onError: handleErrorAlert
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
      {attachment.resourceType === ResourceType.Attachment && (
        <ResourceActionContainer
          isStudent={isStudent}
          isView
          resource={attachment}
        />
      )}
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
            content: <Box sx={styles.attachmentList}>{attachmentsList} </Box>
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
