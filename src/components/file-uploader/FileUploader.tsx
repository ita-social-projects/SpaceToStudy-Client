import { FC, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import { SxProps } from '@mui/material'

import useUpload from '~/hooks/use-upload'

import { styles } from '~/components/file-uploader/FileUploader.styles'
import {
  AddDocuments,
  ButtonVariantEnum,
  ComponentEnum,
  Emitter,
  InputEnum,
  SizeEnum
} from '~/types'

interface FileUploaderProps {
  buttonText: string
  emitter: ({ files, error }: Emitter) => void
  initialState: File[]
  initialError: string
  validationData: AddDocuments
  isImages?: boolean
  sx?: {
    root?: SxProps
    button?: SxProps
  }
  variant?: ButtonVariantEnum
  icon?: ReactElement
}

const FileUploader: FC<FileUploaderProps> = ({
  buttonText,
  emitter,
  initialState = [],
  initialError = '',
  validationData,
  isImages = false,
  sx = {},
  variant,
  icon
}) => {
  const { t } = useTranslation()

  const { addFiles, deleteFile } = useUpload({
    files: initialState,
    emitter: emitter,
    validationData
  })

  const filesList = initialState.map((item: File) => (
    <ListItem key={`${item.name}-${item.lastModified}`} sx={styles.listItem}>
      <Typography sx={styles.fileName}>{item.name}</Typography>
      <IconButton
        data-testid='delete-file'
        onClick={() => deleteFile(item)}
        size={SizeEnum.Small}
      >
        <CloseIcon sx={styles.close} />
      </IconButton>
    </ListItem>
  ))

  const uploadButton = (
    <Button component={ComponentEnum.Label} sx={sx.button} variant={variant}>
      {isImages && <CloudUploadIcon sx={styles.icon} />}
      {buttonText}
      {icon}
      <input hidden multiple onChange={addFiles} type={InputEnum.File} />
    </Button>
  )

  return (
    <>
      <Box sx={sx.root}>
        {initialState.length && isImages ? (
          <List sx={styles.filesList}>{filesList}</List>
        ) : (
          uploadButton
        )}
      </Box>
      {isImages && (
        <>
          <Typography sx={styles.fileSize}>
            {`${t('errorMessages.fileSize', { size: '10' })} ${t(
              'common.megabytes'
            )}`}
          </Typography>
          {initialError && (
            <Typography sx={styles.error}>{t(initialError)}</Typography>
          )}
        </>
      )}
    </>
  )
}

export default FileUploader
