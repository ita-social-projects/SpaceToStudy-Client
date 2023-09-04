import { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box'

import FileUploader from '~/components/file-uploader/FileUploader'
import { validationData } from '~/containers/add-documents/AddDocuments.constants'
import { useSnackBarContext } from '~/context/snackbar-context'

import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/add-documents/AddDocuments.styles'
import { Emitter } from '~/types'

interface AddDocumentsProps {
  fetchData: (formData: FormData) => Promise<void>
  formData: FormData
  buttonText: string
}

const AddDocuments: FC<AddDocumentsProps> = ({
  fetchData,
  formData,
  buttonText
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
        initialError={documentsError}
        initialState={documents}
        sx={styles.fileUpload}
        validationData={validationData}
      />
    </Box>
  )
}

export default AddDocuments
