import { useEffect } from 'react'

import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/add-documents/add-documents.style'

const AddDocuments = ({ documentsError, setStepErrors, stepLabel }) => {
  useEffect(() => {
    setStepErrors((prevState) => ({
      ...prevState,
      [stepLabel]: Boolean(documentsError)
    }))
  }, [documentsError, setStepErrors, stepLabel])

  return <Box sx={styles.root}>Add documents step</Box>
}

export default AddDocuments
