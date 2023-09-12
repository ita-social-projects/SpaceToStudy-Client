import { useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Loader from '~/components/loader/Loader'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import {
  attachmentsMock,
  defaultResponse
} from '~/pages/lesson-details/LessonDetails.constants'
import Accordions from '~/components/accordion/Accordions'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { errorRoutes } from '~/router/constants/errorRoutes'
import { styles } from '~/pages/lesson-details/LessonsDetails.styles'
import { Lesson, TypographyVariantEnum } from '~/types'

const LessonDetails = () => {
  const [activeItems, setActiveItems] = useState<number[]>([])

  const { id } = useParams()
  const navigate = useNavigate()

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
    return ResourceService.getLesson(id)
  }, [id])

  const { loading, response } = useAxios<Lesson, string>({
    service: getLesson,
    defaultResponse,
    onResponseError: responseError
  })

  if (loading) {
    return <Loader pageLoad />
  }

  const attachmentsList = attachmentsMock.map((attachment) => (
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
      content: <div dangerouslySetInnerHTML={{ __html: response.content }} />
    },
    {
      title: 'lesson.attachments',
      content: <Box sx={styles.attachmentList}>{attachmentsList}</Box>
    }
  ]

  return (
    <PageWrapper>
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
    </PageWrapper>
  )
}

export default LessonDetails
