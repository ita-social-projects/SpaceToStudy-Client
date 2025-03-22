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
import { CreateOrUpdateNoteParams, PositionEnum, NoteResponse } from '~/types'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'

type NoteAction = 'create' | 'delete' | 'update' | 'duplicate'

const CooperationNotes = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams()
  const { openDialog } = useConfirm()
  const [open, setOpen] = useState<boolean>(false)
  const [editableItemId, setEditableItemId] = useState<string>('')
  const { handleAlert, handleErrorAlert } = useSnackbarAlert()

  const onSuccessResponse = useCallback(
    (noteAction: NoteAction) => {
      let responseMessage = ''

      if (noteAction === 'create') {
        responseMessage = 'cooperationsPage.modalMessages.successCreation'
        setOpen(false)
      }

      if (noteAction === 'delete') {
        responseMessage = 'cooperationsPage.modalMessages.successDeletion'
      }

      if (noteAction === 'update') {
        responseMessage = 'cooperationsPage.modalMessages.successUpdating'
      }

      if (noteAction === 'duplicate') {
        responseMessage = 'cooperationsPage.modalMessages.successDuplication'
      }

      handleAlert({
        severity: snackbarVariants.success,
        message: responseMessage
      })
    },
    [handleAlert]
  )

  const {
    data: notes,
    isLoading: isNotesLoading,
    error: getNotesError
  } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => CooperationNotesService.getNotes(id),
    options: {
      staleTime: Infinity
    }
  })

  useEffect(() => {
    if (getNotesError) {
      handleErrorAlert(getNotesError)
    }
  }, [handleErrorAlert, getNotesError])

  const { mutate: addNewNote, isPending: createLoading } = useMutation({
    mutationFn: (data: CreateOrUpdateNoteParams) =>
      CooperationNotesService.createNote(id, data),
    queryKey: ['notes'],
    onError: handleErrorAlert,
    onSuccess: () => onSuccessResponse('create')
  })

  const { mutate: deleteNote } = useMutation({
    mutationFn: (noteId: string) =>
      CooperationNotesService.deleteNote(id, noteId),
    queryKey: ['notes'],
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

  const { mutate: updateNote, isPending: updateNoteLoading } = useMutation({
    mutationFn: (params: { noteId: string; data: CreateOrUpdateNoteParams }) =>
      CooperationNotesService.updateNote(id, params.noteId, params.data),
    queryKey: ['notes'],
    onError: handleErrorAlert,
    onSuccess: () => onSuccessResponse('update')
  })

  const { mutate: duplicateItem } = useMutation({
    mutationFn: async (noteId: string) => {
      const note = notes?.find((item) => item._id === noteId)
      if (!note) {
        return
      }
      return CooperationNotesService.createNote(id, note)
    },
    queryKey: ['notes'],
    onSuccess: () => onSuccessResponse('duplicate'),
    onError: handleErrorAlert
  })

  const handleDuplicate = (itemId: string) => {
    duplicateItem(itemId)
  }

  const handleUpdate = (data: CreateOrUpdateNoteParams) => {
    updateNote({ noteId: editableItemId, data })
    onCloseEdit()
  }

  const onCloseEdit = () => setEditableItemId('')
  const onCloseNote = () => setOpen(false)
  const onAddNoteOpen = () => setOpen(true)

  const NotesList = notes?.map((item: NoteResponse) =>
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
        duplicateItem={(itemId: string) => void handleDuplicate(itemId)}
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
        {isNotesLoading ? <Loader pageLoad /> : NotesList}
      </Box>
    </Box>
  )
}

export default CooperationNotes
