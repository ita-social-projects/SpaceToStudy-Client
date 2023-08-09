import { FC, ReactElement, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import FileUploader from '~/components/file-uploader/FileUploader'
import { useSnackBarContext } from '~/context/snackbar-context'

import { validationData } from '~/containers/add-documents/AddDocuments.constants'
import { styles } from '~/containers/add-documents/AddDocuments.styles'
import { snackbarVariants } from '~/constants'
import { ButtonVariantEnum, Emitter } from '~/types'
import { spliceSx } from '~/utils/helper-functions'

interface AddDocumentsProps {
  fetchData: (formData: FormData) => Promise<void>
  formData: FormData
  buttonText: string
  variant?: ButtonVariantEnum
  sx?: {
    root?: SxProps
    button?: SxProps
  }
  icon?: ReactElement
}

const AddDocuments: FC<AddDocumentsProps> = ({
  fetchData,
  formData,
  buttonText,
  variant,
  sx = {},
  icon
}) => {
  const [documents, setDocuments] = useState<File[]>([])
  const [documentsError, setDocumentsError] = useState<string>('')
  const { setAlert } = useSnackBarContext()

  useEffect(() => {
    if (documentsError) {
      setAlert({
        severity: snackbarVariants.error,
        message: documentsError
      })
      setDocumentsError('')
    }
  }, [documentsError, setAlert])

  const addDocuments = ({ files, error }: Emitter) => {
    setDocuments(files)
    setDocumentsError(error)

    for (const file of files) {
      formData.append('files', file)
    }

    !error && void fetchData(formData)
  }

  return (
    <Box sx={styles.root}>
      <FileUploader
        buttonText={buttonText}
        emitter={addDocuments}
        icon={icon}
        initialError={documentsError}
        initialState={documents}
        sx={{
          root: spliceSx(styles.fileUpload.root, sx?.root),
          button: spliceSx(styles.fileUpload.button, sx?.button)
        }}
        validationData={validationData}
        variant={variant}
      />
    </Box>
  )
}

export default AddDocuments
