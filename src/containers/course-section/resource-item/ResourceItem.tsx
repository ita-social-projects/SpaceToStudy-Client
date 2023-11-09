import { FC, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'

import {
  Lesson,
  Quiz,
  Attachment,
  ResourcesTabsEnum as ResourcesTypes
} from '~/types'

interface ResourceItemProps {
  resource: Lesson | Quiz | Attachment
  setItemToDelete: Dispatch<SetStateAction<Lesson | Quiz | Attachment | null>>
}
const ResourceItem: FC<ResourceItemProps> = ({ resource, setItemToDelete }) => {
  const onDeleteResource = () => {
    setItemToDelete(resource)
  }

  return (
    <Box sx={styles.container}>
      <IconExtensionWithTitle
        description={'description' in resource ? resource.description : ''}
        icon={
          resource.resourceType === ResourcesTypes.Lessons
            ? ListAltIcon
            : resource.resourceType === ResourcesTypes.Quizzes
            ? NoteAltOutlinedIcon
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
