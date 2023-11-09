import { FC, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'

import { ResourcesTabsEnum as ResourcesTypes, CourseResources } from '~/types'

interface ResourceItemProps {
  resource: CourseResources
  setItemToDelete: Dispatch<SetStateAction<CourseResources | null>>
}
const ResourceItem: FC<ResourceItemProps> = ({ resource, setItemToDelete }) => {
  const onDeleteResource = () => {
    setItemToDelete(resource)
  }

  const setResourceIcon = () => {
    if (resource.resourceType === ResourcesTypes.Lessons) {
      return ListAltIcon
    } else if (resource.resourceType === ResourcesTypes.Quizzes) {
      return NoteAltOutlinedIcon
    } else {
      return
    }
  }
  const resourceIcon = setResourceIcon()

  return (
    <Box sx={styles.container}>
      <IconExtensionWithTitle
        description={'description' in resource ? resource.description : ''}
        icon={resourceIcon}
        title={'title' in resource ? resource.title : resource.fileName}
      />
      <IconButton onClick={onDeleteResource}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export default ResourceItem
