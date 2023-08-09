import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'

import { ButtonVariantEnum, File } from '~/types'
import { getFormattedDate, spliceSx } from '~/utils/helper-functions'
import { openInNewTab } from '~/components/file-component/FileComponent.constants'
import { styles } from '~/components/file-component/FileComponent.styles'

interface FileComponentProps {
  file: File
}

const FileComponent: FC<FileComponentProps> = ({ file }) => {
  const { t } = useTranslation()

  const fileFormat = file.name.split('.')[1]

  const formattedDate = getFormattedDate({
    date: file.createdAt,
    options: {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  })

  return (
    <Box sx={styles.fileWrapper}>
      <AppButton
        onClick={() => openInNewTab(file)}
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
              {file.size} {t(`chatPage.sidebar.megabytes`)}
            </Typography>
            <Typography>{formattedDate}</Typography>
          </Box>
        </Box>
      </AppButton>
    </Box>
  )
}

export default FileComponent
