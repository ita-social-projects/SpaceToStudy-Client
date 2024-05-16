import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

import useAxios from '~/hooks/use-axios'
import useConfirm from '~/hooks/use-confirm'
import { CooperationNotesService } from '~/services/cooperation-service'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'
import NoteView from '~/containers/my-cooperations/cooperation-notes/note-view/NoteView'
import Loader from '~/components/loader/Loader'

import { snackbarVariants, defaultResponses } from '~/constants'
import { styles } from '~/containers/my-cooperations/cooperation-notes/CooperationNotes.styles'
import {
  CreateOrUpdateNoteParams,
  PositionEnum,
  ErrorResponse,
  NoteResponse
} from '~/types'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorMessage } from '~/utils/error-with-message'
import { getErrorKey } from '~/utils/get-error-key'

const CooperationNotes = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { openDialog } = useConfirm()
  const [open, setOpen] = useState<boolean>(false)
  const [editableItemId, setEditableItemId] = useState<string>('')

  const onResponseError = useCallback(
    (error?: ErrorResponse) => {
      const errorKey = getErrorKey(error)

      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: error
            ? {
                text: errorKey,
                options: {
                  message: getErrorMessage(error.message)
                }
              }
            : errorKey
        })
      )
    },
    [dispatch]
  )

  const onResponse = useCallback(() => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'cooperationsPage.notes.noteMsg'
      })
    )
  }, [dispatch])

  const onDeleteResponse = useCallback(() => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'cooperationsPage.modalMessages.successDeletion'
      })
    )
  }, [dispatch])

  const onUpdateResponse = useCallback(() => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'cooperationsPage.modalMessages.successUpdating'
      })
    )
  }, [dispatch])

  const getNotes = useCallback(() => CooperationNotesService.getNotes(id), [id])

  const createNoteService = useCallback(
    (data?: CreateOrUpdateNoteParams) =>
      CooperationNotesService.createNote(data, id),
    [id]
  )

  const deleteNote = useCallback(
    (noteId?: string) =>
      CooperationNotesService.deleteNote(id ?? '', noteId ?? ''),
    [id]
  )

  const updateNoteService = useCallback(
    (params?: { noteId: string; data: CreateOrUpdateNoteParams }) =>
      CooperationNotesService.updateNote(id, params?.noteId, params?.data),
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

  const { loading: createLoading, fetchData: addNewNote } = useAxios({
    service: createNoteService,
    defaultResponse: null,
    fetchOnMount: false,
    onResponseError,
    onResponse: onNoteCreate
  })

  const { error, fetchData: deleteItem } = useAxios({
    service: deleteNote,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError,
    onResponse: onDeleteResponse
  })

  const {
    error: updateError,
    loading: updateLoading,
    fetchData: updateNote
  } = useAxios({
    service: updateNoteService,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError,
    onResponse: onUpdateResponse
  })

  const handleDelete = async (id: string, isConfirmed: boolean) => {
    if (isConfirmed) {
      await deleteItem(id)
      if (!error) await fetchData()
    }
  }

  const onDeleteNote = (id: string) => {
    openDialog({
      message: 'cooperationsPage.modalMessages.confirmDeletionMessage',
      sendConfirm: (isConfirmed: boolean) => void handleDelete(id, isConfirmed),
      title: `cooperationsPage.modalMessages.confirmDeletionTitle`
    })
  }

  const duplicateNote = useCallback(
    (id?: string) => {
      const note = notes.find((item) => item._id === id)
      return createNoteService(note)
    },
    [notes, createNoteService]
  )

  const onDuplicateResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: `cooperationsPage.modalMessages.successDuplication`
      })
    )
  }

  const { error: duplicationError, fetchData: duplicateItem } = useAxios({
    service: duplicateNote,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError,
    onResponse: onDuplicateResponse
  })

  const handleDuplicate = async (itemId: string) => {
    await duplicateItem(itemId)
    if (!duplicationError) await fetchData()
  }

  const handleUpdate = async (data: CreateOrUpdateNoteParams) => {
    await updateNote({ noteId: editableItemId, data })
    onCloseEdit()
    if (!updateError) await fetchData()
  }

  const onCloseEdit = () => setEditableItemId('')
  const onCloseNote = () => setOpen(false)
  const onAddNoteOpen = () => setOpen(true)

  const NotesList = notes.map((item: NoteResponse) =>
    editableItemId === item._id ? (
      <CreateOrEditNote
        key={item._id}
        note={item}
        onCloseNote={onCloseEdit}
        onSubmit={handleUpdate}
        onSubmitLoading={updateLoading}
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
        {loading ? <Loader pageLoad /> : NotesList}
      </Box>
    </Box>
  )
}

export default CooperationNotes
