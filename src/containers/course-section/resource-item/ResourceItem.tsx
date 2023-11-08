import { FC, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { resourcesTypes } from '~/containers/course-section/CourseSectionContainer.constants'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'
import { Lesson, Quiz, Attachment } from '~/types'

interface ResourceItemProps {
  resource: Lesson | Quiz | Attachment
  setResources: Dispatch<SetStateAction<(Lesson | Quiz | Attachment)[]>>
}
const ResourceItem: FC<ResourceItemProps> = ({ resource, setResources }) => {
  const checkElementType = (resource: Lesson | Quiz | Attachment) => {
    let elementType

    if ('size' in resource) {
      elementType = 'attachment'
    } else if ('items' in resource) {
      elementType = 'quiz'
    } else {
      elementType = 'lesson'
    }
    return elementType
  }

  const elementType = checkElementType(resource)

  const onDeleteResource = () => {
    setResources((prev) => {
      return prev.filter((item) => item._id !== resource._id)
    })
  }

  return (
    <Box sx={styles.resourcesList.container}>
      <IconExtensionWithTitle
        description={'description' in resource ? resource.description : ''}
        icon={
          elementType === 'lesson'
            ? resourcesTypes.lesson.icon
            : elementType === 'quiz'
            ? resourcesTypes.quiz.icon
            : undefined
        }
        title={'title' in resource ? resource.title : resource.fileName}
      />
      <IconButton onClick={onDeleteResource}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export default ResourceItem
