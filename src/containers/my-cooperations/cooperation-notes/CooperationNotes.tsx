import { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

import useConfirm from '~/hooks/use-confirm'
import { CooperationNotesService } from '~/services/cooperation-service'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'
import NoteView from '~/containers/my-cooperations/cooperation-notes/note-view/NoteView'
import Loader from '~/components/loader/Loader'
import { noteNotFoundError } from '~/containers/my-cooperations/cooperation-notes/CooperationNotes.constants'

import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/my-cooperations/cooperation-notes/CooperationNotes.styles'
import {
  type CreateOrUpdateNoteParams,
  PositionEnum,
  type NoteResponse
} from '~/types'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import { noteActionMap, NoteAction } from './constant'

const CooperationNotes: React.FC = () => {
  const { t } = useTranslation()
  const { id: cooperationId = '' } = useParams()
  const { openDialog } = useConfirm()
  const [open, setOpen] = useState<boolean>(false)
  const [editableItemId, setEditableItemId] = useState<string>('')
  const { handleAlert, handleErrorAlert } = useSnackbarAlert()

  const onSuccessResponse = useCallback(
    (noteAction: NoteAction) => {
      const responseMessage = noteActionMap[noteAction]

      if (noteAction === 'create') {
        setOpen(false)
      }

      handleAlert({
        severity: snackbarVariants.success,
        message: responseMessage
      })
    },
    [handleAlert]
  )

  const getNotes = useCallback(() => {
    return CooperationNotesService.getNotes(cooperationId)
  }, [cooperationId])

  const {
    data: notes,
    isLoading: isNotesLoading,
    error: getNotesError
  } = useQuery({
    queryKey: ['notes', cooperationId],
    queryFn: getNotes,
    options: {
      staleTime: Infinity
    }
  })

  useEffect(() => {
    if (getNotesError) {
      handleErrorAlert(getNotesError)
    }
  }, [handleErrorAlert, getNotesError])

  const createNote = useCallback(
    (data: CreateOrUpdateNoteParams) => {
      return CooperationNotesService.createNote(data, cooperationId)
    },
    [cooperationId]
  )

  const { mutate: addNewNote, isPending: createLoading } = useMutation({
    mutationFn: createNote,
    queryKey: ['notes', cooperationId],
    onError: handleErrorAlert,
    onSuccess: () => onSuccessResponse('create')
  })

  const deleteSelectedNote = useCallback(
    (noteId: string) => {
      return CooperationNotesService.deleteNote(cooperationId, noteId)
    },
    [cooperationId]
  )

  const { mutate: deleteNote } = useMutation({
    mutationFn: deleteSelectedNote,
    queryKey: ['notes', cooperationId],
    onError: handleErrorAlert,
    onSuccess: () => onSuccessResponse('delete')
  })

  const onDeleteNote = (id: string) => {
    openDialog({
      message: 'cooperationsPage.modalMessages.confirmDeletionMessage',
      title: `cooperationsPage.modalMessages.confirmDeletionTitle`,
      sendConfirm: (isConfirmed: boolean) => {
        if (isConfirmed) {
          deleteNote(id)
        }
      }
    })
  }

  const updateSelectedNote = useCallback(
    (params: { noteId: string; data: CreateOrUpdateNoteParams }) => {
      return CooperationNotesService.updateNote(
        cooperationId,
        params.noteId,
        params.data
      )
    },
    [cooperationId]
  )

  const { mutate: updateNote, isPending: updateNoteLoading } = useMutation({
    mutationFn: updateSelectedNote,
    queryKey: ['notes', cooperationId],
    onError: handleErrorAlert,
    onSuccess: () => onSuccessResponse('update')
  })

  const duplicateNote = useCallback(
    (noteId: string) => {
      const note = notes?.find((item) => item._id === noteId)

      if (!note) {
        throw new Error('Note with specified ID was not found')
      }

      return CooperationNotesService.createNote(note, cooperationId)
    },
    [cooperationId, notes]
  )

  const { mutate: duplicateItem } = useMutation({
    mutationFn: duplicateNote,
    queryKey: ['notes', cooperationId],
    onSuccess: () => onSuccessResponse('duplicate'),
    onError: handleErrorAlert
  })

  const handleUpdate = (data: CreateOrUpdateNoteParams) => {
    updateNote({ noteId: editableItemId, data })
    onCloseEdit()
  }

  const onCloseEdit = () => setEditableItemId('')
  const onCloseNote = () => setOpen(false)
  const onAddNoteOpen = () => setOpen(true)

  const notesList = notes?.map((item: NoteResponse) =>
    editableItemId === item._id ? (
      <CreateOrEditNote
        key={item._id}
        note={item}
        onCloseNote={onCloseEdit}
        onSubmit={handleUpdate}
        onSubmitLoading={updateNoteLoading}
      />
    ) : (
      <NoteView
        deleteItem={onDeleteNote}
        duplicateItem={duplicateItem}
        key={item._id}
        note={item}
        updateItem={setEditableItemId}
      />
    )
  )

  return (
    <Box sx={styles.notesWrapper}>
      <Divider orientation={PositionEnum.Vertical} sx={styles.divider} />
      <Box>
        <Box sx={styles.notesIcon}>
          <Typography>{t('cooperationsPage.details.notes')}</Typography>
          <AddIcon onClick={onAddNoteOpen} />
        </Box>
        {open && (
          <CreateOrEditNote
            onCloseNote={onCloseNote}
            onSubmit={addNewNote}
            onSubmitLoading={createLoading}
          />
        )}
        {isNotesLoading || !notes ? <Loader pageLoad /> : notesList}
      </Box>
    </Box>
  )
}

export default CooperationNotes
