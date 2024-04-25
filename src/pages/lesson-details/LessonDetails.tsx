import { useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'

import Loader from '~/components/loader/Loader'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import { defaultResponse } from '~/pages/lesson-details/LessonDetails.constants'
import Accordions from '~/components/accordion/Accordions'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import AppButton from '~/components/app-button/AppButton'

import { errorRoutes } from '~/router/constants/errorRoutes'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/lesson-details/LessonsDetails.styles'
import { Lesson, TypographyVariantEnum } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'
import { useAppSelector } from '~/hooks/use-redux'

const LessonDetails = () => {
  const [activeItems, setActiveItems] = useState<number[]>([0])

  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { userId } = useAppSelector((state) => state.appMain)

  const onChange = (activeItem: number) => {
    setActiveItems((prevActiveItems) => {
      if (prevActiveItems.includes(activeItem)) {
        return prevActiveItems.filter(
          (prevActiveItem) => prevActiveItem !== activeItem
        )
      } else {
        return [...prevActiveItems, activeItem]
      }
    })
  }

  const responseError = useCallback(
    () => navigate(errorRoutes.notFound.path),
    [navigate]
  )

  const getLesson = useCallback((): Promise<AxiosResponse> => {
    return ResourceService.getLesson(lessonId)
  }, [lessonId])

  const { loading, response } = useAxios<Lesson, string>({
    service: getLesson,
    defaultResponse,
    onResponseError: responseError
  })

  if (loading) {
    return <Loader pageLoad />
  }

  const handleEditLesson = () => {
    navigate(createUrlPath(authRoutes.myResources.editLesson.path, lessonId))
  }

  const attachmentsList = response.attachments.map((attachment) => (
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
          dangerouslySetInnerHTML={{ __html: response.content }}
          sx={styles.content}
        />
      )
    },
    {
      title: 'lesson.attachments',
      content: <Box sx={styles.attachmentList}>{attachmentsList}</Box>
    }
  ]

  const isEditable = userId === response.author

  return (
    <PageWrapper>
      {isEditable && (
        <AppButton onClick={handleEditLesson} sx={styles.button}>
          {t('common.edit')} <EditIcon sx={styles.editIcon} />
        </AppButton>
      )}
      <Box sx={styles.lessonWrapper}>
        <TitleWithDescription
          description={response.description}
          style={styles.titleWithDescription}
          title={response.title}
        />
        <Accordions
          activeIndex={activeItems}
          descriptionVariant={TypographyVariantEnum.Body2}
          icon={<ExpandMoreIcon />}
          items={items}
          multiple
          onChange={onChange}
          sx={styles.accordion}
          titleVariant={TypographyVariantEnum.Subtitle2}
        />
      </Box>
    </PageWrapper>
  )
}

export default LessonDetails
