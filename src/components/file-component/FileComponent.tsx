import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'

import { ButtonVariantEnum, File } from '~/types'
import { getFormatedDate, spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/file-component/FileComponent.styles'

interface FileComponentProps {
  file: File
}

const openFile = (file: File) => {
  window.open(file.url, '_blank', 'noopener noreferrer')
}

const formatDate = (date: Date) => {
  return getFormatedDate({
    date,
    options: {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    },
    includeOrdinal: true
  })
}

const FileComponent: FC<FileComponentProps> = ({ file }) => {
  const { t } = useTranslation()

  const fileFormat = file.name.split('.')[1]

  return (
    <Box sx={styles.fileWrapper}>
      <AppButton
        onClick={() => openFile(file)}
        sx={styles.file}
        variant={ButtonVariantEnum.Text}
      >
        <Box sx={styles.formatFrame}>
          <Typography>{fileFormat}</Typography>
        </Box>
        <Box sx={styles.fileInfo}>
          <Typography sx={spliceSx(styles.secondaryText, styles.fileName)}>
            {file.name}
          </Typography>
          <Box sx={styles.fileDescription}>
            <Typography sx={styles.divider}>
              {file.size} {t(`chat.sidebar.megabytes`)}
            </Typography>
            <Typography>{formatDate(file.uploadedDate)}</Typography>
          </Box>
        </Box>
      </AppButton>
    </Box>
  )
}

export default FileComponent
