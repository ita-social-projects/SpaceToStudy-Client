import DownloadIcon from '~/assets/img/download-attachments/download-symbol.svg'
import Downloading from '~/assets/img/download-attachments/downloading.svg'
import { styles } from '~/components/download-button/DownloadButton.styles'
import { FC, useState } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { t } from 'i18next'

interface DownLoadButtonProps extends Omit<ButtonProps, 'size'> {
  onDownload: () => Promise<void>
}

const DownloadButton: FC<DownLoadButtonProps> = ({ onDownload }) => {
  const [loading, setLoading] = useState(false)
  const buttonStatus = loading ? 'downloading' : 'download'
  const imgSrc = loading ? Downloading : DownloadIcon

  const handleClick = async () => {
    setLoading(true)
    try {
      await onDownload()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      aria-label='download'
      onClick={(e) => {
        e.stopPropagation()
        void handleClick()
      }}
      sx={styles.downloadIcon(loading)}
    >
      {t(`button.${buttonStatus}`)}
      <img alt='Download icon' src={imgSrc} />
    </Button>
  )
}

export default DownloadButton
