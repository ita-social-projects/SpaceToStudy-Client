import { FC } from 'react'

import { format } from 'date-fns'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'

import { ButtonVariantEnum, File } from '~/types'
import { styles } from '~/components/file-component/FileComponent.styles'

interface FileComponentProps {
  file: File
}

const formatDate = (date: Date) => {
  return format(date, `do MMMM yyyy`)
}

const FileComponent: FC<FileComponentProps> = ({ file }) => {
  return (
    <Box sx={styles.fileWrapper}>
      <AppButton
        key={file._id}
        onClick={() => {
          window.open(file.url, '_blank', 'noopener noreferrer')?.focus()
        }}
        sx={styles.file}
        variant={ButtonVariantEnum.Text}
      >
        <Box sx={styles.formatFrame}>
          <Typography>{file.name.split('.')[1]}</Typography>
        </Box>
        <Box sx={styles.fileInfo}>
          <Typography sx={styles.secondaryText}>{file.name}</Typography>
          <Box sx={styles.fileDescription}>
            <Typography>{file.size} MB</Typography>
            <Typography>{formatDate(file.uploadedDate)}</Typography>
          </Box>
        </Box>
      </AppButton>
    </Box>
  )
}

export default FileComponent
