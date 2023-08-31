import { useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
import Loader from '~/components/loader/Loader'

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

  if (!response) {
    return null
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
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.'
    },
    {
      title: 'lesson.attachments',
      content: <Box sx={styles.attachmentList}>{attachmentsList}</Box>
    }
  ]

  return (
    <PageWrapper>
      <Typography sx={styles.title}>{response.title}</Typography>
      <Typography sx={styles.description}>{response.description}</Typography>
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
