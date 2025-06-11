import { screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'
import {
  renderWithProviders,
  TestSnackbar,
  mockAxiosClient
} from '~tests/test-utils'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { URLs } from '~/constants/request'
import {
  mockNotesData,
  mockUpdatedNotesData,
  mockUpdatedWithDuplicatedNoteData,
  completeNewNote,
  finishedMockedNotesData
} from './CooperationNotes.constants'
import * as useQuery from '~/hooks/use-query'
import { getFullUrl } from '~/utils/get-full-url'

const cooperationId = '675b37915a23a358ab40bf66'

const newNotePayload = {
  text: 'Newly created note',
  isPrivate: false
}

const updatedNotePayload = {
  text: 'updated note',
  isPrivate: false
}

const duplicatedNote = {
  ...mockUpdatedNotesData[1],
  _id: '65b03361bf20871d3adead9c',
  text: mockUpdatedNotesData[1].text
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({
      id: cooperationId
    })
  }
})

const userMock = {
  _id: '648850c4fdc2d1a130c24aea',
  role: 'tutor',
  firstName: 'Test',
  lastName: 'User',
  photo: ''
}

const appMain = {
  appMain: { userRole: 'tutor', userId: mockNotesData[0].author._id }
}

const getNotesUrl = URLs.notes.get.replace(':id', cooperationId)
const createNoteUrl = URLs.notes.create.replace(':id', cooperationId)
const updateNoteUrl = URLs.notes.update
  .replace(':id', cooperationId)
  .replace(':noteId', mockNotesData[0]._id)
const deleteNoteUrl = URLs.notes.delete
  .replace(':id', cooperationId)
  .replace(':noteId', mockUpdatedNotesData[0]._id)
const duplicateNoteUrl = URLs.notes.create.replace(':id', cooperationId)

const url = getFullUrl({
  parameters: { id: mockNotesData[0].author._id },
  pathname: URLs.users.getUserById,
  searchParameters: { userRole: mockNotesData[0].author.role }
})

describe('CooperationNotes', () => {
  beforeEach(() => {
    mockAxiosClient.onGet(url).reply(200, userMock)
    mockAxiosClient.onGet(getNotesUrl).replyOnce(200, mockNotesData)
    mockAxiosClient.onPost(createNoteUrl).reply(200, newNotePayload)
    mockAxiosClient
      .onGet(getNotesUrl)
      .replyOnce(200, [...mockNotesData, completeNewNote])
    mockAxiosClient.onPatch(updateNoteUrl).reply(200, updatedNotePayload)
    mockAxiosClient.onGet(getNotesUrl).replyOnce(200, mockUpdatedNotesData)
    mockAxiosClient.onPost(duplicateNoteUrl).reply(200, duplicatedNote)
    mockAxiosClient
      .onGet(getNotesUrl)
      .replyOnce(200, mockUpdatedWithDuplicatedNoteData)
    mockAxiosClient.onDelete(deleteNoteUrl).reply(200, null)
    mockAxiosClient.onGet(getNotesUrl).replyOnce(200, finishedMockedNotesData)

    renderWithProviders(
      <ConfirmationDialogProvider>
        <TestSnackbar>
          <CooperationNotes />
        </TestSnackbar>
      </ConfirmationDialogProvider>,
      { preloadedState: appMain }
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render CooperationNotes components', () => {
    const notes = screen.getByText('cooperationsPage.details.notes')

    expect(notes).toBeInTheDocument()
  })

  it('should open create note form and save the note', async () => {
    const newNoteText = 'Newly created note'
    const addNoteBtn = screen.getByTestId('AddIcon')
    fireEvent.click(addNoteBtn)

    await waitFor(() => {
      const noteFormSettings = screen.getByText(
        'cooperationsPage.notes.privateSetting'
      )
      expect(noteFormSettings).toBeInTheDocument()
    })

    const noteTextInput = screen.getByLabelText(
      'cooperationsPage.notes.noteText'
    )
    const saveButton = screen.getByRole('button', {
      name: 'common.save'
    })

    fireEvent.change(noteTextInput, {
      target: { value: newNoteText }
    })
    fireEvent.click(saveButton)

    const snackbar = await screen.findByText(
      'cooperationsPage.modalMessages.successCreation'
    )
    expect(snackbar).toBeInTheDocument()

    const newNote = screen.getByText(newNoteText)
    expect(newNote).toBeInTheDocument()
  })

  it('should close create note form', () => {
    const addNoteBtn = screen.getByTestId('AddIcon')
    fireEvent.click(addNoteBtn)

    const cancelButton = screen.getByText('common.cancel')
    fireEvent.click(cancelButton)

    const noteFormSettings = screen.queryByText(
      'cooperationsPage.notes.privateSetting'
    )

    expect(noteFormSettings).toBeNull()
  })

  it('should enable the edit mode and handle updates', async () => {
    const [menuButton] = screen.getAllByTestId('MoreVertIcon')
    fireEvent.click(menuButton)

    const editButton = screen.getByTestId('EditIcon')
    fireEvent.click(editButton)

    const [noteTextInput] = screen.getAllByDisplayValue(mockNotesData[0].text)
    const saveButton = screen.getByRole('button', { name: 'common.save' })

    fireEvent.change(noteTextInput, { target: { value: 'updated note' } })
    fireEvent.click(saveButton)

    const snackbar = await screen.findByText(
      'cooperationsPage.modalMessages.successUpdating'
    )
    expect(snackbar).toBeInTheDocument()

    const newNote = await screen.findByText('updated note')
    expect(newNote).toBeInTheDocument()
  })

  it('should handle duplicate notes', async () => {
    const noteText = mockUpdatedNotesData[1].text
    const initialNoteElements = screen.getAllByText(noteText)

    const menuButtons = screen.getAllByTestId('MoreVertIcon')
    fireEvent.click(menuButtons[1])

    const duplicateButton = screen.getByTestId('ContentCopyIcon')
    fireEvent.click(duplicateButton)

    const snackbar = await screen.findByText(
      'cooperationsPage.modalMessages.successDuplication'
    )
    expect(snackbar).toBeInTheDocument()

    await waitFor(() => {
      const updatedNoteElements = screen.getAllByText(noteText)
      expect(updatedNoteElements.length).toBe(initialNoteElements.length + 1)
    })
  })

  it('should handle delete notes', async () => {
    const menuButtons = screen.getAllByTestId('MoreVertIcon')
    fireEvent.click(menuButtons[0])

    const deleteButton = screen.getByTestId('DeleteOutlineIcon')
    fireEvent.click(deleteButton)

    const confirmButton = screen.getByRole('button', { name: 'common.yes' })
    fireEvent.click(confirmButton)

    const snackbar = await screen.findByText(
      'cooperationsPage.modalMessages.successDeletion'
    )
    expect(snackbar).toBeInTheDocument()

    const noteText = mockUpdatedNotesData[0].text
    await waitFor(() => {
      expect(screen.queryByText(noteText)).not.toBeInTheDocument()
    })
  })
})

describe('CooperationNotes with error', () => {
  const fakeError = { code: 'errorCode', message: 'UNKNOWN_ERROR' }

  beforeEach(() => {
    vi.spyOn(useQuery, 'default').mockReturnValue({
      isLoading: false,
      error: fakeError,
      data: null
    })
    renderWithProviders(
      <TestSnackbar>
        <CooperationNotes />
      </TestSnackbar>,
      { preloadedState: appMain }
    )
  })

  it('should show the error message', async () => {
    const errorAlert = await screen.findByText(`errors.${fakeError.code}`)
    expect(errorAlert).toBeInTheDocument()
  })
})
