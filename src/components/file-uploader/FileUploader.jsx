import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'

import useUpload from '~/hooks/use-upload'

import { styles } from '~/components/file-uploader/FileUploader.styles'

const FileUploader = ({
  buttonText,
  emitter,
  initialState = [],
  initialError = '',
  validationData
}) => {
  const { t } = useTranslation()

  const { addFiles, deleteFile } = useUpload({
    files: initialState,
    emitter: emitter,
    validationData
  })

  const filesList = initialState.map((item) => (
    <ListItem key={item.name + Date.now()} sx={styles.listItem}>
      <Typography sx={styles.fileName} variant='body2'>
        {item.name}
      </Typography>
      <IconButton
        data-testid='delete-file'
        onClick={() => deleteFile(item)}
        size='small'
      >
        <CloseIcon sx={styles.close} />
      </IconButton>
    </ListItem>
  ))

  const uploadButton = (
    <Button component='label' sx={styles.uploadBtn}>
      <CloudUploadIcon sx={styles.icon} />
      {buttonText}
      <input hidden multiple onChange={addFiles} type='file' />
    </Button>
  )

  return (
    <>
      <Box sx={styles.root}>
        {initialState.length > 0 ? (
          <List sx={{ width: '100%' }}>{filesList}</List>
        ) : (
          uploadButton
        )}
      </Box>
      <Typography sx={{ mt: '10px' }} variant={'body2'}>
        {t('constant.fileSize', { size: '10 Mb' })}
      </Typography>
      {initialError && (
        <Typography color='error' ml={1} variant='caption'>
          {t(initialError)}
        </Typography>
      )}
    </>
  )
}

export default FileUploader
