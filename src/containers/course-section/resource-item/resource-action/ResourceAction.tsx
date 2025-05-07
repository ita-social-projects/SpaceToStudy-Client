import { CourseResource, ResourcesTypesEnum as ResourceType } from '~/types'
import { FC } from 'react'
import Box from '@mui/system/Box'
import { styles } from '~/containers/course-section/resource-item/ResourceItem.styles'
import DownloadButton from '~/components/download-button/DownloadButton'

interface ResourceActionProps {
  resource: CourseResource
  isView: boolean
  isStudent: boolean
  status?: string
  availabilityStatus?: JSX.Element
  actionButtons?: JSX.Element
}
const ResourceActionContainer: FC<ResourceActionProps> = ({
  resource,
  isView,
  isStudent,
  status,
  availabilityStatus,
  actionButtons
}) => {
  const isAttachmentAndViewable =
    resource.resourceType === ResourceType.Attachment && isView

  if (isStudent) {
    return (
      <Box sx={styles.resourceActions}>
        {isAttachmentAndViewable ? (
          <DownloadButton resource={resource} />
        ) : (
          status && availabilityStatus
        )}
      </Box>
    )
  }

  return (
    <Box sx={styles.resourceActions}>
      {isView ? status && availabilityStatus : actionButtons}
    </Box>
  )
}

export default ResourceActionContainer
