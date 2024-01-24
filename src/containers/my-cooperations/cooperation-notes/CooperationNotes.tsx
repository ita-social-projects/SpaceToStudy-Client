import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

import useAxios from '~/hooks/use-axios'
import { useSnackBarContext } from '~/context/snackbar-context'
import { CooperationNotesService } from '~/services/cooperation-service'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'

import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/my-cooperations/cooperation-notes/CooperationNotes.styles'
import { CreateNoteParams, PositionEnum, ErrorResponse } from '~/types'

const CooperationNotes = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const [addNote, setAddNote] = useState<boolean>(false)

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.message}` : ''
      })
    },
    [setAlert]
  )

  const onResponse = useCallback(() => {
    setAlert({
      severity: snackbarVariants.success,
      message: t('cooperationsPage.notes.noteMsg')
    })
  }, [setAlert, t])

  const createNoteService = useCallback(
    (data?: CreateNoteParams) => CooperationNotesService.createNote(data),
    []
  )

  const onNoteCreate = useCallback(() => {
    onResponse(), setAddNote(false)
  }, [onResponse])

  const { fetchData: addNewNote } = useAxios({
    service: createNoteService,
    defaultResponse: null,
    fetchOnMount: false,
    onResponseError,
    onResponse: onNoteCreate
  })

  const onAddNoteOpen = () => {
    setAddNote(true)
  }

  return (
    <Box sx={styles.notesWrapper}>
      <Divider orientation={PositionEnum.Vertical} sx={styles.divider} />
      <Box>
        <Box sx={styles.notesIcon}>
          <Typography>{t('cooperationsPage.details.notes')}</Typography>
          <AddIcon onClick={onAddNoteOpen} />
        </Box>
        {addNote && <CreateOrEditNote addNewNote={addNewNote} />}
      </Box>
    </Box>
  )
}

export default CooperationNotes
