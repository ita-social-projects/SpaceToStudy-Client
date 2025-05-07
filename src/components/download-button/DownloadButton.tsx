import DownloadIcon from '~/assets/img/download-attachments/download-symbol.svg'
import Downloading from '~/assets/img/download-attachments/downloading.svg'
import { styles } from '~/components/download-button/DownloadButton.styles'
import { status } from '~/components/download-button/DownloadButton.constants'
import { FC, useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import { t } from 'i18next'
import {
  Attachment,
  CourseResource,
  ResourcesTypesEnum as ResourceType
} from '~/types'
import { downloadFile } from '~/utils/download-file'
import { ResourceService } from '~/services/resource-service'

interface DownLoadButtonProps {
  resource: CourseResource
}

const DownloadButton: FC<DownLoadButtonProps> = ({ resource }) => {
  const [loading, setLoading] = useState(false)
  const buttonStatus: string = loading ? status.action : status.inaction
  const imgSrc = loading ? Downloading : DownloadIcon

  const handleDownloadAttachment = useCallback(async () => {
    if (resource.resourceType !== ResourceType.Attachment) return

    const fileName = (resource as Attachment).fileName
    setLoading(true)
    await downloadFile(
      ResourceService.downloadAttachment(resource._id),
      fileName
    )
    setLoading(false)
  }, [resource])

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        void handleDownloadAttachment()
      }}
      sx={styles.downloadIcon(loading)}
    >
      {t(`button.${buttonStatus}`)}
      <img alt='Download icon' src={imgSrc} style={styles.iconImage} />
    </Button>
  )
}

export default DownloadButton
