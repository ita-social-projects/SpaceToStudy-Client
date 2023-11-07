import { FC, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import CloseIcon from '@mui/icons-material/Close'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'
import { Lesson, Quiz, Attachment } from '~/types'

interface ResourceItemProps {
  resource: Lesson | Quiz | Attachment
  setResources: Dispatch<SetStateAction<(Lesson | Quiz | Attachment)[]>>
}
const ResourceItem: FC<ResourceItemProps> = ({ resource, setResources }) => {
  const onDeleteResource = () => {
    setResources((prev) => {
      return prev.filter((item) => item._id !== resource._id)
    })
  }

  return (
    <Box sx={styles.resourcesList.container}>
      <IconButton>
        <DragIndicatorIcon />
      </IconButton>
      <IconExtensionWithTitle
        title={'title' in resource ? resource.title : resource.fileName}
      />
      <IconButton onClick={onDeleteResource}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export default ResourceItem
