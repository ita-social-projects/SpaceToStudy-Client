import { FC, ReactElement } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { resourcesData } from '~/containers/course-section/CourseSectionContainer.constants'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'
import { ResourcesTabsEnum as ResourcesTypes, CourseResources } from '~/types'

interface ResourceItemProps {
  resource: CourseResources
  deleteResource: (resource: CourseResources) => void
}
const ResourceItem: FC<ResourceItemProps> = ({ resource, deleteResource }) => {
  const onDeleteResource = () => {
    deleteResource(resource)
  }

  const setResourceIcon = (): ReactElement | undefined => {
    if (resource.resourceType === ResourcesTypes.Lessons) {
      return resourcesData.lessons.icon
    } else if (resource.resourceType === ResourcesTypes.Quizzes) {
      return resourcesData.quizzes.icon
    }
    return
  }

  return (
    <Box sx={styles.container}>
      <IconExtensionWithTitle
        description={resource.description ?? ''}
        icon={setResourceIcon()}
        title={'title' in resource ? resource.title : resource.fileName}
      />
      <IconButton onClick={onDeleteResource}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export default ResourceItem
