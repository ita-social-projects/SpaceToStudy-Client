import { FC, useEffect, useState } from 'react'

import Box from '@mui/material/Box'

import FileUploader from '~/components/file-uploader/FileUploader'
import { styles } from '~/containers/add-documents/AddDocuments.styles'
import { validationData } from '~/containers/add-documents/AddDocuments.constants'
import { useSnackBarContext } from '~/context/snackbar-context'

import { snackbarVariants } from '~/constants'

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
  const [documents, setDocuments] = useState<File[] | []>([])
  const [documentsError, setDocumentsError] = useState<string>('')
  const { setAlert } = useSnackBarContext()

  useEffect(() => {
    if (documentsError !== '') {
      setAlert({
        severity: snackbarVariants.error,
        message: documentsError
      })
      setDocumentsError('')
    }
  }, [documentsError, setAlert])

  const addDocuments = ({ files, error }: { files: File[]; error: string }) => {
    setDocuments(files)
    setDocumentsError(error)

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    void fetchData(formData)
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
