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

  const getNotes = () => {
    return CooperationNotesService.getNotes(id)
  }

  const {
    data: notes,
    isLoading: isNotesLoading,
    error: getNotesError
  } = useQuery({
    queryKey: ['notes', id],
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

  const createNote = (data: CreateOrUpdateNoteParams) => {
    return CooperationNotesService.createNote(data, id)
  }

  const { mutate: addNewNote, isPending: createLoading } = useMutation({
    mutationFn: createNote,
    queryKey: ['notes'],
    onError: handleErrorAlert,
    onSuccess: () => onSuccessResponse('create')
  })

  const deleteSelectedNote = (noteId: string) => {
    return CooperationNotesService.deleteNote(id, noteId)
  }

  const { mutate: deleteNote } = useMutation({
    mutationFn: deleteSelectedNote,
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

  const updateSelectedNote = (params: {
    noteId: string
    data: CreateOrUpdateNoteParams
  }) => {
    return CooperationNotesService.updateNote(id, params.noteId, params.data)
  }

  const { mutate: updateNote, isPending: updateNoteLoading } = useMutation({
    mutationFn: updateSelectedNote,
    queryKey: ['notes'],
    onError: handleErrorAlert,
    onSuccess: () => onSuccessResponse('update')
  })

  const duplicateNote = async (noteId: string) => {
    const note = notes?.find((item) => item._id === noteId)
    if (!note) {
      return
    }
    return CooperationNotesService.createNote(note, id)
  }

  const { mutate: duplicateItem } = useMutation({
    mutationFn: duplicateNote,
    queryKey: ['notes'],
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
        duplicateItem={(itemId: string) => duplicateItem(itemId)}
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
