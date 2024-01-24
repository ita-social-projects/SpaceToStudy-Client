import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

import useAxios from '~/hooks/use-axios'
import { useSnackBarContext } from '~/context/snackbar-context'
import { CooperationNotesService } from '~/services/cooperation-service'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'
import NoteView from '~/containers/my-cooperations/cooperation-notes/note-view/NoteView'
import Loader from '~/components/loader/Loader'

import { snackbarVariants, defaultResponses } from '~/constants'
import { styles } from '~/containers/my-cooperations/cooperation-notes/CooperationNotes.styles'
import {
  CreateNoteParams,
  PositionEnum,
  ErrorResponse,
  NoteResponse
} from '~/types'

const CooperationNotes = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { setAlert } = useSnackBarContext()

  const [open, setOpen] = useState(false)

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

  const getNotes = useCallback(() => CooperationNotesService.getNotes(id), [id])

  const createNoteService = useCallback(
    (data?: CreateNoteParams) => CooperationNotesService.createNote(data, id),
    [id]
  )

  const {
    response: notes,
    loading,
    fetchData
  } = useAxios<NoteResponse[]>({
    service: getNotes,
    defaultResponse: defaultResponses.array,
    onResponseError
  })

  const onNoteCreate = useCallback(() => {
    onResponse()
    setOpen(false)
    void fetchData()
  }, [onResponse, fetchData])

  const { fetchData: addNewNote } = useAxios({
    service: createNoteService,
    defaultResponse: null,
    fetchOnMount: false,
    onResponseError,
    onResponse: onNoteCreate
  })

  const onCloseNote = () => {
    setOpen(false)
  }

  const onAddNoteOpen = () => {
    setOpen(true)
  }

  const NotesList = notes.map((item: NoteResponse) => (
    <NoteView key={item._id} note={item} />
  ))

  return (
    <Box sx={styles.notesWrapper}>
      <Divider orientation={PositionEnum.Vertical} sx={styles.divider} />
      <Box>
        <Box sx={styles.notesIcon}>
          <Typography>{t('cooperationsPage.details.notes')}</Typography>
          <AddIcon onClick={onAddNoteOpen} />
        </Box>
        {open && (
          <CreateOrEditNote addNewNote={addNewNote} onCloseNote={onCloseNote} />
        )}
        {loading ? <Loader pageLoad /> : NotesList}
      </Box>
    </Box>
  )
}

export default CooperationNotes
