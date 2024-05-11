import { screen, fireEvent, waitFor } from '@testing-library/react'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'
import { renderWithProviders, TestSnackbar } from '~tests/test-utils'
import { ConfirmationDialogProvider } from '~/context/confirm-context'

const mockNotesData = [
  {
    _id: '65b03361bf20871d3adaeb9c',
    text: 'Test note1 content',
    author: {
      _id: '6565fd508a848ff2202df79c',
      firstName: 'User',
      lastName: 'Test'
    },
    isPrivate: false,
    cooperation: '65afbd053d67b51996a67c4c',
    createdAt: '2024-01-23T21:45:05.200Z',
    updatedAt: '2024-01-23T21:45:05.200Z'
  },
  {
    _id: '65b03361bf20871d3a3aeb9c',
    text: 'Test note2 content',
    author: {
      _id: '6565fd508a848ff2202df79c',
      firstName: 'User',
      lastName: 'Test'
    },
    isPrivate: false,
    cooperation: '65afbd053d67b51996a67c4c',
    createdAt: '2024-01-23T21:45:05.200Z',
    updatedAt: '2024-01-23T21:45:05.200Z'
  }
]

const mockResponseData = {
  data: ''
}

const mockGetNote = vi.fn()
const mockUpdateNote = vi.fn().mockReturnValue(mockResponseData)
const mockCreateNote = vi.fn().mockReturnValue(mockResponseData)
const mockDeleteNote = vi.fn().mockReturnValue(mockResponseData)

vi.mock('~/services/cooperation-service', async () => {
  const actual = await vi.importActual('~/services/cooperation-service')
  return {
    ...actual,
    CooperationNotesService: {
      getNotes: () => mockGetNote(),
      updateNote: () => mockUpdateNote(),
      createNote: () => mockCreateNote(),
      deleteNote: () => mockDeleteNote()
    }
  }
})

const userState = {
  appMain: { userRole: 'tutor', userId: mockNotesData[0].author._id }
}

describe('CooperationNotes', () => {
  beforeEach(async () => {
    mockGetNote.mockReturnValue({
      data: mockNotesData
    })

    await waitFor(() => {
      renderWithProviders(
        <ConfirmationDialogProvider>
          <TestSnackbar>
            <CooperationNotes />
          </TestSnackbar>
        </ConfirmationDialogProvider>,
        { preloadedState: userState }
      )
    })
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

    const noteFormSettings = screen.getByText(
      'cooperationsPage.notes.privateSetting'
    )

    expect(noteFormSettings).toBeInTheDocument()

    const noteTextInput = screen.getByLabelText(
      'cooperationsPage.notes.noteText'
    )
    const saveButton = screen.getByRole('button', { name: 'common.save' })

    fireEvent.change(noteTextInput, {
      target: { value: newNoteText }
    })
    fireEvent.click(saveButton)

    await waitFor(() => {
      const newNote = screen.getByText(newNoteText)
      expect(newNote).toBeInTheDocument()
    })
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
    const newNoteText = 'New note text'
    const [menuButton] = screen.getAllByTestId('MoreVertIcon')
    fireEvent.click(menuButton)

    const editButton = screen.getByTestId('EditIcon')
    fireEvent.click(editButton)

    const [noteTextInput] = screen.getAllByDisplayValue(mockNotesData[0].text)
    const saveButton = screen.getByRole('button', { name: 'common.save' })

    fireEvent.change(noteTextInput, { target: { value: newNoteText } })
    fireEvent.click(saveButton)

    const newNote = screen.getByText(newNoteText)

    await waitFor(() => {
      expect(mockUpdateNote).toHaveBeenCalled()
      expect(newNote).toBeInTheDocument()
    })
  })

  it('should handle duplicate notes', async () => {
    const [menuButton] = screen.getAllByTestId('MoreVertIcon')
    fireEvent.click(menuButton)

    const duplicateButton = screen.getByTestId('ContentCopyIcon')
    fireEvent.click(duplicateButton)

    await waitFor(() => {
      expect(mockCreateNote).toHaveBeenCalled()
    })
  })

  it('should handle delete notes', async () => {
    const [menuButton] = screen.getAllByTestId('MoreVertIcon')
    fireEvent.click(menuButton)

    const deleteButton = screen.getByTestId('DeleteOutlineIcon')
    fireEvent.click(deleteButton)

    const confirmButton = screen.getByRole('button', { name: 'common.yes' })
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockDeleteNote).toHaveBeenCalled()
    })
  })
})

describe('CooperationNotes with error', () => {
  const fakeError = {
    message: 'Something went wrong'
  }

  beforeEach(async () => {
    mockGetNote.mockRejectedValue({
      response: { data: fakeError }
    })

    await waitFor(() => {
      renderWithProviders(
        <TestSnackbar>
          <CooperationNotes />
        </TestSnackbar>,
        { preloadedState: userState }
      )
    })
  })

  it('should show the error message', () => {
    const errorAlert = screen.getByText(`errors.${fakeError.message}`)

    expect(errorAlert).toBeInTheDocument()
  })
})
